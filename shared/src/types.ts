export enum EmpRole {
  MANAGER = 'manager',
  HR = 'hr',
  EMPLOYEE = 'employee'
  
}

export enum EmpStatus {
  ACTIVE = 'active',
  PROBATION = 'probation',
  INACTIVE = 'inactive'
}

export enum LogStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  ON_LEAVE = 'on_leave',
  LATE = 'late',
  HALF_DAY ='half_day'
}

export enum LeaveStatus {
  PENDING ='pending',
  APPROVED ='approved',
  REJECTED = 'rejected'
}
export enum LeaveType {
  PAID = "paid",
  SICK = 'sick',
  CASUAL = 'casual'
}

declare global {
  namespace Express {
    interface Request {
      emp_id?: string,
      emp_role?: EmpRole
    }
  }
}
export {}