import type { Request, Response } from "express";

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

export type LoginUserBody = {
  email:string,
  password:string
}

declare global {
  namespace Express {
    interface Request {
      user: {
         emp_id?: string | null,
      emp_role?: EmpRole | null,
      company_id?: string | null

      } | null,
     
    }
  }
}

export interface LoginArgs {
  input:LoginUserBody,
}

interface RegisterCredentials {
  // Employee
  emp_name: string;
  emp_email: string;
  emp_phone: string;
  emp_dept: string;
  emp_role: EmpRole;
  emp_designation:string;
  emp_joining_date: Date;
  emp_status: EmpStatus;

  // Company
  company_name: string;
  registration_no: string;
  ceo_name: string;
  company_loc: string;
  created_date: Date;
  company_address: string;

  // User
  password: string;
}
export interface RegisterArgs {
  input:RegisterCredentials
}

export interface AuthPayload {
  emp_id: string;
  emp_role: EmpRole;
  company_id: string;
}
export interface Context {
  req: Request;
  res: Response;
  user: AuthPayload | null
}
export interface LoginResponse {
  accessToken:string,
  role:EmpRole
  profile_image_path: string | null,
}
export interface ErrorResponse {
  message:string
}

export interface AuthInitialState {
   status:'idle' | 'loading' | 'succeeded' |'failed',
  user:{
accessToken:string | null,
  role:EmpRole,
  isAuthenticated:boolean,
  profile_image_path:string | null
  },
  error:{message:string} | null
}
export type LoginMutationResponse = {
  login: LoginResponse
};

export type EmployeeDetails = {
  emp_name: string;
  emp_email: string;
  emp_phone: string;
  emp_dept: string;
  emp_role: EmpRole;
  emp_designation: string;
  emp_joining_date: string;
  emp_status: EmpStatus;
  emp_address: string;
profile_image_path: string | null;
emp_manager_id:string | null;

}
export type CompanyID =string;


export type ViewAllFilter = {
 filter:{
   limit?:number;
  offset?: number;
  emp_name?:string;
  emp_dept?:string
  emp_role?:string;
  emp_designation?:string;
  emp_joining_date?:string;
  emp_status?:String
 }
}
export interface Employee {
  emp_name: string;
  emp_email: string;
  emp_phone: string;
  emp_dept: string;
  emp_role: EmpRole;
  emp_designation: string;
  emp_joining_date: string;
  emp_status: EmpStatus;
  profile_image_path: string;
}

export interface ViewAllResponse {
  viewAll: {
    data: Employee[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export interface MngrDetailsRes {
  viewAll:{
    data: MngrDetails[]
  }
  
}
export interface MngrDetails {
  
emp_id:string,
  emp_name:string,
  profile_image_path: string | null
}


export interface AddEmpRes {
  addEmployee?:{
    email:string;
    temp_pswrd:string;
    message:string;
  }
}

export interface ClockInArgs {
  company_id:string;
  emp_id:string;
  timestamp:string;
}
export interface ClockInResponse {
  isLoggedIn:boolean;
  loggedTimestamp:string;
  checkIn:Date | null;
  checkOut:Date| null;
  totalHours:number;
  status:LogStatus;
}

export interface AttendanceFilter {
  filter:{
    limit?:number,
     offset?: number;
     emp_dept?:string,
     emp_id?:string
  }
}
export interface AttendanceLog {
attendance_id: number,
        check_in: string | null,
        check_out: string | null,
        attendance_date: String,
        status: LogStatus,
        total_hours: number
}
export interface AttendanceResponse {

  attendanceLog:AttendanceLog[]
    
      
}
export {}