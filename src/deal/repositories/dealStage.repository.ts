import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealStage } from '../entities/dealStage.entity';

@EntityRepository(DealStage)
export class DealStageRepository extends BaseRepository<DealStage> {}
