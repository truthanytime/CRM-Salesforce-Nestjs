import { Injectable } from '@nestjs/common';
import { DataMigrationSchemaRepository } from '../repositories/dataMigrationSchema.repository';
import { paginationOptions } from './../types';

@Injectable()
export class DataMigrationSchemaService {
  constructor(
    private dataMigrationSchemaRepository: DataMigrationSchemaRepository,
  ) {}

  getSchemaTables(userId: number, dataSourceId: string) {
    return this.dataMigrationSchemaRepository.getSchemaTables(
      userId,
      dataSourceId,
    );
  }

  getSchemaDataTotalCount(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaDataTotalCount(
      userId,
      dataSourceId,
      tableId,
    );
  }

  getSchemaTableField(userId: number, dataSourceId: string, tableId: string) {
    return this.dataMigrationSchemaRepository.getSchemaTableFields(
      userId,
      dataSourceId,
      tableId,
    );
  }

  getSchemaTableLookups(userId: number, dataSourceId: string, tableId: string) {
    return this.dataMigrationSchemaRepository.getSchemaTableLookups(
      userId,
      dataSourceId,
      tableId,
    );
  }

  getTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions?: paginationOptions,
  ) {
    const options = {
      skip: (paginationOptions && paginationOptions.skip) || 0,
      take: (paginationOptions && paginationOptions.take) || 20,
    };
    return this.dataMigrationSchemaRepository.getTableData(
      userId,
      dataSourceId,
      tableId,
      options,
    );
  }

  getDataValidationTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions?: paginationOptions,
    ruleIds?: string[],
  ) {
    const options = {
      skip: (paginationOptions && paginationOptions.skip) || 0,
      take: (paginationOptions && paginationOptions.take) || 25,
    };
    return this.dataMigrationSchemaRepository.getDataValidationTableData(
      userId,
      dataSourceId,
      tableId,
      options,
      ruleIds,
    );
  }

  getDataValidationTableTotalData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    ruleIds?: string[],
  ) {
    return this.dataMigrationSchemaRepository.getDataValidationTableTotalData(
      userId,
      dataSourceId,
      tableId,
      ruleIds,
    );
  }

  updateTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    updates: any[],
  ) {
    return this.dataMigrationSchemaRepository.updateTableData(
      userId,
      dataSourceId,
      tableId,
      updates,
    );
  }

  getBookmarkedTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getBookmarkedTableDataTotal(
      userId,
      dataSourceId,
      tableId,
    );
  }
}
