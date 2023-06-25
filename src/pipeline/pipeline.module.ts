import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pipelineService } from './services/pipeline.service';
import { pipelineController } from './pipeline.controller';
import { PipelineRepository } from './repositories/pipeline.repository';
import { PipelineDocumentRepository } from './repositories/pipelineDocument.repository';
import { PipelineStageRepository } from './repositories/pipelineStage.repository';
import { pipelineStageService } from './services/pipelineStage.service';
import { PipelineDocumentService } from './services/pipelineDocument.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PipelineRepository,
      PipelineDocumentRepository,
      PipelineStageRepository,
    ]),
  ],
  providers: [pipelineService, pipelineStageService, PipelineDocumentService],
  controllers: [pipelineController],
})
export class pipelineModule {}
