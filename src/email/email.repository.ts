import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Email } from './email.entity';

@EntityRepository(Email)
export class EmailRepository extends BaseRepository<Email> {}
