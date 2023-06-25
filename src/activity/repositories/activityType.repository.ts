import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ActivityType } from '../entities/activityType.entity';

@EntityRepository(ActivityType)
export class ActivityTypeRepository extends BaseRepository<ActivityType> {}
