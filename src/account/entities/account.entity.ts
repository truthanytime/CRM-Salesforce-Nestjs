import { Contact } from '@/contact/entities/contact.entity';
import { Deal } from '@/deal/entities/deal.entity';
import { Industry } from '@/industry/industry.entity';
import { TenantAccount } from '@/tenant/entities/tenantAccount.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccountContact } from './accountContact.entity';
import { AccountStage } from './accountStage.entity';
import { AccountContactInformation } from './accounttContactInformation.entity';
import { AccountType } from './accountType.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountId: number;

  @Column()
  accountName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  webURL: string;

  @Column({ nullable: true })
  industryId: number;

  @Column({ type: 'timestamp', nullable: true })
  foundedDate: Date;

  @Column({ nullable: true })
  employeesNumber: number;

  @Column({ nullable: true })
  revenuePerYear: number;

  @Column({ nullable: true })
  childOf: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateDate: Date;

  @Column()
  createdBy: number;

  @Column({ nullable: true })
  tenantUserId?: number;

  @Column({ nullable: true })
  accountTypeId: number;

  @Column({ nullable: true })
  accountStageId: number;

  @Column({ type: 'boolean', default: true })
  accountStatus: boolean;

  @OneToMany(() => Contact, (contact) => contact.account)
  contacts?: Contact[];

  @OneToMany(() => Deal, (deal) => deal.account, {
    onDelete: 'CASCADE',
  })
  deals?: Deal[];

  @ManyToOne(() => Industry, (industry) => industry.accounts, {
    nullable: true,
  })
  @JoinColumn({
    name: 'industry_id',
    referencedColumnName: 'industryId',
  })
  industry?: Industry;

  @ManyToOne(() => Account, (parent) => parent.childs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'child_of', referencedColumnName: 'accountId' })
  parent?: Account;

  @OneToMany(() => Account, (child) => child.parent)
  childs?: Account[];

  @ManyToOne(() => User, (creater) => creater.createdAccounts)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'userId',
  })
  accountCreater?: User;

  @ManyToOne(() => AccountType, (accountType) => accountType.account, {
    nullable: true,
  })
  @JoinColumn({
    name: 'account_type_id',
    referencedColumnName: 'accountTypeId',
  })
  accountType?: AccountType;

  @ManyToOne(() => AccountStage, (accountStage) => accountStage.account, {
    nullable: true,
  })
  @JoinColumn({
    name: 'account_stage_id',
    referencedColumnName: 'accountStageId',
  })
  accountStage?: AccountStage;

  @ManyToOne(() => User, (tenantUser) => tenantUser.ownedAccounts, {
    nullable: true,
  })
  @JoinColumn({
    name: 'tenant_user_id',
    referencedColumnName: 'userId',
  })
  tenantUser?: User;

  @OneToMany(() => TenantAccount, (tenantAccount) => tenantAccount.account, {
    onDelete: 'CASCADE',
  })
  tenantAccounts?: TenantAccount[];

  @OneToOne(
    () => AccountContactInformation,
    (contactInfo) => contactInfo.account,
    {
      onDelete: 'CASCADE',
    },
  )
  contactInfo?: AccountContactInformation;
}
