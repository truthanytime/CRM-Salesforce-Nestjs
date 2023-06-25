import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRaptorRuleController } from './controllers/data-raptor-rule.controller';
import { RuleService } from './services/rule.service';
import { RuleRepository } from './repositories/rule.repository';
import { DataMigrationModule } from '@/data-migration/data-migration.module';
import { SqsModule } from '@/core/lib/aws/sqs/sqs.module';
import { UpdateGateway } from './gateways/update.gateway';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuleRepository]),
    DataMigrationModule,
    SqsModule,
    AuthModule,
  ],
  controllers: [DataRaptorRuleController],
  providers: [RuleService, UpdateGateway],
})
export class DataRaptorModule {}
