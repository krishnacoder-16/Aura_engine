"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package2,
  BarChart3,
  Download,
  Settings,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/",          icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Package2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Export",    href: "/export",    icon: Download },
  { label: "Settings",  href: "/settings",  icon: Settings },
];

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — same dark slate as desktop sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[240px] z-50 md:hidden",
          "flex flex-col bg-slate-900 border-r border-white/[0.06]",
          "shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        {/* Logo Row */}
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-500 text-white">
              <Zap size={14} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[14px] tracking-tight text-white">
                Aura Engine
              </span>
              <span className="text-[9.5px] text-slate-400 uppercase tracking-[0.12em] font-medium mt-0.5">
                Enterprise IMS
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-slate-300 transition-colors"
            aria-label="Close navigation"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto">
          <p className="px-2 pt-0.5 pb-2.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-500 select-none">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all",
                  isActive
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-orange-500" />
                )}
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-orange-400" : "text-slate-500"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
