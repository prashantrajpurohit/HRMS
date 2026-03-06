import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    await connectToDatabase();

    const employees = await Employee.find({}).sort({ createdAt: -1 });
    return NextResponse.json(employees, {
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
    const fullName = body?.fullName?.toString().trim();
    const email = body?.email?.toString().trim().toLowerCase();
    const department = body?.department?.toString().trim();

    if (!employeeId || !fullName || !email || !department) {
      return NextResponse.json(
        { error: "All fields are required: employeeId, fullName, email, department." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const [existingByEmployeeId, existingByEmail] = await Promise.all([
      Employee.findOne({ employeeId }),
      Employee.findOne({ email }),
    ]);

    if (existingByEmployeeId) {
      return NextResponse.json({ error: "Employee ID already exists." }, { status: 400 });
    }

    if (existingByEmail) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
