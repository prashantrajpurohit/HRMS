import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Attendance from "@/models/Attendance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [totalEmployees, activeEmployeeIds] = await Promise.all([
      Employee.countDocuments({}),
      Employee.distinct("employeeId"),
    ]);

    const [presentToday, absentToday] = await Promise.all([
      Attendance.countDocuments({
        employeeId: { $in: activeEmployeeIds },
        status: "Present",
        date: { $gte: todayStart, $lte: todayEnd },
      }),
      Attendance.countDocuments({
        employeeId: { $in: activeEmployeeIds },
        status: "Absent",
        date: { $gte: todayStart, $lte: todayEnd },
      }),
    ]);

    return NextResponse.json(
      {
        totalEmployees,
        presentToday,
        absentToday,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
