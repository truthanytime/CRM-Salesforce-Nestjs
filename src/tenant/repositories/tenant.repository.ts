import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Tenant } from '../entities/tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends BaseRepository<Tenant> {}
