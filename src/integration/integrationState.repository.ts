import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { IntegrationState } from './integrationState.entity';

@EntityRepository(IntegrationState)
export class IntegrationStateRepository extends BaseRepository<IntegrationState> {}
