import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
  className,
}: StatCardProps) {
  const changeMeta = {
    positive: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg:   "bg-emerald-50 dark:bg-emerald-500/10",
      TrendIcon: TrendingUp,
    },
    negative: {
      text: "text-rose-600 dark:text-rose-400",
      bg:   "bg-rose-50 dark:bg-rose-500/10",
      TrendIcon: TrendingDown,
    },
    neutral: {
      text: "text-slate-500 dark:text-slate-400",
      bg:   "bg-slate-100 dark:bg-slate-500/10",
      TrendIcon: Minus,
    },
  };

  const meta = changeMeta[changeType];
  const TrendIcon = meta.TrendIcon;

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card",
        "px-5 py-5 flex flex-col gap-5",
        "shadow-[0_1px_4px_0_rgb(0,0,0,0.05)]",
        "hover:shadow-[0_6px_20px_0_rgb(0,0,0,0.07)] hover:-translate-y-[1px]",
        "transition-all duration-200",
        className
      )}
    >
      {/* Top: label + icon container */}
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.10em] text-muted-foreground leading-none">
          {label}
        </span>
        <div
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl shrink-0",
            iconBg
          )}
        >
          <Icon size={16} className={iconColor} strokeWidth={2} />
        </div>
      </div>

      {/* Bottom: value + change badge */}
      <div className="flex items-end justify-between gap-2">
        <p className="text-[26px] font-bold tracking-tight text-foreground leading-none tabular-nums">
          {value}
        </p>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-1 shrink-0 mb-0.5",
              meta.bg
            )}
          >
            <TrendIcon size={10} className={meta.text} strokeWidth={2.5} />
            <span className={cn("text-[10.5px] font-semibold whitespace-nowrap", meta.text)}>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
