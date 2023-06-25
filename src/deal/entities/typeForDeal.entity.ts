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
export class TypeForDeal {
  @PrimaryGeneratedColumn()
  typeForDealId: number;

  @Column()
  dealId: number;

  @Column()
  dealTypeId: number;

  @Column({ type: 'boolean' })
  isCurrent: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
}
