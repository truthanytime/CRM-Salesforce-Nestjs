import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ContactContactInformation } from '../entities/contactContactInformation.entity';

@EntityRepository(ContactContactInformation)
export class ContactContactInformationRepository extends BaseRepository<ContactContactInformation> {}
