"use client";

import { useMemo } from "react";
import PageHeader from "@/components/shared/PageHeader";
import InventoryStatsStrip from "@/features/inventory/components/InventoryStatsStrip";
import InventoryTable from "@/features/inventory/components/InventoryTable";
import {
  InventoryToolbar,
  InventoryPagination,
} from "@/features/inventory/components/InventoryControls";
import { MOCK_INVENTORY } from "@/mock/inventory";
import { Plus, RefreshCw } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";
import { useFilters } from "@/hooks/useFilters";

export default function InventoryPage() {
  const data = MOCK_INVENTORY;

  const { filters, updateFilter, resetFilters, hasActiveFilters } = useFilters();

  const { sorting, onSortingChange } = useSorting([
    { id: "name", desc: false }, // Default sort
  ]);

  // Apply advanced filtering
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // String filters
      if (
        filters.search &&
        !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.sku.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.supplier.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.category && item.category !== filters.category) return false;
      if (filters.status && item.status !== filters.status) return false;

      // Numeric filters
      if (filters.maxStock !== null && item.stock > filters.maxStock) return false;
      if (filters.minPrice !== null && item.price < filters.minPrice) return false;
      if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;

      return true;
    });
  }, [data, filters]);

  const {
    currentPage,
    pageSize,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
  } = usePagination({
    totalItems: filteredData.length,
    initialPageSize: 10,
  });

  // Simulate server-side sorting
  const sortedData = useMemo(() => {
    if (sorting.length === 0) return filteredData;

    const { id, desc } = sorting[0];

    return [...filteredData].sort((a, b) => {
      const aVal = a[id as keyof typeof a];
      const bVal = b[id as keyof typeof b];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return desc ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
  }, [filteredData, sorting]);

  // Simulate server-side pagination
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <PageHeader
        title="Inventory"
        subtitle={`${data.length} items across all warehouses`}
      >
        <button
          id="refresh-inventory-btn"
          className="flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <RefreshCw size={12} strokeWidth={2.5} />
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

      {/* ── Stats Strip ────────────────────────────────────────────── */}
      <InventoryStatsStrip data={data} />

      {/* ── Data Grid ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card shadow-[0_1px_4px_0_rgb(0,0,0,0.05)] overflow-hidden">
        {/* Toolbar */}
        <InventoryToolbar
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Table — scrolls horizontally on small screens */}
        <InventoryTable
          data={paginatedData}
          sorting={sorting}
          onSortingChange={onSortingChange}
        />

        {/* Pagination */}
        <InventoryPagination
          total={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      </div>
    </>
  );
}
