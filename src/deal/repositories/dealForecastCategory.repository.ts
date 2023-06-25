import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DealForecastCategory } from '../entities/dealForecastCategory.entity';

@EntityRepository(DealForecastCategory)
export class DealForecastCategoryRepository extends BaseRepository<DealForecastCategory> {}
