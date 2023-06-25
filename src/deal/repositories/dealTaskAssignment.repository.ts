import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealTaskAssignment } from '../entities/dealTaskAssignment.entity';

@EntityRepository(DealTaskAssignment)
export class DealTaskAssignmentRepository extends BaseRepository<DealTaskAssignment> {}
