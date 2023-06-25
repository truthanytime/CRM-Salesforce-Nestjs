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
export class PriceBookType {
  @PrimaryGeneratedColumn()
  priceBookTypeId: number;

  @Column()
  priceBookTypeName: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
