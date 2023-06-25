import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PipelineStage1660879496518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pipeline_stage',
        columns: [
          {
            name: 'pipeline_stage_id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'pipeline_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'goal',
            type: 'text',
          },
          {
            name: 'base_stage_id',
            type: 'int',
          },
          {
            name: 'order',
            type: 'int',
          },
        ],
        // foreignKeys: [
        //   {
        //     columnNames: ['base_stage_id'],
        //     referencedColumnNames: ['base_stage_id'],
        //     referencedTableName: 'base_stage',
        //     onUpdate: 'CASCADE',
        //     onDelete: 'CASCADE',
        //   },
        //   {
        //     columnNames: ['pipeline_stage_owner_tenant_user_id'],
        //     referencedColumnNames: ['pipeline_owner_tenant_user_id'],
        //     referencedTableName: 'pipeline_stage_owner_tenant_user',
        //     onUpdate: 'CASCADE',
        //     onDelete: 'CASCADE',
        //   },
        // ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pipeline_stage');
  }
}
