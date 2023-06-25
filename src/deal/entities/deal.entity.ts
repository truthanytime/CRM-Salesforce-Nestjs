import { Account } from '@/account/entities/account.entity';
import { Contact } from '@/contact/entities/contact.entity';
import { Tenant } from '@/tenant/entities/tenant.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  dealId: number;

  @Column()
  dealName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  pipelineId: number;

  @Column({ nullable: true })
  tenantId: number;

  @Column({ nullable: true })
  tenantUserId: number;

  @Column({ nullable: true })
  accountId: number;

  @Column({ nullable: true })
  contactId: number;

  @Column({ nullable: true })
  campaignId: number;

  @Column()
  createdBy: number;

  @Column({ type: 'decimal', nullable: true })
  totalAmount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdDate: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateDate: Date;

  // @ManyToOne(() => User, (user) => user.modifiedDeals, { nullable: true })
  // @JoinColumn({
  //   name: 'deal_modified_by',
  //   referencedColumnName: 'userId',
  // })
  // dealModifier?: User;

  // @ManyToOne(() => User, (user) => user.ownedDeals, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({
  //   name: 'deal_owner_id',
  //   referencedColumnName: 'userId',
  // })
  // dealOwner?: User;

  @ManyToOne(() => Account, (account) => account.deals, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'accountId',
  })
  account?: Account;

  @ManyToOne(() => Contact, (contact) => contact.deals, { nullable: true })
  @JoinColumn({
    name: 'contact_id',
    referencedColumnName: 'contactId',
  })
  contact?: Contact;

  @ManyToOne(() => Tenant, (tenant) => tenant.deals, { nullable: true })
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'tenantId',
  })
  tenant?: Tenant;
}
