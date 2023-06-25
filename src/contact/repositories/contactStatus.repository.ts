import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ContactStatus } from '../entities/contactStatus.entity';

@EntityRepository(ContactStatus)
export class ContactStatusRepository extends BaseRepository<ContactStatus> {}
