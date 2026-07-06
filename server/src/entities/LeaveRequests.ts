import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Check,
} from "typeorm";
import { Employee } from "./Employee.js";
import { LeaveStatus, LeaveType } from '@hr-app/shared'
import { Companies } from "./Companies.js";

@Entity({ name: "leave_requests" })
@Check(`"leave_type" IN ('paid', 'sick', 'casual')`)
@Check(`"status" IN ('pending', 'approved', 'rejected')`)
export class LeaveRequests {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "emp_id",foreignKeyConstraintName:'fk_emp_leave' })
  emp!: Employee;

  @Column({ type: "text" })
  leave_type!: LeaveType;

  @Column({ type: "date" })
  start_date!: Date;

  @Column({ type: "date" })
  end_date!: Date;
  @Column({ type: "varchar", length: 255, nullable: true })
  reason!: string;

  @Column({ type: "text", default: LeaveStatus.PENDING })
  status!: LeaveStatus;

  @ManyToOne(() => Employee, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "approved_by",foreignKeyConstraintName:'fk_leave_approved_by' })
  manager!: Employee | null;

  @ManyToOne(()=> Companies,{ onDelete:'CASCADE'})
  @JoinColumn({name:'company_id',foreignKeyConstraintName:'fk_leave_company'})
  company!:Companies
}
