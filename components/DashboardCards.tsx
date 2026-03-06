import { CheckCircle, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";

type DashboardCardsProps = {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
};

export default function DashboardCards({
  totalEmployees,
  presentToday,
  absentToday,
}: DashboardCardsProps) {
  const cards = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: Users,
      iconClassName: "text-blue-600",
    },
    {
      label: "Present Today",
      value: presentToday,
      icon: CheckCircle,
      iconClassName: "text-emerald-600",
    },
    {
      label: "Absent Today",
      value: absentToday,
      icon: XCircle,
      iconClassName: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{card.label}</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-semibold tabular-nums">{card.value}</CardTitle>
                <Icon className={`h-6 w-6 ${card.iconClassName}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              HRMS summary metrics
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
