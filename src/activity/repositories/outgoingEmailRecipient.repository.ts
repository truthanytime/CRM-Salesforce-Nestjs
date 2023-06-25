import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OutgoingEmailRecipient } from '../entities/outgoingEmailRecipient.entity';

@EntityRepository(OutgoingEmailRecipient)
export class OutgoingEmailRecipientRepository extends BaseRepository<OutgoingEmailRecipient> {}
