import { Deal } from '@/deal/entities/deal.entity';
import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TenantAccount } from './tenantAccount.entity';
import { TenantContactInformation } from './tenantContactInformation.entity';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { IntegrationState } from '@/integration/integrationState.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  tenantId: number;

  @Column()
  tenantName: string;

  @Column({ nullable: true })
  industryId?: number;

  @Column({ nullable: true })
  webURL?: string;

  @Column({ nullable: true })
  employeesNumber?: string;

  @Column({ nullable: true })
  suggestedDomain?: string;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionDate?: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  @Column()
  ownerId: number;

  @OneToMany(
    () => TenantContactInformation,
    (contactInfo) => contactInfo.tenant,
    { onDelete: 'CASCADE' },
  )
  contactInfos?: TenantContactInformation[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'userId' })
  owner: User;

  @OneToMany(() => User, (user) => user.tenant, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => TenantAccount, (tenantAccount) => tenantAccount.tenant, {
    onDelete: 'CASCADE',
  })
  tenantAccounts: TenantAccount[];

  @OneToMany(() => Deal, (deal) => deal.contact)
  deals?: Deal[];

  @OneToMany(() => DataMigration, (dataMigration) => dataMigration.tenant)
  dataMigrations?: DataMigration[];

  @OneToMany(
    () => IntegrationState,
    (integrationState) => integrationState.tenant,
  )
  integrationStates?: IntegrationState[];
}
