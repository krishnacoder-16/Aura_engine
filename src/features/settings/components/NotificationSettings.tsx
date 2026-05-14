import { Bell, Mail, AlertTriangle, RefreshCw, BarChart3 } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

export function NotificationSettings() {
  const { pendingSettings, updateSettings } = useSettings();

  const toggle = (key: string) => {
    const k = key as any;
    updateSettings({ [k]: !pendingSettings[k as keyof typeof pendingSettings] });
  };

  const notificationOptions = [
    { 
      id: "emailNotifications", 
      title: "Email Notifications", 
      desc: "Receive daily summary and account updates via email",
      icon: Mail 
    },
    { 
      id: "lowStockAlerts", 
      title: "Low Stock Alerts", 
      desc: "Get notified immediately when stock levels drop below thresholds",
      icon: AlertTriangle 
    },
    { 
      id: "syncAlerts", 
      title: "Inventory Sync Alerts", 
      desc: "Notifications for warehouse sync successes or failures",
      icon: RefreshCw 
    },
    { 
      id: "weeklyReport", 
      title: "Weekly Analytics Report", 
      desc: "Receive a comprehensive performance report every Monday",
      icon: BarChart3 
    },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
          <Bell size={16} className="text-orange-500" />
        </div>
        <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Notification Preferences</label>
      </div>
      
      <div className="space-y-3">
        {notificationOptions.map((opt) => (
          <div key={opt.id} className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <opt.icon size={18} className="text-orange-500" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">{opt.title}</span>
                <span className="text-[11px] text-muted-foreground">{opt.desc}</span>
              </div>
            </div>
            <button 
              onClick={() => toggle(opt.id)}
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-200",
                (pendingSettings as any)[opt.id] ? "bg-orange-500" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200",
                (pendingSettings as any)[opt.id] ? "translate-x-5" : ""
              )} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
