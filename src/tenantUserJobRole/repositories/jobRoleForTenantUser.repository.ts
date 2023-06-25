import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { JobRoleForTenantUser } from '../entities/jobRoleForTenantUser.entity';

@EntityRepository(JobRoleForTenantUser)
export class JobRoleForTenantUserRepository extends BaseRepository<JobRoleForTenantUser> {}
