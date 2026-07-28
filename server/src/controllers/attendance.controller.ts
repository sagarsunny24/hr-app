import {
  LogStatus,
  type ClockInArgs,
  type ClockInResponse,
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
    await attendanceRepo.save(todayLog);
    const totalHours =
      (new Date(timestamp).getTime() - todayLog.check_in!.getTime()) /
      (1000 * 60 * 60);
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
export {webCheckIn}