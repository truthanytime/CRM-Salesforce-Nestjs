import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { JobRoleForContact } from '../entities/jobRoleForContact.entity';

@EntityRepository(JobRoleForContact)
export class JobRoleForContactRepository extends BaseRepository<JobRoleForContact> {}
