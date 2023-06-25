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
export class DealForecastCategory {
  @PrimaryGeneratedColumn()
  dealForecastCategoryId: number;

  @Column()
  dealId: number;

  @Column()
  forecastCategoryId: number;

  @Column({ type: 'decimal', nullable: true })
  percentage: number;

  @Column({ type: 'boolean' })
  isCurrent: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
}
