import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCompanyEmail1652716594662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'company',
      new TableColumn({
        name: 'company_email',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('company', 'company_email');
  }
}
