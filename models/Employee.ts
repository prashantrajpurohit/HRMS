import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const employeeSchema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    department: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export type EmployeeDocument = InferSchemaType<typeof employeeSchema>;

const Employee: Model<EmployeeDocument> =
  (models.Employee as Model<EmployeeDocument>) ||
  model<EmployeeDocument>("Employee", employeeSchema);

export default Employee;
