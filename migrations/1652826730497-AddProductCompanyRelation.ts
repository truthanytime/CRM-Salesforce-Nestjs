import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProductCompanyRelation1652826730497
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'company_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['company_id'],
        referencedTableName: 'company',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.renameColumn(
      'product',
      'created_at',
      'product_created_at',
    );

    await queryRunner.renameColumn(
      'product',
      'updated_at',
      'product_updated_at',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('company_id') !== -1,
    );
    await queryRunner.dropForeignKey('product', foreignKey);

    await queryRunner.dropColumn('product', 'company_id');

    await queryRunner.renameColumn(
      'product',
      'product_created_at',
      'created_at',
    );

    await queryRunner.renameColumn(
      'product',
      'product_updated_at',
      'updated_at',
    );
  }
}
