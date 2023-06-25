import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ContactSocialMedia } from '../entities/contactSocialMedia.entity';

@EntityRepository(ContactSocialMedia)
export class ContactSocialMediaRepository extends BaseRepository<ContactSocialMedia> {}
