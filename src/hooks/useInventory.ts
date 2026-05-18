import { useState, useEffect } from "react";
import { InventoryItem } from "@/features/inventory/types";

interface UseInventoryProps {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
  warehouse?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  maxStock?: number | null;
  sortId?: string;
  sortDesc?: boolean;
}

interface InventoryResponse {
  data: InventoryItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export function useInventory(params: UseInventoryProps) {
  const [data, setData] = useState<InventoryResponse>({
    data: [],
    total: 0,
    page: params.page,
    totalPages: 0,
    limit: params.limit,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const query = new URLSearchParams();
        
        query.append("page", params.page.toString());
        query.append("limit", params.limit.toString());
        
        if (params.search) query.append("search", params.search);
        if (params.category) query.append("category", params.category);
        if (params.status) query.append("status", params.status);
        if (params.warehouse) query.append("warehouse", params.warehouse);
        if (params.minPrice !== null && params.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
        if (params.maxPrice !== null && params.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());
        if (params.maxStock !== null && params.maxStock !== undefined) query.append("maxStock", params.maxStock.toString());
        
        if (params.sortId) query.append("sortId", params.sortId);
        if (params.sortDesc !== undefined) query.append("sortDesc", params.sortDesc.toString());

        const res = await fetch(`/api/inventory?${query.toString()}`);
        if (!res.ok) {
          throw new Error("Failed to fetch inventory");
        }
        
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [
    params.page,
    params.limit,
    params.search,
    params.category,
    params.status,
    params.warehouse,
    params.minPrice,
    params.maxPrice,
    params.maxStock,
    params.sortId,
    params.sortDesc
  ]);

  return { ...data, isLoading, error };
}
