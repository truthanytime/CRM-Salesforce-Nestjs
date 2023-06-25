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
export class DealCampaign {
  @PrimaryGeneratedColumn()
  dealCampaignId: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;
}
