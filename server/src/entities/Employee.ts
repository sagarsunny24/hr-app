import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from "typeorm";
import { EmpRole, EmpStatus } from '@hr-app/shared'
import { Companies } from "./Companies.js";

@Entity({ name: "employee_details" })
@Check(`"emp_role" IN ('manager', 'hr', 'employee')`)
@Check(`"emp_status" IN ('active','probation', 'inactive')`)
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  emp_id!: string;

  @Column({ type: "text" })
  emp_name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  emp_email!: string;

  @Column({ type: "varchar", length: 15, unique: true })
  emp_phone!: string;

  @Column({ type: "text" })
  emp_dept!: string;

  @Column({ type: "text" })
  emp_role!: EmpRole;

  @Column({ type: "date" })
  emp_joining_date!: Date;

  @Column({ type: "text", default: EmpStatus.ACTIVE })
  emp_status!: EmpStatus;

  @Column({ type: "text", nullable: true })
  emp_address!: string | null;

  @Column({ type: "text", nullable: true })
  profile_image_path!: string | null;

  @ManyToOne(() => Employee, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "emp_manager_id",foreignKeyConstraintName:'fk_manager' })
  emp_manager!: Employee | null;

  @ManyToOne(()=>Companies)
  @JoinColumn({name:'company_id',foreignKeyConstraintName:'fk_company'})
  company!: Companies

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}

// CREATE TABLE employee_details (
//     emp_id           UUID PRIMARY KEY,
//     emp_name         TEXT NOT NULL,
//     emp_email        VARCHAR(255) UNIQUE NOT NULL,
//     emp_phone        VARCHAR(15) UNIQUE,
//     emp_dept         TEXT NOT NULL,
//     emp_role         TEXT NOT NULL CHECK (emp_role IN ('manager', 'hr', 'employee')),
//     emp_joining_date DATE NOT NULL,
//     emp_status       VARCHAR(20) NOT NULL DEFAULT 'active'
//                      CHECK (emp_status IN ('active', 'probation', 'inactive')),
//     emp_address      TEXT,
//     profile_image_path TEXT,
//     emp_manager      UUID,
//     created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

//     CONSTRAINT fk_employee_manager
//         FOREIGN KEY (emp_manager)
//         REFERENCES employee_details(emp_id)
//         ON DELETE SET NULL
// );
