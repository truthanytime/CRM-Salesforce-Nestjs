import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PipelineDocument } from '../entities/pipelineDocument.entity';

@EntityRepository(PipelineDocument)
export class PipelineDocumentRepository extends BaseRepository<PipelineDocument> {}
