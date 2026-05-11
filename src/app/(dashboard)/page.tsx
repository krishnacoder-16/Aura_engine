import PageHeader from "@/components/shared/PageHeader";
import StatCard from "@/components/shared/StatCard";
import {
  Package2,
  AlertTriangle,
  TrendingUp,
  Truck,
  RefreshCw,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

const STATS = [
  {
    label: "Total SKUs",
    value: "10,482",
    change: "8.2% this month",
    changeType: "positive" as const,
    icon: Package2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    label: "Low Stock Alerts",
    value: "34",
    change: "12 new this week",
    changeType: "negative" as const,
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    label: "Monthly Revenue",
    value: "$2.4M",
    change: "5.1% vs last month",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    label: "Pending Shipments",
    value: "218",
    change: "15 fulfilled today",
    changeType: "neutral" as const,
    icon: Truck,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
  },
];

const ACTIVITY = [
  { icon: CheckCircle2, color: "text-emerald-500", label: "PO-4821 fulfilled",                    time: "2 min ago"  },
  { icon: AlertCircle,  color: "text-amber-500",   label: "SKU-0032 reached reorder threshold",   time: "14 min ago" },
  { icon: ArrowUpRight, color: "text-blue-500",    label: "Shipment SHP-9914 dispatched",         time: "1 hr ago"   },
  { icon: CheckCircle2, color: "text-emerald-500", label: "Inventory sync completed",             time: "2 hr ago"   },
  { icon: AlertCircle,  color: "text-rose-500",    label: "Warehouse A capacity at 94%",          time: "3 hr ago"   },
];

const ALERTS = [
  { level: "critical", message: "Warehouse A at 94% capacity" },
  { level: "warning",  message: "34 SKUs below reorder point"  },
  { level: "info",     message: "Scheduled sync in 18 min"     },
];

const alertStyles: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  critical: {
    dot:    "bg-rose-500",
    bg:     "bg-rose-50   dark:bg-rose-500/10",
    text:   "text-rose-700  dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-500/20",
  },
  warning: {
    dot:    "bg-amber-500",
    bg:     "bg-amber-50  dark:bg-amber-500/10",
    text:   "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  info: {
    dot:    "bg-blue-500",
    bg:     "bg-blue-50   dark:bg-blue-500/10",
    text:   "text-blue-700  dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-500/20",
  },
};

export default function DashboardPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <PageHeader
        title="Overview"
        subtitle="Enterprise inventory summary — synced just now"
      >
        <button
          id="refresh-dashboard-btn"
          className="flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <RefreshCw size={12} strokeWidth={2.5} />
          Refresh
        </button>
        <button
          id="new-item-btn"
          className="flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
        >
          <Zap size={12} strokeWidth={2.5} />
          Quick Action
        </button>
      </PageHeader>

      {/* ── KPI Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* ── Content Panels ──────────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-[0_1px_4px_0_rgb(0,0,0,0.05)] overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Clock size={12} className="text-muted-foreground" strokeWidth={2} />
              </div>
              <h2 className="text-[13px] font-semibold text-foreground">Recent Activity</h2>
            </div>
            <button className="text-[11.5px] font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-0.5 transition-colors">
              View all <ArrowUpRight size={11} strokeWidth={2.5} />
            </button>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border">
            {ACTIVITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-slate-50/80 dark:hover:bg-muted/30 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800">
                    <Icon size={12} className={item.color} strokeWidth={2.5} />
                  </div>
                  <span className="flex-1 text-[12.5px] text-foreground">{item.label}</span>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap tabular-nums">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Alerts */}
        <div className="rounded-2xl border border-border bg-card shadow-[0_1px_4px_0_rgb(0,0,0,0.05)] overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <AlertCircle size={12} className="text-muted-foreground" strokeWidth={2} />
              </div>
              <h2 className="text-[13px] font-semibold text-foreground">System Alerts</h2>
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 px-2 py-0.5 rounded-full">
              {ALERTS.length} Active
            </span>
          </div>

          {/* Alert items */}
          <div className="flex flex-col gap-2 p-4">
            {ALERTS.map((alert, i) => {
              const s = alertStyles[alert.level];
              return (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-xl px-3 py-3 border ${s.bg} ${s.border}`}
                >
                  <span className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                  <span className={`text-[12px] font-medium leading-snug ${s.text}`}>
                    {alert.message}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick stats at bottom */}
          <div className="px-4 pb-4">
            <div className="rounded-xl bg-slate-50 dark:bg-muted/40 border border-border px-3 py-3 flex items-center justify-between">
              <div className="text-center">
                <p className="text-[15px] font-bold text-foreground">99.8%</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Uptime</p>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-center">
                <p className="text-[15px] font-bold text-foreground">1.2s</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Sync Speed</p>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="text-center">
                <p className="text-[15px] font-bold text-foreground">12</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Warehouses</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
