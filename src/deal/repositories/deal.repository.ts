import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Deal } from '../entities/deal.entity';

@EntityRepository(Deal)
export class DealRepository extends BaseRepository<Deal> {}
