import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Rule } from '../entities/rule.entity';

@EntityRepository(Rule)
export class RuleRepository extends BaseRepository<Rule> {}
