import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1652382078896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_name',
            type: 'varchar',
          },
          {
            name: 'user_email',
            type: 'varchar',
          },
          {
            name: 'contact_id',
            type: 'int',
          },
          {
            name: 'contact_first_name',
            type: 'varchar',
          },
          {
            name: 'contact_last_name',
            type: 'varchar',
          },
          {
            name: 'contact_middle_name',
            type: 'varchar',
          },
          {
            name: 'contact_email_id',
            type: 'varchar',
          },
          {
            name: 'user_created_on',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_modified_on',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_created_by',
            type: 'varchar',
          },
          {
            name: 'user_modified_by',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
