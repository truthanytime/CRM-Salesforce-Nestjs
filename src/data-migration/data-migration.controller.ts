import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { CreateDataMigrationDto } from '@/data-migration/dto/create-data-migration.dto';
import { DataSynchronizerSqsMessageDto } from '@/core/lib/aws/sqs/dto/data-synchronizer-sqs-message.dto';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
import { DataSetMigrationSQSMessageDto } from '@/core/lib/aws/sqs/dto/data-set-migration-sqs-message.dto';
import { DataSourceService } from '@/data-source/data-source.service';
import { DataMigrationStatus } from '@/core/types';
import { paginationOptions } from './types';
import { UserType } from '@/user/types';
import {
  PostMigrationRecordUpdateDto,
  PostTableRecordUpdateDto,
} from './dto/post-migration-record-update.dto';

@ApiTags('DataMigration')
@Controller('dataMigration')
@UseGuards(AuthGuard('jwt'))
export class DataMigrationController {
  constructor(
    private readonly dataMigrationService: DataMigrationService,
    private readonly dataMigrationSchemaService: DataMigrationSchemaService,
    private readonly sqsQueueMessageProducerService: SQSMessageProducerService,
    private readonly dataSourceService: DataSourceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new data migration connection to a user' })
  async createDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateDataMigrationDto,
  ) {
    this.validateAuthorization(authedUser);
    const existingMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataSourceId: body.dataSourceId },
    });
    if (existingMigration) {
      throw new BadRequestException('Data migration already registered');
    }

    const dataSource = await this.dataSourceService.findOne({
      where: { dataSourceId: body.dataSourceId },
    });
    if (!dataSource) {
      throw new BadRequestException('Data Source id provided does not exists');
    }

    const integrationExists =
      await this.dataMigrationService.validateIntegrationExists(
        authedUser.userId,
        body.dataSourceId,
        authedUser.tenantId,
      );
    if (!integrationExists) {
      throw new NotFoundException(
        `Missing integration with data source ${dataSource.name}`,
      );
    }

    const dataMigrationCreated = await this.dataMigrationService.create(
      authedUser.tenantId,
      body.dataSourceId,
    );

    const sqsMessage: DataSetMigrationSQSMessageDto = {
      userId: authedUser.userId,
      tenantId: authedUser.tenantId,
      migrationId: dataMigrationCreated.dataMigrationId,
      dataSourceId: dataSource.dataSourceId,
    };

    await this.sqsQueueMessageProducerService.sendDataSetQueueMessage(
      sqsMessage,
    );

    return new SuccessResponseObject(
      'User data migration created successfully',
      dataMigrationCreated,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all data migrations from a User' })
  async getDataMigration(@AuthedUser() authedUser: IAuthedUser) {
    const dataMigrations = await this.dataMigrationService.findAllByTenant(
      authedUser.tenantId,
    );
    return new SuccessResponseObject(
      'User data migrations found successfully',
      dataMigrations,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get migration by ID' })
  async getMigrationByID(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
  ) {
    const dataMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!dataMigration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }
    return new SuccessResponseObject(
      'Data migration found successfully',
      dataMigration,
    );
  }

  @Get('/dataSource/:dataSourceId')
  @ApiOperation({ summary: 'Get migration by Data source Id' })
  async getMigrationByDataSourceId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('dataSourceId') dataSourceId: string,
  ) {
    const dataMigration =
      await this.dataMigrationService.getMigrationByDataSourceName(
        authedUser.userId,
        authedUser.tenantId,
        dataSourceId,
      );
    if (!dataMigration) {
      throw new NotFoundException(
        `Migration not found by Data Source ${dataSourceId}`,
      );
    }
    return new SuccessResponseObject(
      'Data migration found successfully',
      dataMigration,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a user data migration record by Id' })
  async deleteDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: string,
  ) {
    this.validateAuthorization(authedUser);
    const deletedDataMigration = await this.dataMigrationService.delete(
      id,
      authedUser.tenantId,
    );
    return new SuccessResponseObject(
      'User data migration deleted successfully',
      deletedDataMigration,
    );
  }

  @Get('/:id/tables')
  @ApiOperation({ summary: 'Get available tables from the migration' })
  async getDataMigrationTables(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const tables = await this.dataMigrationSchemaService.getSchemaTables(
      migration.tenantId,
      migration.dataSourceId,
    );

    return new SuccessResponseObject(
      'Data tables fetched successfully',
      tables,
    );
  }

  @Get('/:id/table/:tableId/totalCounts')
  @ApiOperation({ summary: 'Get total counts of data from table Id' })
  async getDataMigrationDataTotalCount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const totalCount =
      await this.dataMigrationSchemaService.getSchemaDataTotalCount(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
      );

    return new SuccessResponseObject(
      'Data total count fetched successfully',
      totalCount.length,
    );
  }

  @Get('/:id/table/:tableId/fields')
  @ApiOperation({ summary: 'Get fields of table from table Id' })
  async getDataMigrationTableFields(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const fields = await this.dataMigrationSchemaService.getSchemaTableField(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
    );

    return new SuccessResponseObject(
      'Data table fields fetched successfully',
      fields,
    );
  }

  @Get('/:id/table/:tableId/lookups')
  @ApiOperation({ summary: 'Get look ups reference of table from table Id' })
  async getDataMigrationTableLookups(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const fields = await this.dataMigrationSchemaService.getSchemaTableLookups(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
    );

    return new SuccessResponseObject(
      'Data table lookups fetched successfully',
      fields,
    );
  }

  @Get('/:id/table/:tableId/data')
  @ApiOperation({ summary: 'Get data from the migrated tables' })
  async getDataMigrationTableRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
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
      take: take || 20,
    };

    const data = await this.dataMigrationSchemaService.getTableData(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      paginationOptions,
    );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }

  validateAuthorization(authedUser: IAuthedUser) {
    if (authedUser.userType === UserType.USER) {
      throw new UnauthorizedException(
        'You are not authorized to modify migrations',
      );
    }
  }

  @Post('/:id/recordUpdate')
  @ApiOperation({ summary: 'Post migration record update' })
  async postMigrationReportUpdate(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Body() body: PostMigrationRecordUpdateDto,
  ) {
    console.log('recordUpdate:::', JSON.stringify(body, null, 2));
    const dataMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!dataMigration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }
    const sqsMessageBody: DataSynchronizerSqsMessageDto = {
      userId: authedUser.userId,
      migrationId: migrationId,
      tenantId: authedUser.tenantId,
      updates: body.updates,
      dataSourceId: dataMigration.dataSourceId,
    };

    await this.sqsQueueMessageProducerService.sendDataSynchronizerQueueMessage(
      sqsMessageBody,
    );
    return new SuccessResponseObject('Update Received', body.updates);
  }

  @Post('/:id/table/:tableId/recordUpdate')
  @ApiOperation({ summary: 'Post migration record update' })
  async postTableRecordtUpdate(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Body() body: PostTableRecordUpdateDto,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    try {
      await this.dataMigrationSchemaService.updateTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        body.updates,
      );

      return new SuccessResponseObject('Update Received', body.updates);
    } catch {
      throw new BadRequestException('Update failed');
    }
  }

  @Get('/:id/table/:tableId/bookmarkedTotal')
  @ApiOperation({ summary: 'Get total counts of data from table Id' })
  async getBookmarkedDataOnMigrationDataTotal(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const totalCount =
      await this.dataMigrationSchemaService.getBookmarkedTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
      );

    return new SuccessResponseObject(
      'Bookmarked data total count fetched successfully',
      totalCount,
    );
  }
}
