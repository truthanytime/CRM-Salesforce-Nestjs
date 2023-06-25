import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends BaseRepository<Profile> {}
