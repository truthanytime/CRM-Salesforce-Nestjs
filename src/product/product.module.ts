import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductCategoryRepository } from './repositories/productCategory.repository';
import { ProductChargeType } from './entities/productChargeType.entity';
import { PriceBookTypeRepository } from './repositories/priceBookType.repository';
import { ProductPriceBookRepository } from './repositories/productPriceBook.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      ProductCategoryRepository,
      ProductChargeType,
      PriceBookTypeRepository,
      ProductPriceBookRepository,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
