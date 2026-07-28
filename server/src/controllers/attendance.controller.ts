import {
  LogStatus,
  type ClockInArgs,
  type ClockInResponse,
  type AttendanceFilter
} from "@hr-app/shared";
import { AppDataSource } from "@/config/db.js";
import { Companies, Employee, Attendance } from "@/entities/index.js";
async function webCheckIn({
  company_id,
  emp_id,
  timestamp,
}: ClockInArgs): Promise<ClockInResponse> {
 const morning = new Date(timestamp);
morning.setHours(10, 0, 0, 0);

const noon = new Date(timestamp);
noon.setHours(13, 0, 0, 0);

const evening = new Date(timestamp);
evening.setHours(17, 0, 0, 0);
  const checkIn = new Date(timestamp).getTime();
  const companyRepo = AppDataSource.getRepository(Companies);
  const empRepo = AppDataSource.getRepository(Employee);
  const attendanceRepo = AppDataSource.getRepository(Attendance);

  const company = await companyRepo.findOneBy({ company_id: company_id });
  if (!company) throw new Error(`Company with id: ${company_id} not found`);
  const employee = await empRepo.findOneBy({ emp_id: emp_id });
  if (!employee) throw new Error(`Employee with id: ${emp_id} not found`);

  const attendanceDate =
    timestamp?.split("T")[0] ||
    (new Date().toISOString().split("T")[0] as string);
  const todayLog = await attendanceRepo.findOneBy({
    emp:{
      emp_id:employee.emp_id
    } ,
    attendance_date: attendanceDate,
  });
  if (!todayLog) {
    let status;

if (checkIn > noon.getTime()) {
  status = LogStatus.HALF_DAY;
} else if (checkIn > morning.getTime()) {
  status = LogStatus.LATE;
} else {
  status = LogStatus.PRESENT;
}
    const newLog = attendanceRepo.create({
      emp: employee,
      company: company,
      attendance_date: attendanceDate,
      check_in: new Date(timestamp),
      status: status,
      total_hours:0
    });
    await attendanceRepo.save(newLog);
    return {
      isLoggedIn: true,
      loggedTimestamp: attendanceDate,
      checkIn: newLog.check_in,
      checkOut: null,
      status: status,
      totalHours: 0,
    };
  } else {
   const checkOut = new Date(timestamp);

const status =
  checkOut < evening
    ? LogStatus.HALF_DAY
    : todayLog.status;
    todayLog.check_out = new Date(timestamp);
    todayLog.status = status;
     const totalHours =
      (new Date(timestamp).getTime() - todayLog.check_in!.getTime()) /
      (1000 * 60 * 60);
    todayLog.total_hours = totalHours;
    await attendanceRepo.save(todayLog);
    return {
      isLoggedIn: false,
      loggedTimestamp: attendanceDate,
      checkIn: todayLog.check_in,
      checkOut: todayLog.check_out,
      totalHours: Number(totalHours.toFixed(2)),
      status: status,
    };
  }
}

async function fetchAttendanceLog(company_id:string,{filter}:AttendanceFilter){
  const attendanceRepo = AppDataSource.getRepository(Attendance)
  const qb = attendanceRepo.createQueryBuilder("attendance").leftJoinAndSelect("attendance.emp","employee").where("attendance.company_id = :companyId",{companyId:company_id});

  if(filter?.emp_id){
    qb.andWhere("attendance.emp_id =:emp_id",{emp_id:filter.emp_id})
  }
  if(filter?.emp_dept){
    qb.andWhere("employee.emp_dept =:emp_dept",{emp_dept:filter.emp_dept})
  }
  qb.orderBy("attendance.attendance_date","DESC")
  qb.skip(filter?.offset ?? 0)
  qb.take(filter?.limit ?? 50)

  // console.log(await qb.getMany())
  // // return await qb.getMany()
  // const {attendance_id,check_in,check_out,attendance_date,status} =await qb.getMany()
  // console.log(attendance_id,check_in)
  return await qb.getMany()
}

export {webCheckIn,fetchAttendanceLog}