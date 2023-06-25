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
export class ForecastCategory {
  @PrimaryGeneratedColumn()
  forecastCategoryId: number;

  @Column()
  forecastCategoryName: string;

  @Column({ type: 'text' })
  description: string;
}
