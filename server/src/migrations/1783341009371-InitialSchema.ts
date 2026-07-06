import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783341009371 implements MigrationInterface {
    name = 'InitialSchema1783341009371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_details" ("company_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "company_name" text NOT NULL, "registration_no" character varying(255) NOT NULL, "ceo_name" text NOT NULL, "company_loc" text NOT NULL, "created_date" date NOT NULL DEFAULT now(), "company_address" text NOT NULL, CONSTRAINT "UQ_a4767dff458dad358c6ec523055" UNIQUE ("registration_no"), CONSTRAINT "PK_3f6badddc892f80a7dccac80f52" PRIMARY KEY ("company_id"))`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "leave_requests" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "company_details"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" ADD CONSTRAINT "fk_emp_company" FOREIGN KEY ("company_id") REFERENCES "company_details"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_requests" ADD CONSTRAINT "fk_leave_company" FOREIGN KEY ("company_id") REFERENCES "company_details"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_requests" DROP CONSTRAINT "fk_leave_company"`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" DROP CONSTRAINT "fk_emp_company"`);
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "fk_company"`);
        await queryRunner.query(`ALTER TABLE "leave_requests" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "employee_details" DROP COLUMN "company_id"`);
        await queryRunner.query(`DROP TABLE "company_details"`);
    }

}
