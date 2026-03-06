import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();

    const records = await Attendance.find({}).sort({ date: -1, createdAt: -1 });
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

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const employeeId = body?.employeeId?.toString().trim();
    const date = body?.date;
    const status = body?.status?.toString().trim();

    if (!employeeId || !date || !status) {
      return NextResponse.json(
        { error: "All fields are required: employeeId, date, status." },
        { status: 400 }
      );
    }

    if (!["Present", "Absent"].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be either "Present" or "Absent".' },
        { status: 400 }
      );
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date value." }, { status: 400 });
    }

    const attendance = await Attendance.create({
      employeeId,
      date: parsedDate,
      status,
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
