"use client";

import { Bell, Search, Moon, Sun, Menu, ChevronDown, Command } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [notifCount] = useState(3);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center h-[60px] px-4 md:px-6 gap-4 border-b border-border bg-card/95 backdrop-blur-md shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Open navigation menu"
        id="mobile-menu-btn"
      >
        <Menu size={17} />
      </button>

      {/* ── Search ──────────────────────────────────────────────────── */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
        />
        <input
          id="global-search"
          type="text"
          placeholder="Search SKUs, orders, items…"
          className={cn(
            "w-full h-9 pl-9 pr-10 text-[13px] rounded-xl",
            "border border-border bg-slate-50 dark:bg-muted/40",
            "text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500/40 focus:bg-white dark:focus:bg-muted/60",
            "transition-all duration-150"
          )}
        />
        {/* ⌘K hint */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-muted-foreground/40 pointer-events-none">
          <Command size={9} />
          <span>K</span>
        </div>
      </div>

      {/* ── Right Controls ───────────────────────────────────────────── */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Theme toggle */}
        <button
          id="dark-mode-toggle"
          onClick={toggleDark}
          className="flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <button
          id="notifications-btn"
          className="relative flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={`${notifCount} notifications`}
        >
          <Bell size={15} />
          {notifCount > 0 && (
            <span className="absolute top-[10px] right-[10px] w-[5px] h-[5px] rounded-full bg-orange-500 ring-[1.5px] ring-card" />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1.5" />

        {/* User Avatar */}
        <button
          id="user-avatar-btn"
          className="flex items-center gap-2.5 rounded-xl pl-1.5 pr-2.5 py-1.5 hover:bg-accent transition-colors group"
          aria-label="Open user menu"
        >
          {/* Avatar with orange gradient */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[11px] font-bold text-white tracking-tight">AE</span>
          </div>
          <div className="hidden sm:flex flex-col items-start leading-none gap-[3px]">
            <span className="text-[12px] font-semibold text-foreground leading-none">
              Admin User
            </span>
            <span className="text-[10px] text-muted-foreground leading-none">
              Administrator
            </span>
          </div>
          <ChevronDown
            size={12}
            className="text-muted-foreground/60 hidden sm:block group-hover:text-muted-foreground transition-colors"
            strokeWidth={2.5}
          />
        </button>
      </div>
    </header>
  );
}
