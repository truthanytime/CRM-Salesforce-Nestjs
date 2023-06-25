import { Injectable } from '@nestjs/common';
import { DataSourceRepository } from './dataSource.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DataSource } from './dataSource.entity';
import { GetIntegratedDataSourcesDto } from './dto/get-integrated-data-sources';

@Injectable()
export class DataSourceService {
  constructor(private readonly dataSourceRepository: DataSourceRepository) {}

  findAll(findManyOptions: FindManyOptions<DataSource> = {}) {
    return this.dataSourceRepository.find(findManyOptions);
  }

  findOne(findConditions: FindOneOptions<DataSource>) {
    return this.dataSourceRepository.findOne(findConditions);
  }

  async getAvailableDataSources(
    userId: number,
    tenantId: number,
  ): Promise<GetIntegratedDataSourcesDto[]> {
    const records = await this.dataSourceRepository.getAvailableDataSources(
      userId,
      tenantId,
    );
    const recordProcessed = records.map((record) => {
      let dataSourceIntegrated = false;
      if (record.integration_state_id) {
        dataSourceIntegrated = true;
      }
      return { ...record, is_integrated: dataSourceIntegrated };
    });
    return recordProcessed;
  }
}
