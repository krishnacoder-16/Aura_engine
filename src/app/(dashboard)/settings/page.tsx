"use client";

import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useTheme } from "next-themes";
import PageHeader from "@/components/shared/PageHeader";
import { ProfileSettings } from "@/features/settings/components/ProfileSettings";
import { AppearanceSettings } from "@/features/settings/components/AppearanceSettings";
import { NotificationSettings } from "@/features/settings/components/NotificationSettings";
import { InventoryPreferences } from "@/features/settings/components/InventoryPreferences";
import { SystemInfo } from "@/features/settings/components/SystemInfo";
import { Save, RotateCcw, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-slate-50/50">
        <h3 className="text-[15px] font-bold text-foreground">{title}</h3>
        <p className="text-[12px] text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { isDirty, saveSettings, resetSettings, sidebarCollapsed } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveSettings();
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <PageHeader 
        title="Settings" 
        subtitle="Configure your Aura Engine environment and personal preferences." 
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Profile */}
        <SettingsSection 
          title="Account Profile" 
          description="Manage your personal information and account security."
        >
          <ProfileSettings />
        </SettingsSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appearance */}
          <SettingsSection 
            title="Appearance" 
            description="Customize how the application looks on your device."
          >
            <AppearanceSettings />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection 
            title="Notifications" 
            description="Choose what alerts and reports you want to receive."
          >
            <NotificationSettings />
          </SettingsSection>
        </div>

        {/* Inventory Preferences */}
        <SettingsSection 
          title="Inventory Preferences" 
          description="Set default behavior and display formats for the management system."
        >
          <InventoryPreferences />
        </SettingsSection>

        {/* System Info */}
        <SettingsSection 
          title="System Information" 
          description="Application versioning and real-time status monitoring."
        >
          <SystemInfo />
        </SettingsSection>
      </div>

      {/* Action Footer - Static Form Action Section */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isDirty || showSaved ? "mt-8 opacity-100" : "opacity-0 pointer-events-none select-none h-0 mt-0 overflow-hidden"
      )}>
        <div className="bg-white/80 dark:bg-slate-900/90 border border-border rounded-2xl p-4 shadow-sm flex items-center justify-between border-orange-500/20">
          <div className="flex items-center gap-3 px-3">
            {showSaved ? (
              <div className="flex items-center gap-2 text-green-600 animate-in fade-in zoom-in-95">
                <CheckCircle size={16} strokeWidth={2.5} />
                <span className="text-[13px] font-bold">Changes saved successfully</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-foreground">Unsaved Changes</span>
                <span className="text-[11px] text-muted-foreground">You have modified settings in this session</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={resetSettings}
              disabled={isSaving}
              className="flex items-center gap-1.5 h-9 px-4 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "flex items-center gap-2 h-9 px-6 text-[12px] font-bold rounded-xl transition-all shadow-md",
                isSaving 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20"
              )}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save size={14} />
                  <span>Save Changes</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
