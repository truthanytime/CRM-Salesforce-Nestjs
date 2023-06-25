import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AccountContact } from '../entities/accountContact.entity';

@EntityRepository(AccountContact)
export class AccountContactRepository extends BaseRepository<AccountContact> {}
