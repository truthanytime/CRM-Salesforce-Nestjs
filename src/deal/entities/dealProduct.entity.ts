import { Account } from '@/account/entities/account.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DealProduct {
  @PrimaryGeneratedColumn()
  dealProductId: number;

  @Column()
  dealId: number;

  @Column()
  productId: number;

  @Column()
  productPriceBookId: number;

  @Column()
  creatorTenantUserId: number;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column()
  unitPrice: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;
}
