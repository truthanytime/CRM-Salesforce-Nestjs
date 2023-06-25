import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { WorkDepartment } from '../entities/workDepartment.entity';

@EntityRepository(WorkDepartment)
export class WorkDepartmentRepository extends BaseRepository<WorkDepartment> {}
