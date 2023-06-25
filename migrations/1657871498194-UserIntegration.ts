import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserIntegration16578781498194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_integration',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'integration_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'tokens',
            type: 'json',
          },
          {
            name: 'application_status',
            type: 'enum',
            enum: ['installed', 'uninstalled'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['integration_id'],
            referencedColumnNames: ['integration_id'],
            referencedTableName: 'integration',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_integration');
  }
}
