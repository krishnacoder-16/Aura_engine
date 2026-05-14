import { useState, useCallback } from 'react';
import { InventoryFilters } from '@/features/inventory/types';

export const defaultFilters: InventoryFilters = {
  search: "",
  category: "",
  status: "",
  warehouse: "",
  maxStock: null,
  minPrice: null,
  maxPrice: null,
};

export function useFilters(initialFilters = defaultFilters) {
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);

  const updateFilter = useCallback(<K extends keyof InventoryFilters>(key: K, value: InventoryFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = 
    filters.search !== "" || 
    filters.category !== "" || 
    filters.status !== "" || 
    filters.warehouse !== "" || 
    filters.maxStock !== null || 
    filters.minPrice !== null || 
    filters.maxPrice !== null;

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}
