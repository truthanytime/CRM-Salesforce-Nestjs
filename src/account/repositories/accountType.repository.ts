import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AccountType } from '../entities/accountType.entity';

@EntityRepository(AccountType)
export class AccountTypeRepository extends BaseRepository<AccountType> {}
