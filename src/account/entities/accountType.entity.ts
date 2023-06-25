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
export class AccountType {
  @PrimaryGeneratedColumn()
  accountTypeId: number;

  @Column()
  accountTypeName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Account, (account) => account.accountType)
  account?: Account[];
}
