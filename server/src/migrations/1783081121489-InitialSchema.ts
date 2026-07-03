import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1783081121489 implements MigrationInterface {
    name = 'InitialSchema1783081121489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_details" ("emp_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "emp_name" text NOT NULL, "emp_email" character varying(255) NOT NULL, "emp_phone" character varying(15) NOT NULL, "emp_dept" text NOT NULL, "emp_role" text NOT NULL, "emp_joining_date" date NOT NULL, "emp_status" text NOT NULL DEFAULT 'active', "emp_address" text, "profile_image_path" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "emp_manager" uuid, CONSTRAINT "UQ_a6d694cd5879a3ff148da4e144c" UNIQUE ("emp_email"), CONSTRAINT "UQ_8e1ba8a9daf3ff29ce7c87f9b1d" UNIQUE ("emp_phone"), CONSTRAINT "CHK_e3287325fabf3199cc0277e1c8" CHECK ("emp_status" IN ('active','probation', 'inactive')), CONSTRAINT "CHK_78a9abe66519cd2c2806ebd74b" CHECK ("emp_role" IN ('manager', 'hr', 'employee')), CONSTRAINT "PK_064311908542686c6269a450332" PRIMARY KEY ("emp_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user" uuid NOT NULL, "email" text NOT NULL, "password_hash" character varying(255) NOT NULL, "refresh_token" character varying(255), "user_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_96aac72f1574b88752e9fb0008" UNIQUE ("user_id"), CONSTRAINT "PK_a894a560d274a270f087c72ba0d" PRIMARY KEY ("user"))`);
        await queryRunner.query(`CREATE TABLE "daily_attendance" ("attendance_id" SERIAL NOT NULL, "attendance_date" date NOT NULL, "check_in" TIMESTAMP WITH TIME ZONE, "check_out" TIMESTAMP WITH TIME ZONE, "status" text NOT NULL DEFAULT 'absent', "emp_id" uuid, CONSTRAINT "UQ_584170100199e25b2c7c7818bee" UNIQUE ("emp_id", "attendance_date"), CONSTRAINT "CHK_e8270c9a91530c77a4d17c233a" CHECK ("status" IN ('present', 'absent', 'late','on_leave','half_day')), CONSTRAINT "PK_370be08c242ae496c4d92e00968" PRIMARY KEY ("attendance_id"))`);
        await queryRunner.query(`CREATE TABLE "leave_requests" ("id" SERIAL NOT NULL, "leave_type" text NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "reason" character varying(255), "status" text NOT NULL DEFAULT 'pending', "emp_id" uuid, "approved_by" uuid, CONSTRAINT "CHK_560de19df7ddabcd09e5e494f2" CHECK ("status" IN ('pending', 'approved', 'rejected')), CONSTRAINT "CHK_c47d92cdb9a9ff7dbca3579f26" CHECK ("leave_type" IN ('paid', 'sick', 'casual')), CONSTRAINT "PK_d3abcf9a16cef1450129e06fa9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_details" ADD CONSTRAINT "fk_manager" FOREIGN KEY ("emp_manager") REFERENCES "employee_details"("emp_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_users_to_emp" FOREIGN KEY ("user_id") REFERENCES "employee_details"("emp_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" ADD CONSTRAINT "fk_emp_attendance" FOREIGN KEY ("emp_id") REFERENCES "employee_details"("emp_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_requests" ADD CONSTRAINT "fk_emp_leave" FOREIGN KEY ("emp_id") REFERENCES "employee_details"("emp_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_requests" ADD CONSTRAINT "fk_leave_approved_by" FOREIGN KEY ("approved_by") REFERENCES "employee_details"("emp_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_requests" DROP CONSTRAINT "fk_leave_approved_by"`);
        await queryRunner.query(`ALTER TABLE "leave_requests" DROP CONSTRAINT "fk_emp_leave"`);
        await queryRunner.query(`ALTER TABLE "daily_attendance" DROP CONSTRAINT "fk_emp_attendance"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_users_to_emp"`);
        await queryRunner.query(`ALTER TABLE "employee_details" DROP CONSTRAINT "fk_manager"`);
        await queryRunner.query(`DROP TABLE "leave_requests"`);
        await queryRunner.query(`DROP TABLE "daily_attendance"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "employee_details"`);
    }

}
