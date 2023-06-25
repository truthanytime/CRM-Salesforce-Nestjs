import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserContactInformation } from '../entities/userContactInformation.entity';

@EntityRepository(UserContactInformation)
export class UserContactInformationRepository extends BaseRepository<UserContactInformation> {}
