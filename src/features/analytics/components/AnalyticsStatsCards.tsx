"use client";

import { cn } from "@/lib/utils";
import { Package, DollarSign, AlertCircle, TrendingDown } from "lucide-react";
import { InventoryItem } from "@/features/inventory/types";

interface AnalyticsStatsCardsProps {
  data: InventoryItem[];
}

export function AnalyticsStatsCards({ data }: AnalyticsStatsCardsProps) {
  const totalSKUs = data.length;
  const totalValue = data.reduce((acc, item) => acc + (item.stock * item.price), 0);
  const outOfStock = data.filter(item => item.status === "out_of_stock").length;
  const lowStock = data.filter(item => item.status === "low_stock").length;

  const stats = [
    {
      label: "Total SKUs",
      value: totalSKUs.toLocaleString(),
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Inventory Value",
      value: `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Out of Stock Items",
      value: outOfStock.toString(),
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      label: "Low Stock Items",
      value: lowStock.toString(),
      icon: TrendingDown,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider leading-none mb-1.5">
                {stat.label}
              </span>
              <span className="text-xl font-bold text-foreground leading-none">
                {stat.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
