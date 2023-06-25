import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MeetingActivityDetail } from '../entities/meetingActivityDetail.entity';

@EntityRepository(MeetingActivityDetail)
export class MeetingActivityDetailRepository extends BaseRepository<MeetingActivityDetail> {}
