import {MigrationInterface, QueryRunner} from "typeorm";

export class DataSourceAndDataMigration1676379577124 implements MigrationInterface {
    name = 'DataSourceAndDataMigration1676379577124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_source" ("data_source_id" SERIAL NOT NULL, "name" character varying NOT NULL, "integration_id" character varying NOT NULL, CONSTRAINT "UQ_4dad0bcd9e3ae282a371615d78a" UNIQUE ("name"), CONSTRAINT "REL_f0abbf88884da4a682b9b8d5fd" UNIQUE ("integration_id"), CONSTRAINT "PK_e39372ed4e540284f0dfb60604f" PRIMARY KEY ("data_source_id"))`);
        await queryRunner.query(`CREATE TABLE "data_migration" ("data_migration_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "data_source_id" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'requested', "status_date" TIMESTAMP NOT NULL DEFAULT now(), "synced_at" TIMESTAMP, CONSTRAINT "PK_3c60f3cea1a2ed70a1f68079e19" PRIMARY KEY ("data_migration_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_24d2e494e25b8ee24c01bc7ef3" ON "data_migration" ("user_id", "data_source_id") `);
        await queryRunner.query(`ALTER TABLE "data_source" ADD CONSTRAINT "FK_f0abbf88884da4a682b9b8d5fd4" FOREIGN KEY ("integration_id") REFERENCES "integration"("application_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "FK_44e3f7241d3194598b35b13fa50" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "FK_3b7e48e96943279238b21db9534" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("data_source_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "FK_3b7e48e96943279238b21db9534"`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "FK_44e3f7241d3194598b35b13fa50"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP CONSTRAINT "FK_f0abbf88884da4a682b9b8d5fd4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24d2e494e25b8ee24c01bc7ef3"`);
        await queryRunner.query(`DROP TABLE "data_migration"`);
        await queryRunner.query(`DROP TABLE "data_source"`);
    }

}
