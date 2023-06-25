import { Contact } from '@/contact/entities/contact.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class StageForAccount {
  @PrimaryGeneratedColumn()
  stageForAccountId: number;

  @Column()
  accountStageId: number;

  @Column()
  accountId: number;

  @Column({ type: 'boolean' })
  isCurrentStage: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;
}
