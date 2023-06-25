import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AccountStage } from '../entities/accountStage.entity';

@EntityRepository(AccountStage)
export class AccountStageRepository extends BaseRepository<AccountStage> {}
