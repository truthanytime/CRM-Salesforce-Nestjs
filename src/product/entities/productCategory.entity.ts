import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  productCategoryId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // @OneToMany(() => Product, (product) => product.productCategory)
  // products: Product[];
}
