import { Sun, Moon, Monitor, Layout, Sidebar } from "lucide-react";
import { useTheme } from "next-themes";
import { useSettings } from "@/context/SettingsContext";
import { cn } from "@/lib/utils";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const { pendingSettings, updateSettings } = useSettings();

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div className="space-y-4">
        <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Interface Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all duration-200",
                theme === t.id 
                  ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm" 
                  : "bg-card border-border text-muted-foreground hover:bg-slate-50"
              )}
            >
              <t.icon size={20} />
              <span className="text-[12px] font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Display Options</label>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Layout size={18} className="text-orange-500" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Compact Mode</span>
                <span className="text-[11px] text-muted-foreground">Reduce spacing and padding across the UI</span>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ compactMode: !pendingSettings.compactMode })}
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-200",
                pendingSettings.compactMode ? "bg-orange-500" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200",
                pendingSettings.compactMode ? "translate-x-5" : ""
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Sidebar size={18} className="text-orange-500" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Collapsed Sidebar</span>
                <span className="text-[11px] text-muted-foreground">Automatically collapse sidebar on navigation</span>
              </div>
            </div>
            <button 
              onClick={() => updateSettings({ sidebarCollapsed: !pendingSettings.sidebarCollapsed })}
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors duration-200",
                pendingSettings.sidebarCollapsed ? "bg-orange-500" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200",
                pendingSettings.sidebarCollapsed ? "translate-x-5" : ""
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
