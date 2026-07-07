import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783409686078 implements MigrationInterface {
    name = 'InitialSchema1783409686078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a894a560d274a270f087c72ba0d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_users_to_emp"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_96aac72f1574b88752e9fb0008"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_users_to_emp" FOREIGN KEY ("user_id") REFERENCES "employee_details"("emp_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_users_to_emp"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_96aac72f1574b88752e9fb0008" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_users_to_emp" FOREIGN KEY ("user_id") REFERENCES "employee_details"("emp_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a894a560d274a270f087c72ba0d" PRIMARY KEY ("user")`);
    }

}
