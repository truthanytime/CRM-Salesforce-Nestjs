import { User } from '@/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Pipeline } from '../entities/pipeline.entity';
import { PipelineStage } from '../entities/pipelineStage.entity';

@EntityRepository(PipelineStage)
export class PipelineStageRepository extends BaseRepository<PipelineStage> {}
