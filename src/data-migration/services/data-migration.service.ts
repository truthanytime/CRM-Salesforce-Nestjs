import { DataMigrationRepository } from '../repositories/dataMigration.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataMigration } from '../entities/dataMigration.entity';
import { FindOneOptions, createQueryBuilder } from 'typeorm';
import { DataMigrationStatus } from '@/core/types';
import { DataSource } from '@/data-source/dataSource.entity';

@Injectable()
export class DataMigrationService {
  constructor(
    private readonly dataMigrationRepository: DataMigrationRepository,
  ) {}

  async create(tenantId: number, dataSourceId: string) {
    const dataMigration = this.dataMigrationRepository.create({
      tenantId,
      dataSourceId,
    });
    return this.dataMigrationRepository.save(dataMigration);
  }

  async findOne(findOneOptions: FindOneOptions<DataMigration>) {
    const dataMigration = await this.dataMigrationRepository.findOne(
      findOneOptions,
    );
    return dataMigration;
  }

  findAllByTenant(tenantId: number) {
    return this.dataMigrationRepository.find({
      where: { tenantId },
      relations: ['dataSource'],
    });
  }

  async delete(id: string, tenantId: number) {
    const dataMigration = await this.dataMigrationRepository.findOne({
      where: { dataMigrationId: id, tenantId },
    });

    if (!dataMigration) {
      throw new NotFoundException('User data migration not found!');
    }

    if (
      [
        DataMigrationStatus.DATA_SCHEMA_STARTED,
        DataMigrationStatus.DATA_MIGRATION_STARTED,
      ].includes(dataMigration.status)
    ) {
      throw new NotFoundException(
        'User data migration cannot be eliminated while processing!',
      );
    }

    return await this.dataMigrationRepository.remove([dataMigration]);
  }

  async validateIntegrationExists(
    userId: number,
    dataSourceId: string,
    tenantId = 0,
  ) {
    return await createQueryBuilder(DataSource, 'dataSource')
      .innerJoin(
        'integration',
        'integration',
        'integration.application_id = dataSource.integration_id',
      )
      .innerJoin(
        'integration_state',
        'integrationState',
        'integrationState.integration_id = integration.id',
      )
      .where(
        'integrationState.user_id = :userId or integrationState.tenant_id = :tenantId',
        { userId, tenantId },
      )
      .andWhere('dataSource.data_source_id = :dataSourceId', {
        dataSourceId,
      })
      .getRawOne();
  }

  async getMigrationByDataSourceName(
    userId: number,
    tenantId: number,
    dataSourceName: string,
  ) {
    return await createQueryBuilder(DataMigration, 'mig')
      .innerJoin(
        DataSource,
        'dataSource',
        'mig.data_source_id = dataSource.data_source_id',
      )
      .where('mig.user_id = :userId or mig.tenant_id = :tenantId', {
        userId,
        tenantId,
      })
      .andWhere('dataSource.name = :dataSourceName', {
        dataSourceName,
      })
      .getOne();
  }
}
