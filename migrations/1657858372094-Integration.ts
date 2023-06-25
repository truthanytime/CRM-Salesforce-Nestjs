import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Integration1657858372094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'integration',
        columns: [
          {
            name: 'integration_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'application_name',
            type: 'varchar',
          },
          {
            name: 'application_description',
            type: 'varchar',
          },
          {
            name: 'application_icon',
            type: 'varchar',
          },
          {
            name: 'provider_name',
            type: 'varchar',
          },
          {
            name: 'provider_link',
            type: 'varchar',
          },
          {
            name: 'total_installs',
            type: 'varchar',
          },
          {
            name: 'categories',
            type: 'text',
            isArray: true,
          },
          {
            name: 'features',
            type: 'text',
            isArray: true,
          },
          {
            name: 'languages',
            type: 'varchar',
          },
          {
            name: 'requirement_permissions',
            type: 'text',
            isNullable: true,
            isArray: true,
          },
          {
            name: 'subscription_title',
            type: 'varchar',
          },
          {
            name: 'subscriptions',
            type: 'varchar',
          },
          {
            name: 'subscription_link',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('integration');
  }
}
