import {
    Controller,
    UseGuards,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResponseObject } from '@/common/http';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { OpenAIService } from './open-ai.service';
import { AISummaryRequestDto } from './dto/ai-summary.request.dto';
import { RuleService } from '@/data-raptor/services/rule.service';
import { RuleCategory } from '@/data-raptor/types';
import { Condition, DiscriminatorTypeEnum } from '@/data-raptor/dto/rule.dto';

@ApiTags('OpenAI')
@UseGuards(AuthGuard('jwt'))
@Controller('OpenAI')
export class OpenAIController {
    constructor(
        private readonly openAIService: OpenAIService,
        private readonly dataMigrationService: DataMigrationService,
        private readonly dataMigrationSchemaService: DataMigrationSchemaService,
        private readonly ruleService: RuleService
    ){}

    @Post('/summary')
    @ApiOperation({summary: 'Get ai summary from chatGPT'})
    async getOpenAISummary(
        @AuthedUser() authedUser: IAuthedUser,
        @Body() body: AISummaryRequestDto
    ){
        const {
            migrationId, 
            tableName: tableId
        } = body;
        try{
            const migration = await this.dataMigrationService.findOne({
                where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            });
            
            const totalCount = await this.dataMigrationSchemaService.getSchemaDataTotalCount(
                migration.tenantId,
                migration.dataSourceId,
                tableId,
            );

            const rules = await this.ruleService.findMany({
                where: { dataMigrationId: migration.dataMigrationId, table: tableId },
            });

            const ruleIds = rules.map(item => item.ruleId);

            const shortlistCompressedData = totalCount.filter(item => {
                if(item.confidence_score !== 0){
                    const ruleIds = Object.keys(item.rules_applied);
                    if(ruleIds.some(ruleId =>{
                        const index = rules.findIndex(rule => rule.ruleId === ruleId);
                        if(index > -1){
                            if(rules[index].category === RuleCategory.DataValidation){ // we should get this data from frontend side.ex,data validation.duplication detect
                                return true;
                            }
                        }
                        return false;
                    })){
                        return true; 
                    }
                }
                return false;
            }).map(item => {
                const temp = {}
                ruleIds.forEach(ruleId => {
                    const rule = rules.find(rule => rule.ruleId === ruleId);
                    const columns = rule.rule.where.filter(where => where.type === DiscriminatorTypeEnum.CONDITIONAL).map(item => (item as Condition).field);
                    columns.forEach(column => {
                        temp[column] = item[column]
                    })
                })
                return temp
            });

            let dataText = JSON.stringify(shortlistCompressedData);
            if(dataText.length > 4000){
                dataText = dataText.slice(0, 4000)
            }

            const plainText = `ChatBot, 
            provide an overview of the data validation errors like incorrect data types, formats, missing data, and values
             from ${dataText}. 
             Also, indicate the violated rules from ${rules.map(rule => JSON.stringify(rule.rule)).join('\n')}.
              Do not discuss the data or its structure. 
              Instead, identify the field with the most errors and the most frequently violated rule. 
              Suggest corrective actions to fix the data issues from an end-user standpoint, focusing only on what should be done.
            `
            const choice = await this.openAIService.generateAISummary(plainText);
            return new SuccessResponseObject('GPT response', choice)
        }
        catch(e){
            throw new HttpException("openai api call failed", HttpStatus.CONFLICT);
        }
    }
}