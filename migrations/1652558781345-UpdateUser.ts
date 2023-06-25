import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class UpdateUser1652558781345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'user',
      'user_created_on',
      'user_created_at',
    );

    await queryRunner.renameColumn(
      'user',
      'user_modified_on',
      'user_updated_at',
    );

    await queryRunner.changeColumn(
      'user',
      'user_created_by',
      new TableColumn({
        name: 'user_created_by',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'user',
      'user_modified_by',
      new TableColumn({
        name: 'user_modified_by',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'user_role',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'company_id',
        type: 'int',
        isNullable: true,
      }),
    );

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

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'user_cognito_id',
        type: 'varchar',
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'user_cognito_id_key',
        isUnique: true,
        columnNames: ['user_cognito_id'],
      }),
    );

    await queryRunner.dropColumns('user', [
      'contact_id',
      'contact_first_name',
      'contact_last_name',
      'contact_middle_name',
      'contact_email_id',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'user',
      'user_created_at',
      'user_created_on',
    );

    await queryRunner.renameColumn(
      'user',
      'user_updated_at',
      'user_modified_on',
    );

    const table = await queryRunner.getTable('user');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );
    await queryRunner.dropForeignKey('user', foreignKey);

    await queryRunner.dropIndex('user', 'user_cognito_id_key');

    await queryRunner.dropColumns('user', [
      'user_role',
      'company_id',
      'user_cognito_id',
    ]);

    await queryRunner.changeColumn(
      'user',
      'user_created_by',
      new TableColumn({
        name: 'user_created_by',
        type: 'varchar',
      }),
    );

    await queryRunner.changeColumn(
      'user',
      'user_modified_by',
      new TableColumn({
        name: 'user_modified_by',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'contact_id',
        type: 'int',
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'contact_first_name',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'contact_last_name',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'contact_middle_name',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'contact_email_id',
        type: 'varchar',
      }),
    );
  }
}
