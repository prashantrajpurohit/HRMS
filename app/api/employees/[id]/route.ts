import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Attendance from "@/models/Attendance";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ error: "Employee not found." }, { status: 404 });
    }

    const body = await request.json();
    const employeeId = body?.employeeId?.toString().trim();
    const fullName = body?.fullName?.toString().trim();
    const incomingEmail = body?.email?.toString().trim().toLowerCase();
    const department = body?.department?.toString().trim();

    if (!employeeId || !fullName || !department) {
      return NextResponse.json(
        { error: "All fields are required: employeeId, fullName, department." },
        { status: 400 }
      );
    }

    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return NextResponse.json({ error: "Employee not found." }, { status: 404 });
    }

    if (incomingEmail && incomingEmail !== existingEmployee.email) {
      return NextResponse.json({ error: "Email cannot be edited." }, { status: 400 });
    }

    const duplicateEmployeeId = await Employee.findOne({ employeeId, _id: { $ne: id } });

    if (duplicateEmployeeId) {
      return NextResponse.json({ error: "Employee ID already exists." }, { status: 400 });
    }

    const oldEmployeeId = existingEmployee.employeeId;

    existingEmployee.employeeId = employeeId;
    existingEmployee.fullName = fullName;
    existingEmployee.department = department;

    await existingEmployee.save();

    if (oldEmployeeId !== employeeId) {
      await Attendance.updateMany(
        { employeeId: oldEmployeeId },
        { $set: { employeeId } }
      );
    }

    return NextResponse.json(existingEmployee, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ error: "Employee not found." }, { status: 404 });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return NextResponse.json({ error: "Employee not found." }, { status: 404 });
    }

    await Attendance.deleteMany({ employeeId: deletedEmployee.employeeId });

    return NextResponse.json({ message: "Employee deleted successfully." }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
