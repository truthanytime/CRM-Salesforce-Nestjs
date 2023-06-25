import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateCompanyUser1652567389720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('company', 'id', 'company_id');
    await queryRunner.renameColumn('company', 'name', 'company_name');
    await queryRunner.renameColumn('company', 'address', 'company_address');
    await queryRunner.renameColumn(
      'company',
      'billing_address',
      'company_billing_address',
    );
    await queryRunner.renameColumn(
      'company',
      'created_at',
      'company_created_at',
    );
    await queryRunner.renameColumn(
      'company',
      'updated_at',
      'company_updated_at',
    );

    await queryRunner.addColumns('company', [
      new TableColumn({
        name: 'company_industry',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'company_employees',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'company_website',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'company_cc_domain',
        type: 'varchar',
        isNullable: true,
      }),
    ]);

    await queryRunner.changeColumn(
      'company',
      'owner_id',
      new TableColumn({
        name: 'owner_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'company',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    const table = await queryRunner.getTable('user');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );
    await queryRunner.dropForeignKey('user', foreignKey);

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['company_id'],
        referencedTableName: 'company',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('company', 'company_id', 'id');
    await queryRunner.renameColumn('company', 'company_name', 'name');
    await queryRunner.renameColumn('company', 'company_address', 'address');
    await queryRunner.renameColumn(
      'company',
      'company_billing_address',
      'billing_address',
    );
    await queryRunner.renameColumn(
      'company',
      'company_created_at',
      'created_at',
    );
    await queryRunner.renameColumn(
      'company',
      'company_updated_at',
      'updated_at',
    );
    await queryRunner.dropColumns('company', [
      'company_industry',
      'company_employees',
      'company_website',
      'company_cc_domain',
    ]);

    const companyTable = await queryRunner.getTable('company');
    const companyForeignKey = companyTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('owner_id') !== -1,
    );
    await queryRunner.dropForeignKey('company', companyForeignKey);

    await queryRunner.changeColumn(
      'company',
      'owner_id',
      new TableColumn({
        name: 'owner_id',
        type: 'varchar',
      }),
    );

    const userTable = await queryRunner.getTable('user');
    const userForeignKey = userTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );
    await queryRunner.dropForeignKey('user', userForeignKey);

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
