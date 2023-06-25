import { User } from '@/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TenantUserJobRole } from './tenantUserJobRole.entity';

@Entity()
export class JobRoleForTenantUser {
  @PrimaryGeneratedColumn()
  jobRoleForTenantUserId: number;

  @Column()
  userId: number;

  @Column()
  tenantUserJobRoleId: number;

  @Column({ default: true })
  isCurrent: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @ManyToOne(() => User, (user) => user.jobRoleForTenantUsers)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
  })
  user?: User;

  @ManyToOne(
    () => TenantUserJobRole,
    (tenantUserJobRole) => tenantUserJobRole.jobRoleForTenantUsers,
  )
  @JoinColumn({
    name: 'tenantuserjobroleid',
    referencedColumnName: 'tenantUserJobRoleId',
  })
  tenantUserJobRole?: TenantUserJobRole;
}
