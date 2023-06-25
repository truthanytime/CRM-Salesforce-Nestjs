import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TenantAccount } from '../entities/tenantAccount.entity';

@EntityRepository(TenantAccount)
export class TenantAccountRepository extends BaseRepository<TenantAccount> {}
