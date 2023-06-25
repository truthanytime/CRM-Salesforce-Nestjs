import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealNote } from '../entities/dealNote.entity';

@EntityRepository(DealNote)
export class DealNoteRepository extends BaseRepository<DealNote> {}
