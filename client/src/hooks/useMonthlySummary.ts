import type { AttendanceLog } from "@hr-app/shared";

type MonthlySummary = {
  month: string;
  present: number;
  absent: number;
  late: number;
  half_day: number;
  totalHours: number;
  workingDays: number;
};

export default function useMonthlySummary(logs: AttendanceLog[] | undefined) {
  if(!logs) return
  const summary: Record<string, MonthlySummary> = {};

  logs.forEach((item) => {
    const month = item.attendance_date.slice(0, 7);

    if (!summary[month]) {
      summary[month] = {
        month,
        present: 0,
        absent: 0,
        late: 0,
        half_day: 0,
        totalHours: 0,
        workingDays: 0,
      };
    }
    summary[month].workingDays++;
    summary[month].totalHours += item.total_hours;
    switch (item.status) {
      case "present":
        summary[month].present++;
        break;

      case "late":
        summary[month].late++;
        break;

      case "absent":
        summary[month].absent++;
        break;

      case "half_day":
        summary[month].half_day++;
        break;
    }
  });

  return Object.values(summary).map((month) => ({
    ...month,
    attendancePercentage: Number(
      (
        ((month.present + month.late + month.half_day * 0.5) /
          month.workingDays) *
        100
      ).toFixed(2),
    ),
  }));
}
