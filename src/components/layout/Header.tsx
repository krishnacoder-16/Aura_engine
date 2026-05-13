"use client";

import { Bell, Search, Moon, Sun, Menu, ChevronDown, Command, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGlobalSearch } from "@/features/search/hooks/useGlobalSearch";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [notifCount] = useState(3);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { query, setQuery, results } = useGlobalSearch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === "Enter" || e.key === "ArrowDown") setShowDropdown(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        setShowDropdown(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <header className="sticky top-0 z-[40] flex items-center h-[60px] px-4 md:px-6 gap-4 border-b border-border bg-card/95 backdrop-blur-md shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Open navigation menu"
        id="mobile-menu-btn"
      >
        <Menu size={17} />
      </button>

      {/* ── Omnisearch ──────────────────────────────────────────────── */}
      <div ref={containerRef} className="relative flex-1 max-w-sm">
        <div className="relative group">
          <Search
            size={13}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
              showDropdown ? "text-orange-500" : "text-muted-foreground/50 group-hover:text-muted-foreground"
            )}
          />
          <input
            id="global-omnisearch"
            type="text"
            placeholder="Search products, warehouses, pages…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
              setSelectedIndex(0);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className={cn(
              "w-full h-9 pl-9 pr-10 text-[13px] rounded-xl outline-none transition-all duration-150",
              "border border-border bg-slate-50 dark:bg-muted/40",
              "text-foreground placeholder:text-muted-foreground/50",
              showDropdown 
                ? "bg-white dark:bg-muted/60 ring-2 ring-orange-500/15 border-orange-500/40 shadow-sm" 
                : "focus:bg-white dark:focus:bg-muted/60 focus:ring-2 focus:ring-orange-500/15 focus:border-orange-500/40"
            )}
          />
          {/* ⌘K hint */}
          {!query && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-muted-foreground/40 font-medium uppercase border border-border px-1 py-0.5 rounded-md bg-white dark:bg-muted shadow-sm pointer-events-none">
              <Command size={8} />
              <span>K</span>
            </div>
          )}
        </div>

        {/* Dropdown Panel */}
        {showDropdown && results.length > 0 && (
          <div 
            className={cn(
              "absolute top-full left-0 right-0 mt-1.5 p-1.5 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden",
              "animate-in fade-in slide-in-from-top-2 duration-150 z-50",
              "shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]"
            )}
          >
            <div className="max-h-[360px] overflow-y-auto flex flex-col">
              {(["navigation", "product", "warehouse"] as const).map((section) => {
                const sectionResults = results.filter((r) => r.type === section);
                if (sectionResults.length === 0) return null;

                return (
                  <div key={section} className="flex flex-col">
                    <div className="px-3 py-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-slate-50/50 dark:bg-muted/10 border-y border-border/50 first:border-t-0">
                      {section === "navigation" ? "Pages & Commands" : section === "product" ? "Products" : "Warehouses"}
                    </div>
                    {sectionResults.map((result) => {
                      const globalIndex = results.indexOf(result);
                      return (
                        <button
                          key={result.id}
                          className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 transition-all duration-100 text-left group mx-1.5 w-[calc(100%-12px)] rounded-xl my-0.5",
                            globalIndex === selectedIndex
                              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                              : "hover:bg-slate-50 dark:hover:bg-muted/50 text-foreground"
                          )}
                          onClick={() => {
                            router.push(result.url);
                            setShowDropdown(false);
                            setQuery("");
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div
                            className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              globalIndex === selectedIndex ? "bg-white/20" : "bg-slate-100 dark:bg-muted"
                            )}
                          >
                            {result.icon}
                          </div>
                          <div className="flex-1 flex flex-col min-w-0">
                            <span
                              className={cn(
                                "text-[12px] font-semibold leading-tight truncate",
                                globalIndex === selectedIndex ? "text-white" : "text-foreground"
                              )}
                            >
                              {result.title}
                            </span>
                            {result.subtitle && (
                              <span
                                className={cn(
                                  "text-[10px] leading-tight mt-0.5 truncate",
                                  globalIndex === selectedIndex ? "text-orange-100" : "text-muted-foreground"
                                )}
                              >
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                          <ArrowRight
                            size={12}
                            className={cn(
                              "transition-all duration-200 shrink-0",
                              globalIndex === selectedIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div className="mt-1 pt-1.5 border-t border-border px-2 pb-0.5 flex items-center justify-between opacity-50">
               <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">Results found: {results.length}</span>
               <div className="flex gap-2">
                 <span className="text-[9px] font-medium text-muted-foreground">↑↓ to navigate</span>
                 <span className="text-[9px] font-medium text-muted-foreground">↵ to open</span>
               </div>
            </div>
          </div>
        )}
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
