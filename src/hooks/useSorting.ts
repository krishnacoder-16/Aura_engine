import { useState, useCallback } from 'react';
import { SortingState, OnChangeFn } from '@tanstack/react-table';

export function useSorting(initialState: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(initialState);

  // We expose standard setter, but wrap it to match TanStack Table's expected OnChangeFn signature
  const onSortingChange: OnChangeFn<SortingState> = useCallback((updater) => {
    setSorting(updater);
  }, []);

  return {
    sorting,
    onSortingChange,
    setSorting,
  };
}
