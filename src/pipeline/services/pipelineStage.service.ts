import { Injectable } from '@nestjs/common';
import { Pipeline } from '../entities/pipeline.entity';
import { PipelineStage } from '../entities/pipelineStage.entity';
import { PipelineStageRepository } from '../repositories/pipelineStage.repository';
@Injectable()
export class pipelineStageService {
  constructor(
    private readonly pipelineStageRepository: PipelineStageRepository,
  ) {}

  async create(data: PipelineStage): Promise<PipelineStage> {
    const savedpipelineStage = this.pipelineStageRepository.create({
      ...data,
    });

    const r = await this.pipelineStageRepository.save(savedpipelineStage);

    return r;
  }

  async update(
    pipelineStageId: number,
    data: PipelineStage,
  ): Promise<PipelineStage> {
    const pipelineStage = await this.pipelineStageRepository.findOne({
      pipelineStageId,
    });

    const updated = this.pipelineStageRepository.save({
      ...pipelineStage,
      ...data,
    });

    return updated;
  }
}
