import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Contact } from '../entities/contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends BaseRepository<Contact> {}
