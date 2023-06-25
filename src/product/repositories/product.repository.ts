import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
