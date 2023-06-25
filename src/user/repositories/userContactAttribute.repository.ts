import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserContactAttribute } from '../entities/userContactAttribute.entity';

@EntityRepository(UserContactAttribute)
export class UserContactAttributeRepository extends BaseRepository<UserContactAttribute> {}
