import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AddressType } from '@/user/types';
import { Account } from './account.entity';

@Entity()
export class AccountContactInformation {
  @PrimaryGeneratedColumn()
  accountContInfoId: number;

  @Column({ nullable: true })
  accountId: number;

  @Column({ default: AddressType.MAILING })
  addressType?: AddressType;

  @Column({ default: true })
  isCurrent?: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  startValidDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endValidDate?: Date;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  mobileNumber?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  addressState?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToOne(() => Account, (account) => account.contactInfo, { nullable: true })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'accountId',
  })
  account?: Account;
}
