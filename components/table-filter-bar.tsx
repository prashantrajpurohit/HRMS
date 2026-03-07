"use client";

import { ReactNode } from "react";
import { Button } from "@/ui/button";
import { cn } from "@/config/utils/utils";

type TableFilterBarProps = {
  children: ReactNode;
  onReset: () => void;
  className?: string;
  resetLabel?: string;
};

export default function TableFilterBar({
  children,
  onReset,
  className,
  resetLabel = "Reset Filters",
}: TableFilterBarProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-5", className)}>
      {children}
      <Button type="button" variant="outline" onClick={onReset} className="w-full md:w-auto">
        {resetLabel}
      </Button>
    </div>
  );
}
