"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type AddEmployeeFormProps = {
  onSuccess: () => void | Promise<void>;
};

type EmployeeFormData = {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
};

const initialState: EmployeeFormData = {
  employeeId: "",
  fullName: "",
  email: "",
  department: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddEmployeeForm({ onSuccess }: AddEmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formData.employeeId || !formData.fullName || !formData.email || !formData.department) {
      setError("All fields are required.");
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Failed to create employee.");
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
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
        <Input
          placeholder="Department"
          value={formData.department}
          onChange={(event) => handleChange("department", event.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Employee"}
      </Button>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
