import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealProduct } from '../entities/dealProduct.entity';

@EntityRepository(DealProduct)
export class DealProductRepository extends BaseRepository<DealProduct> {}
