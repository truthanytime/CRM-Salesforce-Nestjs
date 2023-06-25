import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { StageForDeal } from '../entities/stageForDeal.entity';

@EntityRepository(StageForDeal)
export class StageForDealRepository extends BaseRepository<StageForDeal> {}
