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
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-wrap items-center gap-2 px-4 py-2 sm:flex-nowrap sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="w-full text-base font-semibold tracking-tight text-foreground sm:w-auto"
        >
          HRMS Lite
        </Link>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:flex-nowrap sm:justify-end">
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-xs font-medium sm:h-9 sm:px-4 sm:text-sm",
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
