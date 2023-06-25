import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MeetingAttendee } from '../entities/meetingAttendee.entity';

@EntityRepository(MeetingAttendee)
export class MeetingAttendeeRepository extends BaseRepository<MeetingAttendee> {}
