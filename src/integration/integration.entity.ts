import { AppIds } from '@/core/types';
import { APPLICATION_STATUS } from '@/core/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { IntegrationState } from './integrationState.entity';
import { DataSource } from '@/data-source/dataSource.entity';
import { IntegrationType } from '@/core/types';

@Entity()
export class Integration {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column({ unique: true })
  applicationId: AppIds;

  @Column({ unique: true })
  applicationName: string;

  @Column({ nullable: true })
  applicationDescription?: string;

  applicationStatus?: APPLICATION_STATUS;

  @Column()
  applicationIcon: string;

  @Column()
  providerName: string;

  @Column()
  providerLink: string;

  @Column({ default: 0 })
  totalInstalls: string;

  @Column({ type: 'character varying', array: true })
  categories: string[];

  @Column({ type: 'character varying', array: true })
  features: string[];

  @Column()
  languages: string;

  @Column({ type: 'character varying', array: true, nullable: true })
  requirementPermissions: string[];

  @Column()
  subscriptionTitle: string;

  @Column()
  subscriptions: string;

  @Column({ default: '' })
  subscriptionLink: string;

  @Column({ default: 0 })
  sort: number;

  @Column({ enum: IntegrationType, default: IntegrationType.USER })
  type: string;

  @OneToMany(
    () => IntegrationState,
    (integratedApp) => integratedApp.integration,
  )
  integratedApps: IntegrationState[];

  @OneToOne(() => DataSource, (dataSource) => dataSource.integration)
  dataSource: DataSource;
}
