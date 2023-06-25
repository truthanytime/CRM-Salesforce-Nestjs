import { EntityRepository, createQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Integration } from './integration.entity';
import { IntegrationType } from '@/core/types';

@EntityRepository(Integration)
export class IntegrationRepository extends BaseRepository<Integration> {
  async getIntegrationsWithStateByUser(userId: number) {
    return await createQueryBuilder(Integration, 'integration')
      .leftJoinAndSelect(
        'integration.integratedApps',
        'state',
        'state.user_id = :userId',
        { userId },
      )
      .leftJoinAndSelect('state.user', 'user')
      .where('integration.type = :type', { type: IntegrationType.USER })
      .getMany();
  }

  async getIntegrationsWithStateByTenant(tenantId: number) {
    return await createQueryBuilder(Integration, 'integration')
      .leftJoinAndSelect(
        'integration.integratedApps',
        'state',
        'state.tenant_id = :tenantId',
        { tenantId },
      )
      .where('integration.type = :type', { type: IntegrationType.TENANT })
      .getMany();
  }

  async getOneIntegrationWithStateByUser(
    userId: number,
    applicationId: string,
  ) {
    return await createQueryBuilder(Integration, 'integration')
      .leftJoinAndSelect(
        'integration.integratedApps',
        'state',
        'state.user_id = :userId',
        { userId },
      )
      .leftJoinAndSelect('state.user', 'user')
      .where(
        'integration.applicationId = :applicationId and integration.type = :type',
        { applicationId, type: IntegrationType.USER },
      )
      .getOne();
  }

  async getOneIntegrationWithStateByTenant(
    tenantId: number,
    applicationId: string,
  ) {
    return await createQueryBuilder(Integration, 'integration')
      .leftJoinAndSelect(
        'integration.integratedApps',
        'state',
        'state.tenant_id = :tenantId',
        { tenantId },
      )
      .where(
        'integration.applicationId = :applicationId and integration.type = :type',
        { applicationId, type: IntegrationType.TENANT },
      )
      .getOne();
  }
}
