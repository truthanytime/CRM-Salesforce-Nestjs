import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '@/tenant/entities/tenant.entity';
import { DataSource } from '../../data-source/dataSource.entity';
import { DataMigrationStatus } from '@/core/types';
import { User } from '@/user/entities/user.entity';
import { Rule } from '@/data-raptor/entities/rule.entity';

@Entity()
export class DataMigration {
  @PrimaryGeneratedColumn('uuid')
  dataMigrationId: string;

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  dataSourceId: string;

  @Column({ default: DataMigrationStatus.REQUESTED })
  status: DataMigrationStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  statusDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  syncedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.dataMigrations)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'tenantId' })
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.dataMigrations)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.userDataMigrations)
  @JoinColumn({ name: 'data_source_id', referencedColumnName: 'dataSourceId' })
  dataSource: DataSource;

  @OneToMany(() => Rule, (rule) => rule.migration)
  rules?: Rule[];
}
