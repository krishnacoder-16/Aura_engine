import { List, Warehouse, DollarSign, Calendar } from "lucide-react";
import { useSettings, Currency, DateFormat } from "@/context/SettingsContext";

export function InventoryPreferences() {
  const { pendingSettings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Rows Per Page */}
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <List size={12} className="text-orange-500" />
            Default Rows Per Page
          </label>
          <select 
            value={pendingSettings.rowsPerPage}
            onChange={(e) => updateSettings({ rowsPerPage: Number(e.target.value) })}
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Primary Warehouse */}
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Warehouse size={12} className="text-orange-500" />
            Primary Warehouse
          </label>
          <select 
            value={pendingSettings.defaultWarehouse}
            onChange={(e) => updateSettings({ defaultWarehouse: e.target.value })}
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer"
          >
            <option value="All Warehouses">All Warehouses</option>
            <option value="Main Warehouse (WH-A)">Main Warehouse (WH-A)</option>
            <option value="Secondary Distribution (WH-B)">Secondary Distribution (WH-B)</option>
            <option value="Direct Ship (WH-C)">Direct Ship (WH-C)</option>
          </select>
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <DollarSign size={12} className="text-orange-500" />
            Display Currency
          </label>
          <select 
            value={pendingSettings.currency}
            onChange={(e) => updateSettings({ currency: e.target.value as Currency })}
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer"
          >
            <option value="USD">USD ($) - US Dollar</option>
            <option value="INR">INR (₹) - Indian Rupee</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="GBP">GBP (£) - British Pound</option>
            <option value="JPY">JPY (¥) - Japanese Yen</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Calendar size={12} className="text-orange-500" />
            Date Format
          </label>
          <select 
            value={pendingSettings.dateFormat}
            onChange={(e) => updateSettings({ dateFormat: e.target.value as DateFormat })}
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all cursor-pointer"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );
}
