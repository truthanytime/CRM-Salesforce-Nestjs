import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddPasswordResetToken1651875556399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'password_reset_token',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'consumed',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'consumed_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
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
    await queryRunner.dropTable('password_reset_token');
  }
}
