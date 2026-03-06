"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/ui/button";
import { cn } from "@/config/utils/utils";
import ThemeToggle from "@/components/theme-toggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Employees", href: "/employees" },
  { label: "Attendance", href: "/attendance" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HrmsTopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          HRMS Lite
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "font-medium",
                    active && "ring-1 ring-border bg-secondary text-secondary-foreground"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
