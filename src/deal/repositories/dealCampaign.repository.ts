import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealCampaign } from '../entities/dealCampaign.entity';

@EntityRepository(DealCampaign)
export class DealCampaignRepository extends BaseRepository<DealCampaign> {}
