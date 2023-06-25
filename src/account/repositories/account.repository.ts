import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Account } from '../entities/account.entity';

@EntityRepository(Account)
export class AccountRepository extends BaseRepository<Account> {}
