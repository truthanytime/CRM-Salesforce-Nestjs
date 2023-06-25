import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { IAuthedUser } from '@/auth/types';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { SuccessResponseObject } from '@/common/http';
import { RuleService } from '../services/rule.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
import {
  RuleApplierActions,
  RuleApplierSqsMessageDto,
} from '@/core/lib/aws/sqs/dto/rule-applier-sqs-message.dto';
import { RuleFormatter } from '../util/RuleFormatter';
import { RuleTransformer } from '../util/RuleTransformer';
import { v4 as uuid } from 'uuid';
import { DataMigrationStatus } from '@/core/types';
import { paginationOptions } from '@/data-migration/types';

@ApiTags('dataRaptorRule')
@Controller('dataRaptorRule')
@UseGuards(AuthGuard('jwt'))
export class DataRaptorRuleController {
  MAX_VIOLATION_SCORE: number;
  constructor(
    private readonly ruleService: RuleService,
    private readonly dataMigrationService: DataMigrationService,
    private readonly sqsMessageProducerService: SQSMessageProducerService,
    private readonly dataMigrationSchemaService: DataMigrationSchemaService,
  ) {
    this.MAX_VIOLATION_SCORE = 100;
  }

  @Post('/migration/:migrationId/rule')
  @ApiOperation({ summary: 'Creates a data raptor rule' })
  async createDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateRuleDto,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rule = await this.ruleService.findOne({
      where: {
        dataMigrationId: migrationId,
        table: body.table,
        name: body.name,
      },
    });

    if (rule) {
      throw new BadRequestException('Rule name is already used on this table');
    }

    const tableRules = await this.ruleService.findMany({
      where: {
        dataMigrationId: migrationId,
        table: body.table,
      },
    });

    const usedViolationScore = tableRules.reduce(
      (prev, current) => +prev + (+current.violationScore ?? 0),
      0,
    );

    if (usedViolationScore + body.violationScore > this.MAX_VIOLATION_SCORE) {
      const maxAcceptable = 100 - usedViolationScore;
      throw new BadRequestException(
        `The sum of the violations scores of all rules for this table cannot be greater than 100. Remaining max (${maxAcceptable})`,
      );
    }

    const transformedRule = RuleTransformer.transformLookUpFields(body.rule);
    body.formattedRule = RuleFormatter.getFormattedRule(
      authedUser.tenantId,
      migration.dataSourceId,
      transformedRule,
    );

    const createdRule = await this.ruleService.createRule(
      body,
      migration.dataMigrationId,
    );

    if (body.active === true || !body.active) {
      const sqsMessagePayload: RuleApplierSqsMessageDto = {
        userId: authedUser.userId,
        tenantId: authedUser.tenantId,
        migrationId: migration.dataMigrationId,
        action: RuleApplierActions.APPLY,
        ruleIds: [createdRule.ruleId],
      };
      await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
        sqsMessagePayload,
      );
    }

    return new SuccessResponseObject('Rule Created Successfully', createdRule);
  }

  @Get('/migration/:migrationId/table/:tableName')
  @ApiOperation({
    summary: 'Get rules that are associated with a migration and a table name',
  })
  async getRulesByMigrationAndTableName(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableName') tableName: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableName },
    });

    return new SuccessResponseObject('Rules retrieved Successfully', rules);
  }

  @Get('/migration/:migrationId/')
  @ApiOperation({ summary: 'Get rules that are associated with a migration' })
  async getRulesByMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId },
    });

    return new SuccessResponseObject('Rules retrieved Successfully', rules);
  }

  @Delete('/rule/:ruleId')
  @ApiOperation({ summary: 'Deletes a rule by its ID' })
  async deleteRule(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('ruleId') ruleId: string,
  ) {
    const rule = await this.ruleService.findOne({
      where: { ruleId },
    });

    if (!rule) {
      throw new BadRequestException('Rule not found!');
    }

    const migration = await this.dataMigrationService.findOne({
      where: {
        dataMigrationId: rule.dataMigrationId,
        tenantId: authedUser.tenantId,
      },
    });

    if (!migration) {
      // Rule does not belong to the user
      // returning same error message to do not give hints to attackers of what rules exists
      throw new BadRequestException('Rule not found!');
    }

    if (rule.active === true) {
      const sqsMessagePayload: RuleApplierSqsMessageDto = {
        userId: authedUser.userId,
        tenantId: authedUser.tenantId,
        migrationId: migration.dataMigrationId,
        action: RuleApplierActions.REMOVE,
        ruleIds: [rule.ruleId],
      };
      await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
        sqsMessagePayload,
      );
    }

    const newRuleName = `${uuid().split('-')[0]}-${rule.name}`;
    await this.ruleService.update(ruleId, { name: newRuleName });
    await this.ruleService.deleteRule(ruleId);
    return new SuccessResponseObject('Rule deleted successfully');
  }

  @Put('/rule/:ruleId')
  @ApiOperation({ summary: 'Update a rule by its ID' })
  async updateRule(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: UpdateRuleDto,
    @Param('ruleId') ruleId: string,
  ) {
    const rule = await this.ruleService.findOne({
      where: { ruleId },
    });

    if (!rule) {
      throw new BadRequestException('Rule not found!');
    }

    const migration = await this.dataMigrationService.findOne({
      where: {
        dataMigrationId: rule.dataMigrationId,
        tenantId: authedUser.tenantId,
      },
    });

    if (!migration) {
      // Rule does not belong to the user
      // returning same error message to do not give hints to attackers of what rules exists
      throw new BadRequestException('Rule not found!');
    }

    // If user has update the rule format the syntax
    if (body.rule) {
      const transformedRule = RuleTransformer.transformLookUpFields(body.rule);
      body.formattedRule = RuleFormatter.getFormattedRule(
        authedUser.tenantId,
        migration.dataSourceId,
        transformedRule,
      );
    }

    body.previousFormattedRule = rule.formattedRule;

    const updatedRule = await this.ruleService.update(ruleId, body);

    const action = RuleApplierActions.UPDATE;

    const sqsMessagePayload: RuleApplierSqsMessageDto = {
      userId: authedUser.userId,
      tenantId: authedUser.tenantId,
      migrationId: migration.dataMigrationId,
      action: action,
      ruleIds: [rule.ruleId],
    };

    await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
      sqsMessagePayload,
    );

    return new SuccessResponseObject('Rule Updated Successfully', updatedRule);
  }

  @Get('/dataValidation/:migrationId/table/:tableId/dataValidationViolatedData')
  @ApiOperation({
    summary:
      'Get data from the migrated tables which violated data validation rules',
  })
  async getDataValidationViolatedMigrationTableRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const paginationOptions: paginationOptions = {
      skip: skip || 0,
      take: take || 25,
    };

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableId },
    });

    const ruleIds = rules.map((rule) => rule.ruleId);

    const data =
      await this.dataMigrationSchemaService.getDataValidationTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        paginationOptions,
        ruleIds,
      );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }

  @Get(
    '/dataValidation/:migrationId/table/:tableId/dataValidationViolatedTotalData',
  )
  @ApiOperation({
    summary:
      'Get data from the migrated tables which violated data validation rules',
  })
  async getDataValidationViolatedMigrationTableTotalRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableId },
    });

    const ruleIds = rules.map((rule) => rule.ruleId);

    const data =
      await this.dataMigrationSchemaService.getDataValidationTableTotalData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        ruleIds,
      );

    return new SuccessResponseObject('Data Fetch successfully', data.length);
  }
}
