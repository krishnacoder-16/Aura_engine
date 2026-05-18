"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "@/components/shared/PageHeader";
import InventoryStatsStrip from "@/features/inventory/components/InventoryStatsStrip";
import InventoryTable from "@/features/inventory/components/InventoryTable";
import {
  InventoryToolbar,
  InventoryPagination,
} from "@/features/inventory/components/InventoryControls";
import { Plus, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";
import { useFilters } from "@/hooks/useFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { useSettings } from "@/context/SettingsContext";
import { downloadCSV, getFormattedDate } from "@/lib/csv-utils";
import { cn } from "@/lib/utils";
import { useInventory } from "@/hooks/useInventory";

export default function InventoryPage() {
  const { rowsPerPage, defaultWarehouse } = useSettings();
  const [isExporting, setIsExporting] = useState(false);

  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters();
  
  // Set initial warehouse filter if specified in settings
  useEffect(() => {
    if (defaultWarehouse && defaultWarehouse !== "All Warehouses") {
      updateFilter("warehouse", defaultWarehouse);
    }
  }, [defaultWarehouse]);

  // Debounce the search input for better performance
  const debouncedSearch = useDebounce(filters.search, 500);
  const isSearching = filters.search !== debouncedSearch;

  const { sorting, onSortingChange } = useSorting([
    { id: "name", desc: false }, // Default sort
  ]);

  // Need to manage page and size here since it drives the API fetch
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(rowsPerPage);

  // Keep pagination in sync with settings if changed
  useEffect(() => {
    setPageSize(rowsPerPage);
    setCurrentPage(1);
  }, [rowsPerPage]);

  // Reset to page 1 when any filter or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    filters.category,
    filters.status,
    filters.warehouse,
    filters.maxStock,
    filters.minPrice,
    filters.maxPrice,
    sorting
  ]);

  const sortId = sorting.length > 0 ? sorting[0].id : undefined;
  const sortDesc = sorting.length > 0 ? sorting[0].desc : undefined;

  // Fetch data from API
  const { data, total, totalPages, isLoading, error } = useInventory({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    category: filters.category || undefined,
    status: filters.status || undefined,
    warehouse: filters.warehouse || undefined,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    maxStock: filters.maxStock,
    sortId,
    sortDesc
  });

  // CSV Export Handler - we only export the current page in a true paginated setup, 
  // or we'd need a separate endpoint for full export. Exporting current page for now.
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = [
        "sku", 
        "name", 
        "category", 
        "stock", 
        "price", 
        "status", 
        "supplier", 
        "warehouse", 
        "lastUpdated"
      ];
      const filename = `aura-inventory-page${currentPage}-${getFormattedDate()}.csv`;
      downloadCSV(data, headers, filename);
      setIsExporting(false);
    }, 800);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleChangePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        title="Inventory"
        subtitle={isLoading ? "Loading items..." : `${total} items matching criteria`}
      >
        <button
          id="refresh-inventory-btn"
          onClick={() => setCurrentPage(1)} // Just triggers a re-render/fetch basically
          className="flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <RefreshCw size={12} strokeWidth={2.5} className={cn(isLoading && "animate-spin")} />
          Refresh
        </button>
        <button
          id="add-inventory-btn"
          className="flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
        >
          <Plus size={13} strokeWidth={2.5} />
          Add Item
        </button>
      </PageHeader>

      {/* Stats Strip: currently disabled or requires full data? 
          We'll pass current page data just so it doesn't crash, 
          ideally this would be fetched from a /stats endpoint */}
      <InventoryStatsStrip data={data} />

      <div className="rounded-2xl border border-border bg-card shadow-[0_1px_4px_0_rgb(0,0,0,0.05)] overflow-hidden">
        <InventoryToolbar
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
          isSearching={isSearching}
          onExport={handleExport}
          isExporting={isExporting}
        />

        {error ? (
          <div className="flex flex-col items-center justify-center p-12 text-red-500 gap-3">
            <AlertCircle size={32} />
            <p className="font-semibold text-[14px]">Failed to load inventory.</p>
          </div>
        ) : isLoading && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-muted-foreground gap-4">
            <Loader2 size={32} className="animate-spin text-orange-500" />
            <p className="text-[14px] font-medium animate-pulse">Fetching from server...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-muted-foreground gap-3">
            <p className="font-semibold text-[15px]">No items found</p>
            <p className="text-[13px]">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                <Loader2 size={24} className="animate-spin text-orange-500" />
              </div>
            )}
            <InventoryTable
              data={data}
              sorting={sorting}
              onSortingChange={onSortingChange}
            />
          </div>
        )}

        <InventoryPagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handleChangePageSize}
          onNextPage={() => handlePageChange(currentPage + 1)}
          onPrevPage={() => handlePageChange(currentPage - 1)}
        />
      </div>
    </>
  );
}



