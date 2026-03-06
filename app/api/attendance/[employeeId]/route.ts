import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteContext = {
  params: {
    employeeId: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();

    const records = await Attendance.find({ employeeId: params.employeeId }).sort({ date: -1 });
    return NextResponse.json(records, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
