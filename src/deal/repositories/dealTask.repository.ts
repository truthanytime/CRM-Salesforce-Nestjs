import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealTask } from '../entities/dealTask.entity';

@EntityRepository(DealTask)
export class DealTaskRepository extends BaseRepository<DealTask> {}
