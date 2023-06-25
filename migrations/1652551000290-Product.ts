import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1652551000290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'product_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'product_name',
            type: 'varchar',
          },
          {
            name: 'product_description',
            type: 'varchar',
          },
          {
            name: 'product_category',
            type: 'varchar',
          },
          {
            name: 'product_rate_charge_type',
            type: 'varchar',
          },
          {
            name: 'product_currency',
            type: 'varchar',
          },
          {
            name: 'product_price',
            type: 'float4',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
