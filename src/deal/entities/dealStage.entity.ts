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
export class DealStage {
  @PrimaryGeneratedColumn()
  dealStageId: number;

  @Column()
  dealStageName: string;

  @Column({ type: 'text' })
  description: string;
}
