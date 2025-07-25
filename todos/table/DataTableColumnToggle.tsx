"use client";

import { type Table } from "@tanstack/react-table";
import { Check, Settings2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dictionary } from "@/features/dictionary/dictionary";
import { cn } from "@/utils/cn";

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

/**
 * A component for toggling the visibility of table columns.
 *
 * @example
 * <DataTableViewOptions table={tableInstance} />
 */
export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("");
  const hiddenColumns = table
    .getAllColumns()
    .filter((column) => !column.getIsVisible());

  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  const filteredColumns = columns.filter((column) => {
    const label = dictionary[column.id as keyof typeof dictionary] || column.id;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-sm border-dashed px-3"
        >
          <Settings2 className="size-3.5" />
          نمایش
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0" align="start">
        <Command>
          <CommandInput
            placeholder="جستجو در ستون‌ها..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>ستونی یافت نشد</CommandEmpty>
            <CommandGroup>
              {filteredColumns.map((column) => {
                const label =
                  dictionary[column.id as keyof typeof dictionary] || column.id;
                const isSelected = column.getIsVisible();

                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                  >
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-[0.4rem] border p-2",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "[&_svg]:invisible",
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="capitalize">{label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {hiddenColumns.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      table.getAllColumns().forEach((column) => {
                        if (column.getCanHide()) {
                          column.toggleVisibility(true);
                        }
                      });
                    }}
                    className="justify-center text-center"
                  >
                    بازنشانی ستون‌ها
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
