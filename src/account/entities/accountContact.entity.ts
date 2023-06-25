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
export class AccountContact {
  @PrimaryGeneratedColumn()
  accountContactId: number;

  @Column()
  accountId: number;

  @Column()
  contactId: number;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  // @ManyToOne(() => Account, (account) => account.accountContacts, {
  //   nullable: true,
  // })
  // @JoinColumn({
  //   name: 'account_id',
  //   referencedColumnName: 'accountId',
  // })
  // account?: Account;

  // @ManyToOne(() => Contact, (contact) => contact.accountContacts, {
  //   nullable: true,
  // })
  // @JoinColumn({
  //   name: 'contact_id',
  //   referencedColumnName: 'contactId',
  // })
  // contact?: Contact;
}
