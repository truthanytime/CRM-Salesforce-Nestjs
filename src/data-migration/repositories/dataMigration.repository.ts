import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DataMigration } from '../entities/dataMigration.entity';

@EntityRepository(DataMigration)
export class DataMigrationRepository extends BaseRepository<DataMigration> {}
