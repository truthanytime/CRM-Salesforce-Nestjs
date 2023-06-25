import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserPermission } from '../entities/userPermission.entity';

@EntityRepository(UserPermission)
export class UserPermissionRepository extends BaseRepository<UserPermission> {}
