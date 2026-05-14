"use client";

import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className }: ChartCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-2xl p-6 shadow-sm", className)}>
      <div className="mb-4">
        <h3 className="text-[16px] font-bold text-foreground leading-tight">{title}</h3>
        {subtitle && <p className="text-[12px] text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
