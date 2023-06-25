import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  ProductCategory,
  ProductCurrency,
  ProductRateChargeType,
} from '../types';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  category: ProductCategory;

  @Column()
  rateChargeType: ProductRateChargeType;

  @Column()
  currency: ProductCurrency;

  @Column()
  price: number;

  @Column()
  createdBy: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  // @ManyToOne(() => ProductChargeType, (chargeType) => chargeType.products)
  // @JoinColumn({
  //   name: 'charge_type_id',
  //   referencedColumnName: 'productChargeTypeId',
  // })
  // productChargeType: ProductChargeType;

  // @ManyToOne(
  //   () => ProductCategory,
  //   (productCategory) => productCategory.products,
  // )
  // @JoinColumn({
  //   name: 'category_id',
  //   referencedColumnName: 'productCategoryId',
  // })
  // productCategory: ProductCategory;

  @ManyToOne(() => User, (tenantUser) => tenantUser.createdProducts)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'userId',
  })
  productCreator: User;
}
