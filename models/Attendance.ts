import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const attendanceSchema = new Schema(
  {
    employeeId: { type: String, required: true, ref: "Employee", trim: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export type AttendanceDocument = InferSchemaType<typeof attendanceSchema>;

const Attendance: Model<AttendanceDocument> =
  (models.Attendance as Model<AttendanceDocument>) ||
  model<AttendanceDocument>("Attendance", attendanceSchema);

export default Attendance;
