import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { paginationOptions } from './../types';

@Injectable()
export class DataMigrationSchemaRepository {
  getSchemaTables(userId: number, dataSourceId: string) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_tables`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'schema_tables')
      .getRawMany();
  }

  getSchemaDataTotalCount(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'table')
      .getRawMany();
  }

  getSchemaTableFields(userId: number, dataSourceId: string, tableId: string) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_fields`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'fields')
      .where(`fields.\"tableId\" = :tableId`, { tableId })
      .getRawMany();
  }

  getSchemaTableLookups(userId: number, dataSourceId: string, tableId: string) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_lookups`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'lookup')
      .where(`lookup.\"tableId\" = :tableId`, { tableId })
      .getRawMany();
  }

  getTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions: paginationOptions,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'table')
      .skip(paginationOptions.skip)
      .take(paginationOptions.take)
      .getRawMany();
  }

  getDataValidationTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions: paginationOptions,
    ruleIds: string[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const query = getConnection().createQueryBuilder().from(tableName, 'table');

    ruleIds.forEach((ruleId, index) => {
      query.orWhere(`rules_applied::jsonb ? :ruleId${index}`, {
        [`ruleId${index}`]: ruleId,
      });
    });
    return query
      .skip(paginationOptions.skip)
      .take(paginationOptions.take)
      .getRawMany();
  }

  getDataValidationTableTotalData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    ruleIds: string[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const query = getConnection().createQueryBuilder().from(tableName, 'table');

    ruleIds.forEach((ruleId, index) => {
      query.orWhere(`rules_applied::jsonb ? :ruleId${index}`, {
        [`ruleId${index}`]: ruleId,
      });
    });
    return query.getRawMany();
  }

  updateTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    updates: any[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const proms = updates.map(async (row) => {
      const temp = { ...row };
      delete temp.id;
      delete temp.Id;
      delete temp.edit;
      try {
        await getConnection()
          .createQueryBuilder()
          .update(tableName)
          .set({ ...temp })
          .where('"Id" = :value', { value: row.Id })
          .execute();
        return;
      } catch (e) {
        console.log('Error:', e);
        throw e;
      }
    });

    return Promise.all(proms);
  }

  getBookmarkedTableDataTotal(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 't')
      .where('t.bookmark = :value', { value: true })
      .getRawMany();
  }
}
