"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { InventoryItem } from "@/features/inventory/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Package2 } from "lucide-react";

// ─── Column definitions ────────────────────────────────────────────────────
const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ getValue }) => (
      <span className="font-mono text-[12px] font-semibold text-slate-500 tracking-wide">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ getValue }) => (
      <span className="text-[13px] font-medium text-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => (
      <span className="text-[12px] text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
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
    cell: ({ getValue }) => (
      <span className="text-[13px] font-semibold text-foreground tabular-nums">
        ${getValue<number>().toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue<InventoryItem["status"]>()} />,
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ getValue }) => (
      <span className="text-[12px] text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-600">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
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

// ─── Sortable Header Cell ──────────────────────────────────────────────────
function SortableHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 group/header">
      {label}
      <ArrowUpDown
        size={11}
        strokeWidth={2}
        className="text-muted-foreground/40 group-hover/header:text-muted-foreground transition-colors"
      />
    </span>
  );
}

// ─── Main Table Component ──────────────────────────────────────────────────
interface InventoryTableProps {
  data: InventoryItem[];
}

export default function InventoryTable({ data }: InventoryTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse min-w-[960px]">
        {/* Sticky Header */}
        <thead className="sticky top-0 z-10 bg-slate-50 border-b border-border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground whitespace-nowrap first:pl-5 last:pr-5"
                >
                  <SortableHeader
                    label={
                      header.isPlaceholder
                        ? ""
                        : flexRender(header.column.columnDef.header, header.getContext()) as string
                    }
                  />
                </th>
              ))}
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
