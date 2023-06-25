import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PipelineStageOwnerTenantUser1660789496518
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pipeline_stage_owner_tenant_user',
        columns: [
          {
            name: 'pipeline_stage_owner_tenant_user_id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'pipeline_stage_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['pipeline_stage_id'],
            referencedColumnNames: ['pipeline_stage_id'],
            referencedTableName: 'pipeline_stage',
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
    await queryRunner.dropTable('pipeline_stage_owner_tenant_user');
  }
}
