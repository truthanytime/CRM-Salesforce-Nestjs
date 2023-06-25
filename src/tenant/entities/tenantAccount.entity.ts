import { Account } from '@/account/entities/account.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tenant } from './tenant.entity';
import { TenantContactInformation } from './tenantContactInformation.entity';

@Entity()
export class TenantAccount {
  @PrimaryGeneratedColumn()
  tenantAccountId: number;

  @Column()
  tenantId: number;

  @Column()
  accountId: number;

  @Column()
  isActive: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.tenantAccounts)
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'tenantId',
  })
  tenant?: Tenant;

  @ManyToOne(() => Account, (account) => account.tenantAccounts)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'accountId',
  })
  account?: Account;
}
