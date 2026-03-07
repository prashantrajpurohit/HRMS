"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type Employee = {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: string;
};

type EditEmployeeFormProps = {
  employee: Employee;
  onSuccess: () => void | Promise<void>;
};

type EmployeeFormData = {
  employeeId: string;
  fullName: string;
  department: string;
};

export default function EditEmployeeForm({ employee, onSuccess }: EditEmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeId: employee.employeeId,
    fullName: employee.fullName,
    department: employee.department,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.employeeId || !formData.fullName || !formData.department) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/employees/${employee._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Failed to update employee.");
        return;
      }

      await onSuccess();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={(event) => handleChange("employeeId", event.target.value)}
        />
        <Input
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={employee.email}
          disabled
          className="cursor-not-allowed opacity-70"
        />
        <Input
          placeholder="Department"
          value={formData.department}
          onChange={(event) => handleChange("department", event.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Employee"}
      </Button>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
