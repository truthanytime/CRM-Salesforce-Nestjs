import { EntityRepository, createQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DataSource } from './dataSource.entity';
import { IntegrationState } from '../integration/integrationState.entity';
import { Integration } from '../integration/integration.entity';
import { DataMigration } from '../data-migration/entities/dataMigration.entity';
import { GetIntegratedDataSourcesDto } from './dto/get-integrated-data-sources';

@EntityRepository(DataSource)
export class DataSourceRepository extends BaseRepository<DataSource> {
  getAvailableDataSources(
    userId: number,
    tenantId: number,
  ): Promise<GetIntegratedDataSourcesDto[]> {
    return createQueryBuilder(DataSource, 'ds')
      .leftJoinAndSelect(
        Integration,
        'inte',
        'inte.application_id = ds.integration_id ',
      )
      .leftJoin(
        DataMigration,
        'dm',
        'dm.data_source_id = ds.data_source_id and (dm.user_id = :userId or dm.tenant_id = :tenantId)',
        { userId, tenantId },
      )
      .leftJoin(
        IntegrationState,
        'inte_state',
        'inte_state.integration_id  = inte.id and (inte_state.user_id = :userId or inte_state.tenant_id = :tenantId)',
        { userId, tenantId },
      )
      .select([
        'ds.data_source_id as data_source_id',
        'ds.name as name',
        'ds.integration_id as integration_name_id',
        'inte.id as integration_id',
        'inte.application_icon as integration_icon',
        'inte_state.id as integration_state_id',
        'dm.status as migration_status',
        'dm.status_date as migration_status_date',
        'dm.data_migration_id as migration_id',
      ])
      .getRawMany();
  }
}
