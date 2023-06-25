import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Activity } from '../entities/activity.entity';

@EntityRepository(Activity)
export class ActivityRepository extends BaseRepository<Activity> {}
