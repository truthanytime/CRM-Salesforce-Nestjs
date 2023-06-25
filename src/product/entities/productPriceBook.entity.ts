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
export class ProductPriceBook {
  @PrimaryGeneratedColumn()
  productPriceBookId: number;

  @Column()
  productId: number;

  @Column()
  priceBookId: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  currency: string;

  @Column()
  isActive: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;
}
