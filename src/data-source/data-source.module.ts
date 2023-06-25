import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceController } from './data-source.controller';
import { DataSourceRepository } from './dataSource.repository';
import { DataSourceService } from './data-source.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataSourceRepository])],
  controllers: [DataSourceController],
  providers: [DataSourceService],
  exports: [DataSourceService],
})
export class DataSourceModule {}
