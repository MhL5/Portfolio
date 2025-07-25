"use client";

import { DataTableViewOptions } from "@/components/blocks/table/DataTableColumnToggle";
import DataTableDownload from "@/components/blocks/table/DataTableDownload";
import {
  DataTableFacetedFilter,
  DataTableFacetedFilterManual,
} from "@/components/blocks/table/DataTableFacetedFilter";
import { DataTablePagination } from "@/components/blocks/table/DataTablePagination";
import DataTableSearch from "@/components/blocks/table/DataTableSearch";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { type Dispatch, type SetStateAction, useState } from "react";

export type DataTableProps<TData, TValue> = {
  onTableRowClick?: (row: TData) => void;
  /** Array of column definitions for the table */
  columns: ColumnDef<TData, TValue>[];
  /** Array of data to be displayed in the table */
  data: TData[];
  /** Configuration for optional faceted filter */
  facetedFilter?: (
    | {
        manualFilter: false;
        /** Column key to apply the filter */
        column: keyof TData | string;
      }
    | {
        manualFilter: true;
        facetedFilter: { value: string; label: string }[];
        setFacetedFilter: Dispatch<
          SetStateAction<{ value: string; label: string }[]>
        >;
      }
  ) & {
    title: string;
    options: { value: string; label: string }[];
    isLoading?: boolean;
  };
  /** File name for the download */
  downloadOptions?: {
    fileName?: string;
  };
  /** Pagination options */
  pagination?:
    | {
        manualPagination: true;
        paginationState: PaginationState;
        setPaginationState: Dispatch<SetStateAction<PaginationState>>;
        rowCount: number;
        isLoading?: boolean;
      }
    | {
        manualPagination: false;
      };

  search: (
    | {
        manualSearch: true;
        onDebouncedChange: (value: string) => void;
      }
    | {
        manualSearch: false;
        searchColumn?: keyof TData | string;
      }
  ) & {
    inputPlaceHolder?: string;
    isSearching?: boolean;
  };
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  onTableRowClick,
  search,
  facetedFilter,
  downloadOptions,
  pagination = { manualPagination: false },
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    ...(pagination.manualPagination
      ? {
          rowCount: pagination.rowCount,
        }
      : {}),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      ...(pagination.manualPagination
        ? {
            pagination: pagination.paginationState,
          }
        : {}),
    },
    ...(pagination.manualPagination
      ? {
          manualPagination: pagination.manualPagination,
          onPaginationChange: pagination.setPaginationState,
        }
      : {}),
  });

  return (
    <div className="p-1">
      <header className="flex flex-wrap items-center justify-start gap-3 py-4">
        <DataTableSearch table={table} {...search} />

        <DataTableViewOptions table={table} />

        {facetedFilter && (
          <>
            {facetedFilter.manualFilter === false ? (
              typeof facetedFilter.column === "string" &&
              table.getColumn(facetedFilter.column) && (
                <DataTableFacetedFilter
                  column={table.getColumn(facetedFilter.column)}
                  title={facetedFilter.title}
                  options={facetedFilter.options}
                />
              )
            ) : (
              <DataTableFacetedFilterManual
                title={facetedFilter.title}
                options={facetedFilter.options}
                facetedFilter={facetedFilter.facetedFilter}
                setFacetedFilter={facetedFilter.setFacetedFilter}
              />
            )}
          </>
        )}

        <DataTableDownload
          data={data}
          fileName={`${downloadOptions?.fileName || crypto.randomUUID()})}`}
        />
      </header>
      <ScrollArea className="rounded-sm border pb-2">
        <ScrollBar orientation="horizontal" />
        <Table className="text-xs">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => {
                  return (
                    <TableHead
                      className={`${i === 0 ? "ltr:pl-3 rtl:pr-3" : ""} text-start`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onTableRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  چیزی پیدا نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <footer className="mt-5">
        <DataTablePagination table={table} />
      </footer>
    </div>
  );
}
