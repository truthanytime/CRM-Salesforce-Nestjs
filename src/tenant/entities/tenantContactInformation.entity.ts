import { AddressType } from '@/user/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity()
export class TenantContactInformation {
  @PrimaryGeneratedColumn()
  tenantContInfoId: number;

  @Column()
  tenantId: number;

  @Column({ default: AddressType.MAILING })
  addressType: AddressType;

  @Column({ default: true })
  isCurrent: boolean;

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

  @ManyToOne(() => Tenant, (tenant) => tenant.contactInfos, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'tenantId',
  })
  tenant?: Tenant;
}
