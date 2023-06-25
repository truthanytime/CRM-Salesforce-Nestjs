import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Integration } from './integration.entity';
import { IntegrationSession } from '@/core/types';
import { Tenant } from '@/tenant/entities/tenant.entity';

@Entity()
export class IntegrationState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ nullable: true })
  userId?: number;

  @ManyToOne(() => User, (user) => user.integratedApps, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.dataMigrations)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'tenantId' })
  tenant: Tenant;

  @ManyToOne(() => Integration, (integration) => integration.integratedApps)
  integration: Integration;

  @Column({ nullable: true, type: 'json' })
  session: IntegrationSession;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
