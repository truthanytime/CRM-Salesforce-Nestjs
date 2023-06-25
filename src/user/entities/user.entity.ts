import { Account } from '@/account/entities/account.entity';
import { Contact } from '@/contact/entities/contact.entity';
import { IntegrationState } from '@/integration/integrationState.entity';
import { Product } from '@/product/entities/product.entity';
import { Tenant } from '@/tenant/entities/tenant.entity';
import { JobRoleForTenantUser } from '@/tenantUserJobRole/entities/jobRoleForTenantUser.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UserType } from '../types';
import { UserContactInformation } from './userContactInformation.entity';
import { UserPermission } from './userPermission.entity';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column({ nullable: true })
  userPassword?: string;

  @Column()
  userType: UserType;

  @Index({ unique: true })
  @Column()
  userCognitoId: string;

  @Column({ nullable: true })
  userCreatedBy?: number;

  @Column({ nullable: true })
  userModifiedBy?: number;

  @Column({ type: 'timestamp', default: () => 'now()' })
  userCreatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  userUpdatedAt: Date;

  @Column({ type: 'boolean', default: true })
  userActive: boolean;

  @Column({ type: 'int', nullable: true })
  tenantId?: number;

  // Relations

  @ManyToOne(() => Tenant, (tenant) => tenant.users, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'tenantId' })
  tenant?: Tenant;

  @OneToOne(
    // same as profile
    () => UserContactInformation,
    (contactInfo) => contactInfo.user,
    { nullable: true },
  )
  contactInfo?: UserContactInformation;

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission,
  )
  userPermissions?: UserPermission[];

  @OneToMany(() => IntegrationState, (integratedApp) => integratedApp.user)
  integratedApps?: IntegrationState[];

  @OneToMany(
    () => JobRoleForTenantUser,
    (jobRoleForTenantUser) => jobRoleForTenantUser.user,
  )
  jobRoleForTenantUsers?: JobRoleForTenantUser[];

  @OneToMany(() => Account, (account) => account.accountCreater)
  createdAccounts?: Account[];
  @OneToMany(() => Account, (account) => account.tenantUser)
  ownedAccounts?: Account[];

  @OneToMany(() => Contact, (contact) => contact.contactCreator)
  createdContacts?: Contact[];
  @OneToMany(() => Contact, (contact) => contact.tenantUser)
  ownedContacts?: Contact[];

  @OneToMany(() => Product, (product) => product.productCreator)
  createdProducts?: Product[];

  @OneToMany(() => DataMigration, (dataMigration) => dataMigration.user)
  dataMigrations?: DataMigration[];
}
