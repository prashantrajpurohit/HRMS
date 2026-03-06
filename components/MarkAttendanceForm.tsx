"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

type Employee = {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: string;
};

type MarkAttendanceFormProps = {
  employees: Employee[];
  onSuccess: () => void | Promise<void>;
};

type AttendanceFormData = {
  employeeId: string;
  date: string;
  status: "Present" | "Absent" | "";
};

const initialState: AttendanceFormData = {
  employeeId: "",
  date: "",
  status: "",
};

export default function MarkAttendanceForm({ employees, onSuccess }: MarkAttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.employeeId || !formData.date || !formData.status) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Failed to mark attendance.");
        return;
      }

      setFormData(initialState);
      await onSuccess();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Select
          value={formData.employeeId}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, employeeId: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((employee) => (
              <SelectItem key={employee._id} value={employee.employeeId}>
                {employee.fullName} ({employee.employeeId})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={formData.date}
          onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
        />

        <Select
          value={formData.status}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, status: value as "Present" | "Absent" }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Mark Attendance"}
      </Button>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
