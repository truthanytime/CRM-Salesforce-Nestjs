import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesForceDataSourceSeeder1676379645567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO public.data_source( "name", integration_id)
            VALUES('Salesforce', 'salesforce');
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          DELETE FROM public.data_source where "name" = 'Salesforce';
          `,
    );
  }
}
