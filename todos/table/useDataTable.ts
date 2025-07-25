"use client";

import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export function useDataTable({
  pageIndex = 0,
  pageSize = 20,
  search = "",
}: {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });
  const [facetedFilter, setFacetedFilter] = useState<
    { value: string; label: string }[]
  >([]);
  const [query, setQuery] = useState(search);

  return {
    paginationState,
    setPaginationState,
    query,
    setQuery,
    facetedFilter,
    setFacetedFilter,
  };
}
