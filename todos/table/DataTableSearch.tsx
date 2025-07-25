"use client";

import DebouncedTextInput from "@/components/blocks/inputs/DebouncedTextInput";
import type { DataTableProps } from "@/components/blocks/table/DataTable";
import { cn } from "@/utils/cn";
import type { Table } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export type DataTableSearchProps<TData> = DataTableProps<
  TData,
  unknown
>["search"] & { table: Table<TData> };

export default function DataTableSearch<TData>(
  props: DataTableSearchProps<TData>,
) {
  const { isSearching, inputPlaceHolder = "جستجو ..." } = props;

  if (props.manualSearch)
    return (
      <Container>
        <DebouncedTextInput
          delay={700}
          className="h-full w-full"
          placeholder={inputPlaceHolder}
          onDebouncedChange={props.onDebouncedChange}
        />
        {isSearching && <Loader />}
      </Container>
    );

  const { table, searchColumn } = props;

  return (
    <Container>
      {searchColumn && typeof searchColumn === "string" ? (
        <DebouncedTextInput
          delay={300}
          placeholder={inputPlaceHolder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onDebouncedChange={(value) =>
            table.getColumn(searchColumn)?.setFilterValue(value)
          }
          className="h-full w-full"
        />
      ) : null}
      {isSearching && <Loader />}
    </Container>
  );
}

function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("relative h-8 w-full sm:max-w-sm", className)}
      {...props}
    />
  );
}

function Loader() {
  return (
    <Loader2 className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 animate-spin" />
  );
}
