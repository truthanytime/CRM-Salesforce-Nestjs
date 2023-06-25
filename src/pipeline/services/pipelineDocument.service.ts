import { Injectable } from '@nestjs/common';
import { Pipeline } from '../entities/pipeline.entity';
import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { PipelineDocumentRepository } from '../repositories/pipelineDocument.repository';

@Injectable()
export class PipelineDocumentService {
  constructor(
    private readonly pipelineDocumentRepository: PipelineDocumentRepository,
  ) {}

  async create(data: PipelineDocument): Promise<PipelineDocument> {
    const saved = await this.pipelineDocumentRepository.save({
      ...data,
    });

    return saved;
  }

  async update(
    pipelineDocumentId: number,
    data: PipelineDocument,
  ): Promise<PipelineDocument> {
    const document = await this.pipelineDocumentRepository.findOne({
      pipelineDocumentId,
    });

    const updated = this.pipelineDocumentRepository.save({
      ...document,
      ...data,
    });

    return updated;
  }
}
