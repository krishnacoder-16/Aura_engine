"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "INR";
export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

interface SettingsState {
  currency: Currency;
  dateFormat: DateFormat;
  rowsPerPage: number;
  defaultWarehouse: string;
  compactMode: boolean;
  sidebarCollapsed: boolean;
  emailNotifications: boolean;
  lowStockAlerts: boolean;
  syncAlerts: boolean;
  weeklyReport: boolean;
}

interface SettingsContextType extends SettingsState {
  updateSettings: (updates: Partial<SettingsState>) => void;
  resetSettings: () => void;
  isDirty: boolean;
  saveSettings: () => void;
  pendingSettings: SettingsState;
}

const DEFAULT_SETTINGS: SettingsState = {
  currency: "USD",
  dateFormat: "MM/DD/YYYY",
  rowsPerPage: 25,
  defaultWarehouse: "All Warehouses",
  compactMode: false,
  sidebarCollapsed: false,
  emailNotifications: true,
  lowStockAlerts: true,
  syncAlerts: false,
  weeklyReport: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [pendingSettings, setPendingSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aura-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setPendingSettings(parsed);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateSettings = (updates: Partial<SettingsState>) => {
    setPendingSettings((prev) => ({ ...prev, ...updates }));
  };

  const saveSettings = () => {
    setSettings(pendingSettings);
    localStorage.setItem("aura-settings", JSON.stringify(pendingSettings));
  };

  const resetSettings = () => {
    setPendingSettings(settings);
  };

  const isDirty = JSON.stringify(settings) !== JSON.stringify(pendingSettings);

  if (!isInitialized) return null;

  return (
    <SettingsContext.Provider 
      value={{ 
        ...settings, 
        pendingSettings,
        updateSettings, 
        saveSettings,
        resetSettings,
        isDirty 
      }}
    >
      <div className={settings.compactMode ? "app-compact" : ""}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

/**
 * Helper to format currency values based on global settings
 */
export function formatCurrency(value: number, currency: Currency) {
  const locales: Record<Currency, string> = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    JPY: "ja-JP",
    INR: "en-IN",
  };

  return new Intl.NumberFormat(locales[currency], {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Helper to format dates based on global settings
 */
export function formatDate(dateStr: string, format: DateFormat) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "DD/MM/YYYY": return `${day}/${month}/${year}`;
    case "YYYY-MM-DD": return `${year}-${month}-${day}`;
    case "MM/DD/YYYY":
    default:
      return `${month}/${day}/${year}`;
  }
}
