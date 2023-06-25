import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PriceBookType } from '../entities/priceBookType.entity ';

@EntityRepository(PriceBookType)
export class PriceBookTypeRepository extends BaseRepository<PriceBookType> {}
