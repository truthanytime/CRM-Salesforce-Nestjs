import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductPriceBook } from '../entities/productPriceBook.entity';

@EntityRepository(ProductPriceBook)
export class ProductPriceBookRepository extends BaseRepository<ProductPriceBook> {}
