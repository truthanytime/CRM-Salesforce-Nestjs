import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends BaseRepository<Permission> {}
