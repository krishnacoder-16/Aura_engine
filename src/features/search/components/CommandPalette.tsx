"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Search, 
  Package, 
  Warehouse, 
  ArrowRight, 
  Command as CommandIcon,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useGlobalSearch } from "../hooks/useGlobalSearch";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { query, setQuery, results } = useGlobalSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-slate-950/20 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200",
          "shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)]"
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border bg-slate-50/50">
          <Search size={18} className="text-muted-foreground/60" />
          <input 
            autoFocus
            type="text"
            placeholder="Search products, warehouses, or commands..."
            className="flex-1 bg-transparent border-none outline-none text-[15px] text-foreground placeholder:text-muted-foreground/50"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-border bg-white text-[10px] font-medium text-muted-foreground shadow-sm">
            ESC
          </div>
        </div>

        {/* Results */}
        <div 
          ref={scrollContainerRef}
          className="max-h-[400px] overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-60">
              <Package size={32} strokeWidth={1} className="mb-3" />
              <p className="text-[13px] font-medium">No results found for "{query}"</p>
              <p className="text-[12px] text-muted-foreground mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {(["navigation", "product", "warehouse"] as const).map((section) => {
                const sectionResults = results.filter((r) => r.type === section);
                if (sectionResults.length === 0) return null;

                return (
                  <div key={section} className="flex flex-col">
                    <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] bg-slate-50/50 dark:bg-muted/10 border-y border-border/50 first:border-t-0">
                      {section === "navigation" ? "Pages & Commands" : section === "product" ? "Products" : "Warehouses"}
                    </div>
                    <div className="p-1.5 flex flex-col gap-0.5">
                      {sectionResults.map((result) => {
                        const globalIndex = results.indexOf(result);
                        return (
                          <button
                            key={result.id}
                            className={cn(
                              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-100 text-left group",
                              globalIndex === selectedIndex 
                                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" 
                                : "hover:bg-slate-50 dark:hover:bg-muted/50 text-foreground"
                            )}
                            onClick={() => {
                              router.push(result.url);
                              onClose();
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                              globalIndex === selectedIndex ? "bg-white/20" : "bg-slate-100 dark:bg-muted"
                            )}>
                              {result.icon}
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                              <span className={cn(
                                "text-[13px] font-semibold leading-tight truncate",
                                globalIndex === selectedIndex ? "text-white" : "text-foreground"
                              )}>
                                {result.title}
                              </span>
                              {result.subtitle && (
                                <span className={cn(
                                  "text-[11px] leading-tight mt-0.5 truncate",
                                  globalIndex === selectedIndex ? "text-orange-100" : "text-muted-foreground"
                                )}>
                                  {result.subtitle}
                                </span>
                              )}
                            </div>
                            <ArrowRight 
                              size={14} 
                              className={cn(
                                "transition-all duration-200 shrink-0",
                                globalIndex === selectedIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                              )} 
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              <span className="p-1 bg-white dark:bg-muted border border-border rounded shadow-sm">↓↑</span>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              <span className="p-1 bg-white dark:bg-muted border border-border rounded shadow-sm px-1.5">ENTER</span>
              <span>Open</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
            <CommandIcon size={10} />
            <span>K to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
