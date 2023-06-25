import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TenantUserJobRole } from '../entities/tenantUserJobRole.entity';

@EntityRepository(TenantUserJobRole)
export class TenantUserJobRoleRepository extends BaseRepository<TenantUserJobRole> {}
