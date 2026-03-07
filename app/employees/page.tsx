"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AddEmployeeForm from "@/components/AddEmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
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

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id: string) => {
    setDeletingEmployeeId(id);
    setError("");
    try {
      const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? "Failed to delete employee.");
      }

      await fetchEmployees();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Something went wrong.");
    } finally {
      setDeletingEmployeeId(null);
    }
  };

  const departmentOptions = useMemo(() => {
    return [...new Set(employees.map((employee) => employee.department))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const query = searchFilter.trim().toLowerCase();

    return employees.filter((employee) => {
      if (departmentFilter !== "all" && employee.department !== departmentFilter) {
        return false;
      }

      if (query) {
        const haystack =
          `${employee.employeeId} ${employee.fullName} ${employee.email} ${employee.department}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      const createdAt = new Date(employee.createdAt);

      if (fromDate) {
        const start = new Date(fromDate);
        start.setHours(0, 0, 0, 0);
        if (createdAt < start) {
          return false;
        }
      }

      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        if (createdAt > end) {
          return false;
        }
      }

      return true;
    });
  }, [employees, searchFilter, departmentFilter, fromDate, toDate]);

  const resetFilters = () => {
    setSearchFilter("");
    setDepartmentFilter("all");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Employee</Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-2xl p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>Fill in employee details and submit.</DialogDescription>
            </DialogHeader>
            <AddEmployeeForm
              onSuccess={async () => {
                setOpen(false);
                await fetchEmployees();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TableFilterBar onReset={resetFilters}>
        <Input
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          placeholder="Search by ID, name, email"
        />

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departmentOptions.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
        <Input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
      </TableFilterBar>

      {loading ? <p className="text-sm text-muted-foreground">Loading employees...</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {!loading && !error ? (
        <EmployeeTable
          employees={filteredEmployees}
          onDelete={handleDelete}
          deletingEmployeeId={deletingEmployeeId}
        />
      ) : null}
    </div>
  );
}
