import { useState, useCallback } from 'react';

export interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Adjust current page if it goes out of bounds due to totalItems or pageSize changes
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when size changes
  }, []);

  return {
    currentPage,
    pageSize,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
  };
}
