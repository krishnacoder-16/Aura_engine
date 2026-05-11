"use client";

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

export default function InventoryPage() {
  const data = MOCK_INVENTORY;

  const {
    currentPage,
    pageSize,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
  } = usePagination({
    totalItems: data.length,
    initialPageSize: 10,
  });

  // Simulate server-side pagination
  const paginatedData = data.slice(
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
        <InventoryToolbar />

        {/* Table — scrolls horizontally on small screens */}
        <InventoryTable data={paginatedData} />

        {/* Pagination */}
        <InventoryPagination
          total={data.length}
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
