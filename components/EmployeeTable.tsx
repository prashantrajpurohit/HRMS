"use client";

import { Button } from "@/ui/button";
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

type EmployeeTableProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => Promise<void>;
  deletingEmployeeId?: string | null;
};

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  deletingEmployeeId = null,
}: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        No employees found.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.employeeId}</TableCell>
              <TableCell>{employee.fullName}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(employee)}
                    disabled={Boolean(deletingEmployeeId)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(employee._id)}
                    disabled={Boolean(deletingEmployeeId)}
                  >
                    {deletingEmployeeId === employee._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
