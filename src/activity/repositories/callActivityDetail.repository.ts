import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CallActivityDetail } from '../entities/callActivityDetail.entity';

@EntityRepository(CallActivityDetail)
export class CallActivityDetailRepository extends BaseRepository<CallActivityDetail> {}
