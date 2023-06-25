import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TenantContactInformation } from '../entities/tenantContactInformation.entity';

@EntityRepository(TenantContactInformation)
export class TenantContactInformationRepository extends BaseRepository<TenantContactInformation> {}
