import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeForAccount } from '../entities/typeForAccount.entity';

@EntityRepository(TypeForAccount)
export class TypeForAccountRepository extends BaseRepository<TypeForAccount> {}
