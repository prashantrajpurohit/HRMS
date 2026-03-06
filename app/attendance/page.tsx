"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AttendanceTable from "@/components/AttendanceTable";
import MarkAttendanceForm from "@/components/MarkAttendanceForm";
import TableFilterBar from "@/components/table-filter-bar";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

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

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<Attendance[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setEmployeesLoading(true);
    setError("");
    try {
      const response = await fetch("/api/employees", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to fetch employees.");
      }
      setEmployees(payload);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
    } finally {
      setEmployeesLoading(false);
    }
  }, []);

  const fetchAttendance = useCallback(async () => {
    setRecordsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/attendance", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to fetch attendance records.");
      }
      setRecords(payload);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
      setRecords([]);
    } finally {
      setRecordsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (employeeFilter !== "all" && record.employeeId !== employeeFilter) {
        return false;
      }

      if (statusFilter !== "all" && record.status !== statusFilter) {
        return false;
      }

      const recordDate = new Date(record.date);

      if (fromDate) {
        const start = new Date(fromDate);
        start.setHours(0, 0, 0, 0);
        if (recordDate < start) {
          return false;
        }
      }

      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        if (recordDate > end) {
          return false;
        }
      }

      return true;
    });
  }, [records, employeeFilter, statusFilter, fromDate, toDate]);

  const resetFilters = () => {
    setEmployeeFilter("all");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Mark Attendance</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
              <DialogDescription>Record attendance for an employee.</DialogDescription>
            </DialogHeader>
            <MarkAttendanceForm
              employees={employees}
              onSuccess={async () => {
                setOpen(false);
                await fetchAttendance();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <TableFilterBar onReset={resetFilters}>
        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {employees.map((employee) => (
              <SelectItem key={employee._id} value={employee.employeeId}>
                {employee.fullName} ({employee.employeeId})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
          </SelectContent>
        </Select>

        <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
        <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
      </TableFilterBar>

      {employeesLoading ? <p className="text-sm text-muted-foreground">Loading employees...</p> : null}
      {recordsLoading ? <p className="text-sm text-muted-foreground">Loading attendance...</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {!employeesLoading && !recordsLoading && !error ? (
        <AttendanceTable records={filteredRecords} employees={employees} />
      ) : null}
    </div>
  );
}
