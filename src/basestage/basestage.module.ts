import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { baseStageService } from './basestage.service';
import { pipelineController } from './basestage.controller';
import { BaseStageRepository } from './repositories/baseStage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BaseStageRepository])],
  providers: [baseStageService],
  controllers: [pipelineController],
})
export class BaseStageModule {}
