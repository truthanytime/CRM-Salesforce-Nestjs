import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EmailActivityDetail } from '../entities/emailActivityDetail.entity';

@EntityRepository(EmailActivityDetail)
export class EmailActivityDetailRepository extends BaseRepository<EmailActivityDetail> {}
