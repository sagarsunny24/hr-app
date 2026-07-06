import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783343140967 implements MigrationInterface {
    name = 'InitialSchema1783343140967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" RENAME COLUMN "emp_manager" TO "emp_manager_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_details" RENAME COLUMN "emp_manager_id" TO "emp_manager"`);
    }

}
