import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeForDeal } from '../entities/typeForDeal.entity';

@EntityRepository(TypeForDeal)
export class TypeForDealRepository extends BaseRepository<TypeForDeal> {}
