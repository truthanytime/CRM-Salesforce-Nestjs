import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SourceForContact } from '../entities/sourceForContact.entity';

@EntityRepository(SourceForContact)
export class SourceForContactRepository extends BaseRepository<SourceForContact> {}
