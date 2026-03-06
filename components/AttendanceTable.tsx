import { Badge } from "@/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

type Employee = {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: string;
};

type Attendance = {
  _id: string;
  employeeId: string;
  date: string;
  status: "Present" | "Absent";
  createdAt: string;
};

type AttendanceTableProps = {
  records: Attendance[];
  employees: Employee[];
};

export default function AttendanceTable({ records, employees }: AttendanceTableProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        No attendance records found.
      </div>
    );
  }

  const employeeNameMap = new Map(employees.map((employee) => [employee.employeeId, employee.fullName]));
  const employeeDepartmentMap = new Map(employees.map((employee) => [employee.employeeId, employee.department]));
  const totalPresentDays = records.filter((record) => record.status === "Present").length;

  return (
    <div className="space-y-3">
      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        <span className="font-medium">All Employees</span>
        <span className="mx-2 text-muted-foreground">-</span>
        <span className="text-muted-foreground">Total Present Days:</span>{" "}
        <span className="font-semibold">{totalPresentDays}</span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{employeeNameMap.get(record.employeeId) ?? "Unknown Employee"}</TableCell>
                <TableCell>{record.employeeId}</TableCell>
                <TableCell>{employeeDepartmentMap.get(record.employeeId) ?? "N/A"}</TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      record.status === "Present"
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-red-600 text-white"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
