import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BaseStage1660779496518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'base_stage',
        columns: [
          {
            name: 'base_stage_id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('base_stage');
  }
}
