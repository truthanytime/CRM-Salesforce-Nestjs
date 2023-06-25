import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ForecastCategory } from '../entities/forecastCategory.entity';

@EntityRepository(ForecastCategory)
export class ForecastCategoryRepository extends BaseRepository<ForecastCategory> {}
