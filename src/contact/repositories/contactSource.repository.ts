import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ContactSource } from '../entities/contactSource.entity';

@EntityRepository(ContactSource)
export class ContactSourceRepository extends BaseRepository<ContactSource> {}
