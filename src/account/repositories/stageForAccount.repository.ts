import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { StageForAccount } from '../entities/stageForAccount.entity';

@EntityRepository(StageForAccount)
export class StageForAccountRepository extends BaseRepository<StageForAccount> {}
