"use client";

import { User, Mail, Shield, Camera } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 pb-6 border-b border-border">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <User size={40} className="text-orange-500" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-white border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[16px] font-bold text-foreground">Admin User</h3>
          <p className="text-[13px] text-muted-foreground">System Administrator</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Verified Account</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <User size={12} className="text-orange-500" />
            Full Name
          </label>
          <input 
            type="text" 
            defaultValue="Admin User"
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Mail size={12} className="text-orange-500" />
            Email Address
          </label>
          <input 
            type="email" 
            defaultValue="admin@auraengine.com"
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Shield size={12} className="text-orange-500" />
            Role
          </label>
          <select 
            disabled
            className="w-full h-10 px-3 text-[13px] rounded-xl border border-border bg-slate-100 text-muted-foreground cursor-not-allowed appearance-none"
          >
            <option>System Administrator</option>
          </select>
        </div>
      </div>
    </div>
  );
}
