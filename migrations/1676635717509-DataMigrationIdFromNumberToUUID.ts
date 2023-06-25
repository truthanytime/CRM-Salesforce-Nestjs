import {MigrationInterface, QueryRunner} from "typeorm";

export class DataMigrationIdFromNumberToUUID1676635717509 implements MigrationInterface {
    name = 'DataMigrationIdFromNumberToUUID1676635717509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "FK_3b7e48e96943279238b21db9534"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP CONSTRAINT "PK_e39372ed4e540284f0dfb60604f"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP COLUMN "data_source_id"`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD "data_source_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD CONSTRAINT "PK_e39372ed4e540284f0dfb60604f" PRIMARY KEY ("data_source_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24d2e494e25b8ee24c01bc7ef3"`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "PK_3c60f3cea1a2ed70a1f68079e19"`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP COLUMN "data_migration_id"`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD "data_migration_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "PK_3c60f3cea1a2ed70a1f68079e19" PRIMARY KEY ("data_migration_id")`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP COLUMN "data_source_id"`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD "data_source_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_24d2e494e25b8ee24c01bc7ef3" ON "data_migration" ("user_id", "data_source_id") `);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "FK_3b7e48e96943279238b21db9534" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("data_source_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "FK_3b7e48e96943279238b21db9534"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24d2e494e25b8ee24c01bc7ef3"`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP COLUMN "data_source_id"`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD "data_source_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP CONSTRAINT "PK_3c60f3cea1a2ed70a1f68079e19"`);
        await queryRunner.query(`ALTER TABLE "data_migration" DROP COLUMN "data_migration_id"`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD "data_migration_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "PK_3c60f3cea1a2ed70a1f68079e19" PRIMARY KEY ("data_migration_id")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_24d2e494e25b8ee24c01bc7ef3" ON "data_migration" ("user_id", "data_source_id") `);
        await queryRunner.query(`ALTER TABLE "data_source" DROP CONSTRAINT "PK_e39372ed4e540284f0dfb60604f"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP COLUMN "data_source_id"`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD "data_source_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD CONSTRAINT "PK_e39372ed4e540284f0dfb60604f" PRIMARY KEY ("data_source_id")`);
        await queryRunner.query(`ALTER TABLE "data_migration" ADD CONSTRAINT "FK_3b7e48e96943279238b21db9534" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("data_source_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
