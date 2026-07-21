import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1784614024626 implements MigrationInterface {
    name = 'InitialSchema1784614024626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" ADD "emp_designation" text DEFAULT 'Staff'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" DROP COLUMN "emp_designation"`);
    }

}
