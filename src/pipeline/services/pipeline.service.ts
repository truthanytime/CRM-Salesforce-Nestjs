import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatepipelineRequestDto } from '../dto/create-pipeline.request.dto';
import { pipelineResponseDto } from '../dto/pipeline.response.dto';
import { UpdatepipelineRequestDto } from '../dto/update-pipeline.request.dto';
import { Pipeline } from '../entities/pipeline.entity';
import { PipelineRepository } from '../repositories/pipeline.repository';
import { PipelineDocumentService } from './pipelineDocument.service';
import { pipelineStageService } from './pipelineStage.service';
@Injectable()
export class pipelineService {
  constructor(
    private readonly pipelineRepository: PipelineRepository,
    private readonly pipelineStageService: pipelineStageService,
    private readonly pipelineDocumentService: PipelineDocumentService,
  ) {}

  async create(
    data: CreatepipelineRequestDto,
    ownerId: number,
  ): Promise<pipelineResponseDto> {
    const newPipeline: Pipeline = {
      pipelineId: 0,
      tenantId: ownerId,
      creatorTenantUserId: ownerId,
      isActive: true,
      createDate: undefined,
      startDate: undefined,
      endDate: undefined,
      ...data,
    };
    const pipeline = this.pipelineRepository.create(newPipeline);

    const savedpipeline = await this.pipelineRepository.save(pipeline);

    for (const pipelineStage of data.pipelineStages) {
      await this.pipelineStageService.create({
        ...pipelineStage,
        pipeline: savedpipeline,
      });
    }

    for (const pipelineDocument of data.pipelineDocuments) {
      await this.pipelineDocumentService.create({
        ...pipelineDocument,
        pipeline: savedpipeline,
      });
    }

    return savedpipeline;
  }

  async findOne(id: number, ownerId: number): Promise<pipelineResponseDto> {
    const pipeline = await this.pipelineRepository.findOne(id);
    if (!pipeline) {
      throw new NotFoundException('Pipeline not found!');
    }
    return null;
  }

  async update(
    id: number,
    data: UpdatepipelineRequestDto,
    ownerId: number,
  ): Promise<pipelineResponseDto> {
    const pipeline = await this.pipelineRepository.findOne(id);

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found!');
    }

    const updated: Pipeline = {
      ...pipeline,
      ...data,
    };

    const savedpipeline = await this.pipelineRepository.save(updated);

    for (const pipelineStage of data.pipelineStages) {
      const stage = { ...pipelineStage, pipeline: savedpipeline };

      await this.pipelineStageService.update(
        pipelineStage.pipelineStageId,
        stage,
      );
    }

    for (const pipelineDocument of data.pipelineDocuments) {
      const document = { ...pipelineDocument, pipeline: savedpipeline };

      await this.pipelineDocumentService.update(
        pipelineDocument.pipelineDocumentId,
        document,
      );
    }

    return savedpipeline;
  }

  async findAll(userId: number): Promise<pipelineResponseDto[]> {
    const pipelineResponse: pipelineResponseDto[] =
      await this.pipelineRepository.find({
        where: { creatorTenantUserId: userId },
        relations: [
          'pipelineStages',
          'pipelineDocuments',
          'pipelineProducts',
          'pipelineUsers',
          'pipelineStages.pipelineStageOwners',
        ],
      });
    return pipelineResponse;
  }

  async delete(id: number, ownerId: number): Promise<void> {
    const pipeline = await this.pipelineRepository.findOne(id);

    if (!pipeline) {
      throw new NotFoundException('Pipeline not found!');
    }

    await this.pipelineRepository.remove([pipeline]);
  }
}
