import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SalePhase } from '../entities/salePhase.entity';

@EntityRepository(SalePhase)
export class SalePhaseRepository extends BaseRepository<SalePhase> {}
