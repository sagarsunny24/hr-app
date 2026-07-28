import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1785225743918 implements MigrationInterface {
    name = 'InitialSchema1785225743918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_attendance" ADD "total_hours" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_attendance" DROP COLUMN "total_hours"`);
    }

}
