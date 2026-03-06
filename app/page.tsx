"use client";

import { useEffect, useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import { Skeleton } from "@/ui/skeleton";

type DashboardData = {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/dashboard", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? "Failed to fetch dashboard data.");
        }

        setData(payload);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (!data) {
    return <p className="text-sm text-muted-foreground">No dashboard data available.</p>;
  }

  return (
    <DashboardCards
      totalEmployees={data.totalEmployees}
      presentToday={data.presentToday}
      absentToday={data.absentToday}
    />
  );
}
