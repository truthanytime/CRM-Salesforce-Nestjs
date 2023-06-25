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
export class ProductChargeType {
  @PrimaryGeneratedColumn()
  productChargeTypeId: number;

  @Column()
  productChargeTypeName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  //   @OneToMany(() => Product, (product) => product.productChargeType)
  //   products: Product[];
}
