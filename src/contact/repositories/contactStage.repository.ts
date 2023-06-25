import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ContactStage } from '../entities/contactStage.entity';

@EntityRepository(ContactStage)
export class ContactStageRepository extends BaseRepository<ContactStage> {}
