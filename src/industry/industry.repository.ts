import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Industry } from './industry.entity';

@EntityRepository(Industry)
export class IndustryRepository extends BaseRepository<Industry> {}
