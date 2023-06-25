import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class AccountStage {
  @PrimaryGeneratedColumn()
  accountStageId: number;

  @Column()
  accountStageName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Account, (account) => account.accountStage)
  account?: Account[];
}
