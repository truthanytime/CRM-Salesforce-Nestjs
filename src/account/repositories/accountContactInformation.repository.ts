import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AccountContactInformation } from '../entities/accounttContactInformation.entity';

@EntityRepository(AccountContactInformation)
export class AccountContactInformationRepository extends BaseRepository<AccountContactInformation> {}
