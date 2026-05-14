"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/",          icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Package2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings",  href: "/settings",  icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        // Dark slate — hardcoded so it stays dark regardless of light/dark mode
        "relative hidden md:flex flex-col h-screen shrink-0",
        "bg-slate-900 border-r border-white/[0.06]",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[64px]" : "w-[220px]"
      )}
    >
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center h-[60px] border-b border-white/[0.06] shrink-0 px-4",
          collapsed ? "justify-center" : "gap-2.5"
        )}
      >
        {/* Orange logo mark */}
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500 text-white shrink-0">
          <Zap size={14} strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-[14px] tracking-tight text-white">
              Aura Engine
            </span>
            <span className="text-[9.5px] text-slate-400 uppercase tracking-[0.12em] font-medium mt-0.5">
              Enterprise IMS
            </span>
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {!collapsed && (
          <p className="px-2 pt-0.5 pb-2.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-500 select-none">
            Navigation
          </p>
        )}

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl text-[13px] font-medium",
                "transition-all duration-150 group",
                collapsed ? "justify-center w-full h-10 px-0" : "px-3 py-2.5",
                isActive
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
              )}
            >
              {/* Active left bar */}
              {isActive && !collapsed && (
                <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-orange-500" />
              )}

              <Icon
                size={16}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive
                    ? "text-orange-400"
                    : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Collapse Toggle ───────────────────────────────────────────── */}
      <div className={cn("p-2.5 border-t border-white/[0.06]")}>
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 w-full rounded-xl px-2 py-2 text-xs font-medium",
            "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300 transition-colors",
            collapsed ? "justify-center" : ""
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={14} strokeWidth={2} />
          ) : (
            <>
              <ChevronLeft size={14} strokeWidth={2} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
