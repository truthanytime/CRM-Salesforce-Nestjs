import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryService } from './industry.service';
import { IndustryController } from './industry.controller';
import { IndustryRepository } from './industry.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IndustryRepository])],
  providers: [IndustryService],
  controllers: [IndustryController],
})
export class IndustryModule {}
