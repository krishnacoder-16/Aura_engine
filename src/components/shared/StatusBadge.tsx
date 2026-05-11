import { cn } from "@/lib/utils";
import { StockStatus } from "@/features/inventory/types";

const STATUS_CONFIG: Record<
  StockStatus,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  in_stock: {
    label:  "In Stock",
    dot:    "bg-emerald-500",
    text:   "text-emerald-700",
    bg:     "bg-emerald-50",
    border: "border-emerald-200",
  },
  low_stock: {
    label:  "Low Stock",
    dot:    "bg-amber-500",
    text:   "text-amber-700",
    bg:     "bg-amber-50",
    border: "border-amber-200",
  },
  out_of_stock: {
    label:  "Out of Stock",
    dot:    "bg-rose-500",
    text:   "text-rose-700",
    bg:     "bg-rose-50",
    border: "border-rose-200",
  },
  discontinued: {
    label:  "Discontinued",
    dot:    "bg-slate-400",
    text:   "text-slate-600",
    bg:     "bg-slate-100",
    border: "border-slate-200",
  },
};

interface StatusBadgeProps {
  status: StockStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5",
        "text-[11px] font-semibold border",
        cfg.bg, cfg.text, cfg.border,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  );
}
