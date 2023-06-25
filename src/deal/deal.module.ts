import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './repositories/deal.repository';
import { TypeForDealRepository } from './repositories/typeForDeal.repository';
import { DealTaskRepository } from './repositories/dealTask.repository';
import { DealTaskAssignmentRepository } from './repositories/dealTaskAssignment.repository';
import { DealProductRepository } from './repositories/dealProduct.repository';
import { DealNoteRepository } from './repositories/dealNote.repository';
import { DealStageRepository } from './repositories/dealStage.repository';
import { StageForDealRepository } from './repositories/stageForDeal.repository';
import { DealCampaignRepository } from './repositories/dealCampaign.repository';
import { ForecastCategoryRepository } from './repositories/forecastCategory.repository';
import { DealForecastCategoryRepository } from './repositories/dealForecastCategory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DealRepository,
      TypeForDealRepository,
      DealTaskRepository,
      DealTaskAssignmentRepository,
      DealProductRepository,
      DealNoteRepository,
      DealStageRepository,
      StageForDealRepository,
      DealCampaignRepository,
      ForecastCategoryRepository,
      DealForecastCategoryRepository,
    ]),
  ],
  providers: [DealService],
  controllers: [DealController],
})
export class DealModule {}
