"use client";

import { Search, SlidersHorizontal, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { INVENTORY_CATEGORIES } from "@/mock/inventory";
import { cn } from "@/lib/utils";

// ─── Toolbar ──────────────────────────────────────────────────────────────
export function InventoryToolbar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-border">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
        />
        <input
          id="inventory-search"
          type="text"
          placeholder="Search SKU, name, supplier…"
          className={cn(
            "w-full h-9 pl-9 pr-3 text-[13px] rounded-xl",
            "border border-border bg-slate-50",
            "text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500/40 focus:bg-white",
            "transition-all duration-150"
          )}
        />
      </div>

      {/* Category filter */}
      <select
        id="inventory-category-filter"
        className={cn(
          "h-9 px-3 text-[13px] rounded-xl",
          "border border-border bg-slate-50",
          "text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500/40",
          "transition-all duration-150 cursor-pointer"
        )}
        defaultValue=""
      >
        <option value="">All Categories</option>
        {INVENTORY_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Status filter */}
      <select
        id="inventory-status-filter"
        className={cn(
          "h-9 px-3 text-[13px] rounded-xl",
          "border border-border bg-slate-50",
          "text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-orange-500/25 focus:border-orange-500/40",
          "transition-all duration-150 cursor-pointer"
        )}
        defaultValue=""
      >
        <option value="">All Statuses</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
        <option value="discontinued">Discontinued</option>
      </select>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Filter toggle */}
      <button
        id="inventory-filter-btn"
        className="flex items-center gap-1.5 h-9 px-3.5 text-[12px] font-medium rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <SlidersHorizontal size={13} strokeWidth={2} />
        Filters
      </button>

      {/* Export */}
      <button
        id="inventory-export-btn"
        className="flex items-center gap-1.5 h-9 px-3.5 text-[12px] font-semibold rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
      >
        <Download size={13} strokeWidth={2.5} />
        Export CSV
      </button>
    </div>
  );
}

// ─── Pagination Bar ────────────────────────────────────────────────────────
interface InventoryPaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function InventoryPagination({
  total,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onNextPage,
  onPrevPage,
}: InventoryPaginationProps) {
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-slate-50/60">
      {/* Row count */}
      <p className="text-[12px] text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{start}–{end}</span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">{total}</span> items
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          id="pagination-prev-btn"
          disabled={currentPage === 1 || totalPages === 0}
          onClick={onPrevPage}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground bg-card hover:bg-accent hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>

        {/* Page number pills */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .reduce((acc: (number | string)[], page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              acc.push(page);
            } else if (acc[acc.length - 1] !== "...") {
              acc.push("...");
            }
            return acc;
          }, [])
          .map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="text-[12px] text-muted-foreground px-1"
                >
                  …
                </span>
              );
            }
            const page = item as number;
            return (
              <button
                key={page}
                id={`pagination-page-${page}-btn`}
                onClick={() => onPageChange(page)}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg text-[12px] font-medium border transition-colors",
                  page === currentPage
                    ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {page}
              </button>
            );
          })}

        {/* Next */}
        <button
          id="pagination-next-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={onNextPage}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground bg-card hover:bg-accent hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Page size */}
      <select
        id="pagination-page-size"
        className="h-8 px-2.5 text-[12px] rounded-lg border border-border bg-card text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/25 cursor-pointer"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={10}>10 / page</option>
        <option value={12}>12 / page</option>
        <option value={25}>25 / page</option>
        <option value={50}>50 / page</option>
      </select>
    </div>
  );
}
