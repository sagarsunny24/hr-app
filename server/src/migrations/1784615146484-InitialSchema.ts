import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1784615146484 implements MigrationInterface {
    name = 'InitialSchema1784615146484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "CHK_e3287325fabf3199cc0277e1c8"`);
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "CHK_78a9abe66519cd2c2806ebd74b"`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "CHK_EMP_STATUS" CHECK ("emp_status" IN ('active', 'probation', 'inactive'))`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "CHK_EMP_ROLE" CHECK ("emp_role" IN ('manager', 'hr', 'employee'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "CHK_EMP_ROLE"`);
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "CHK_EMP_STATUS"`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "CHK_78a9abe66519cd2c2806ebd74b" CHECK ((emp_role = ANY (ARRAY['manager'::text, 'hr'::text, 'employee'::text])))`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "CHK_e3287325fabf3199cc0277e1c8" CHECK ((emp_status = ANY (ARRAY['active'::text, 'probation'::text, 'inactive'::text])))`);
    }

}
