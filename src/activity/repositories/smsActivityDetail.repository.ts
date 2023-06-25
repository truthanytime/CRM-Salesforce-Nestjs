import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SmsActivityDetail } from '../entities/smsActivityDetail.entity';

@EntityRepository(SmsActivityDetail)
export class SmsActivityDetailRepository extends BaseRepository<SmsActivityDetail> {}
