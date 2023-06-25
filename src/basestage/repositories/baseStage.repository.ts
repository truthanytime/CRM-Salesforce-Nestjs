import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { BaseStage } from '../entities/baseStage.entity';

@EntityRepository(BaseStage)
export class BaseStageRepository extends BaseRepository<BaseStage> {}
