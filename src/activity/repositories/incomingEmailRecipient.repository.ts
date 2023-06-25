import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { IncomingEmailRecipient } from '../entities/incomingEmailRecipient.entity';

@EntityRepository(IncomingEmailRecipient)
export class IncomingEmailRecipientRepository extends BaseRepository<IncomingEmailRecipient> {}
