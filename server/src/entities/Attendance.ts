import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { LogStatus } from '@hr-app/shared'
import { Employee } from "./Employee.js";
import { Companies } from "./Companies.js";

@Unique(["emp", "attendance_date"])
@Check(`"status" IN ('present', 'absent', 'late','on_leave','half_day')`)
@Entity({ name: "daily_attendance" })
export class Attendance {
  @PrimaryGeneratedColumn()
  attendance_id!: number;

  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "emp_id",foreignKeyConstraintName:'fk_emp_attendance' })
  emp!: Employee;

  @ManyToOne(()=>Companies, {onDelete:'CASCADE'})
  @JoinColumn({name:'company_id',foreignKeyConstraintName:'fk_emp_company'})
  company!:Companies
  
  @Column({ type: "date" })
  attendance_date!: Date;

  @Column({ type: "timestamptz", nullable: true })
  check_in!: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  check_out!: Date | null;

  @Column({ type: "text", default: LogStatus.ABSENT })
  status!: LogStatus;
}
