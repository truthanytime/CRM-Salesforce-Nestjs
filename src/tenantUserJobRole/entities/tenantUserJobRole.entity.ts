import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { JobRoleForTenantUser } from './jobRoleForTenantUser.entity';

@Entity()
export class TenantUserJobRole {
  @PrimaryGeneratedColumn()
  tenantUserJobRoleId: number;

  @Column()
  title: string;

  @Column()
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(
    () => JobRoleForTenantUser,
    (jobRoleForTenantUser) => jobRoleForTenantUser.tenantUserJobRole,
  )
  jobRoleForTenantUsers?: JobRoleForTenantUser[];
}
