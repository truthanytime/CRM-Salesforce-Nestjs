import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAIController } from './open-ai.controller';
import { OpenAIService } from './open-ai.service';
import { DataMigrationModule } from '@/data-migration/data-migration.module';
import { DataMigrationRepository } from '@/data-migration/repositories/dataMigration.repository';
import { DataRaptorModule } from '@/data-raptor/data-raptor.module';
import { RuleService } from '@/data-raptor/services/rule.service';
import { RuleRepository } from '@/data-raptor/repositories/rule.repository';

@Module({
    imports: [
        DataMigrationModule,
        TypeOrmModule.forFeature([DataMigrationRepository]),
        TypeOrmModule.forFeature([RuleRepository]),
        DataRaptorModule,
    ],
    controllers: [OpenAIController],
    providers: [
        OpenAIService,
        RuleService
    ],
    exports: [OpenAIService],
})

export class OpenAIModule {}