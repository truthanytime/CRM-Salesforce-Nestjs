import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EmailType } from '../entities/emailType.entity';

@EntityRepository(EmailType)
export class EmailTypeRepository extends BaseRepository<EmailType> {}
