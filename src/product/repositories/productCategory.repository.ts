import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductCategory } from '../entities/productCategory.entity';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {}
