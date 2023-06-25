import { Account } from '@/account/entities/account.entity';
import { Deal } from '@/deal/entities/deal.entity';
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
import { ContactType } from '../types';
import { ContactContactInformation } from './contactContactInformation.entity';
import { ContactSource } from './contactSource.entity';
import { ContactStage } from './contactStage.entity';
import { ContactStatus } from './contactStatus.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  contactId: number;

  @Column({ nullable: true })
  ssid: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateDate: Date;

  @Column({ nullable: true })
  workDepartmentId: number;

  @Column({ nullable: true })
  reportsTo: number;

  @Column({ nullable: true })
  contactStageId: number;

  @Column({ nullable: true })
  contactStatusId: number;

  @Column({ nullable: true })
  contactSourceId: number;

  @Column({ default: ContactType.ACTIVE })
  contactType: ContactType;

  @Column()
  createdBy: number;

  @Column({ nullable: true })
  tenantUserId: number;

  @Column({ nullable: true })
  accountId: number;

  @ManyToOne(() => Account, (account) => account.contacts, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'accountId',
  })
  account?: Account;

  @OneToMany(() => Deal, (deal) => deal.contact)
  deals?: Deal[];

  @ManyToOne(() => User, (creater) => creater.createdContacts)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'userId',
  })
  contactCreator?: User;

  @ManyToOne(() => User, (tenantUser) => tenantUser.ownedContacts)
  @JoinColumn({
    name: 'tenant_user_id',
    referencedColumnName: 'userId',
  })
  tenantUser?: User;

  @OneToOne(
    () => ContactContactInformation,
    (contactContactInformation) => contactContactInformation.contact,
  )
  contactInfo: ContactContactInformation;

  @ManyToOne(() => ContactStage, (contactStage) => contactStage.contact, {
    nullable: true,
  })
  @JoinColumn({
    name: 'contact_stage_id',
    referencedColumnName: 'contactStageId',
  })
  contactStage?: ContactStage;

  @ManyToOne(() => ContactStatus, (contactStatus) => contactStatus.contact, {
    nullable: true,
  })
  @JoinColumn({
    name: 'contact_status_id',
    referencedColumnName: 'contactStatusId',
  })
  contactStatus?: ContactStatus;

  @ManyToOne(() => ContactSource, (contactSource) => contactSource.contact, {
    nullable: true,
  })
  @JoinColumn({
    name: 'contact_source_id',
    referencedColumnName: 'contactSourceId',
  })
  contactSource?: ContactSource;
}
