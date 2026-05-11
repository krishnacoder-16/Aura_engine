"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  OnChangeFn,
} from "@tanstack/react-table";
import { InventoryItem } from "@/features/inventory/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown, Package2 } from "lucide-react";

// ─── Column definitions ────────────────────────────────────────────────────
const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="font-mono text-[12px] font-semibold text-slate-500 tracking-wide">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-[13px] font-medium text-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    enableSorting: true,
    cell: ({ row }) => {
      const stock = row.original.stock;
      const reorder = row.original.reorderPoint;
      const isLow = stock > 0 && stock <= reorder;
      return (
        <span
          className={cn(
            "text-[13px] font-semibold tabular-nums",
            stock === 0
              ? "text-rose-600"
              : isLow
              ? "text-amber-600"
              : "text-foreground"
          )}
        >
          {stock.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-[13px] font-semibold text-foreground tabular-nums">
        ${getValue<number>().toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ getValue }) => <StatusBadge status={getValue<InventoryItem["status"]>()} />,
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-[12px] text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="inline-flex items-center rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-600">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-[12px] text-muted-foreground tabular-nums">
        {getValue<string>()}
      </span>
    ),
  },
];

// ─── Empty State ───────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <tr>
      <td colSpan={columns.length} className="py-20">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Package2 size={22} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground">No inventory items found</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Try adjusting your search or filters.
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Table Component ──────────────────────────────────────────────────
interface InventoryTableProps {
  data: InventoryItem[];
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}

export default function InventoryTable({ data, sorting = [], onSortingChange }: InventoryTableProps) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange,
    manualSorting: true, // We will sort externally to simulate server sorting
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse min-w-[960px]">
        {/* Sticky Header */}
        <thead className="sticky top-0 z-10 bg-slate-50 border-b border-border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className={cn(
                      "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap first:pl-5 last:pr-5 group transition-colors",
                      canSort ? "cursor-pointer hover:bg-slate-100/50" : "",
                      isSorted ? "text-foreground" : "text-muted-foreground"
                    )}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="flex items-center gap-1.5 select-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      
                      {canSort && (
                        <div className="flex items-center justify-center w-3 h-3">
                          {isSorted === "asc" ? (
                            <ArrowUp size={11} strokeWidth={2.5} className="text-orange-500" />
                          ) : isSorted === "desc" ? (
                            <ArrowDown size={11} strokeWidth={2.5} className="text-orange-500" />
                          ) : (
                            <ArrowUpDown
                              size={11}
                              strokeWidth={2}
                              className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-border bg-card">
          {table.getRowModel().rows.length === 0 ? (
            <EmptyState />
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group hover:bg-slate-50/80 transition-colors duration-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3.5 align-middle first:pl-5 last:pr-5"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
