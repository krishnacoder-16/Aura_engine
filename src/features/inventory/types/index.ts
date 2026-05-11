// ─── Inventory Domain Types ──────────────────────────────────────────────────

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "discontinued";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderPoint: number;
  price: number;
  cost: number;
  status: StockStatus;
  supplier: string;
  warehouse: string;
  lastUpdated: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface InventoryFilters {
  search: string;
  category: string;
  status: StockStatus | "";
}
