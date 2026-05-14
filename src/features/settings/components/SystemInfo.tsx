"use client";

import { Info, Cpu, Globe, Activity, CheckCircle2 } from "lucide-react";

export function SystemInfo() {
  const infoItems = [
    { label: "App Version", value: "v2.4.0-stable", icon: Info },
    { label: "Environment", value: "Production (US-East)", icon: Globe },
    { label: "Last System Sync", value: "Today, 10:45 AM", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infoItems.map((item) => (
          <div key={item.label} className="p-4 rounded-xl border border-border bg-slate-50/50 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <item.icon size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
            </div>
            <span className="text-[14px] font-semibold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-green-100 bg-green-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-green-600" />
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-green-800">All Systems Operational</span>
            <span className="text-[11px] text-green-700/70">Database, API, and Warehouse Sync are running normally</span>
          </div>
        </div>
        <span className="px-2 py-1 rounded-lg bg-white border border-green-200 text-green-700 text-[10px] font-bold">Uptime 99.98%</span>
      </div>
    </div>
  );
}
