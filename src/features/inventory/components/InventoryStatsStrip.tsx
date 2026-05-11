import { InventoryItem } from "@/features/inventory/types";
import { Package2, AlertTriangle, XCircle, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryStatsStripProps {
  data: InventoryItem[];
}

export default function InventoryStatsStrip({ data }: InventoryStatsStripProps) {
  const total       = data.length;
  const inStock     = data.filter((d) => d.status === "in_stock").length;
  const lowStock    = data.filter((d) => d.status === "low_stock").length;
  const outOfStock  = data.filter((d) => d.status === "out_of_stock").length;
  const discontinued = data.filter((d) => d.status === "discontinued").length;

  const stats = [
    {
      label: "Total Items",
      value: total,
      icon: Package2,
      iconColor: "text-slate-500",
      iconBg: "bg-slate-100",
    },
    {
      label: "In Stock",
      value: inStock,
      icon: Package2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
    },
    {
      label: "Discontinued",
      value: discontinued,
      icon: Ban,
      iconColor: "text-slate-400",
      iconBg: "bg-slate-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card px-4 py-4 flex items-center gap-3 shadow-[0_1px_4px_0_rgb(0,0,0,0.05)]"
          >
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", stat.iconBg)}>
              <Icon size={15} className={stat.iconColor} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[20px] font-bold text-foreground leading-none tabular-nums">{stat.value}</p>
              <p className="text-[10.5px] text-muted-foreground mt-0.5 truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
