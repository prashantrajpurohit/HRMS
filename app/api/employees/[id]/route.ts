import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Attendance from "@/models/Attendance";

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
