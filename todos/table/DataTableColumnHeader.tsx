import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  sortLabels?: [string, string];
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  sortLabels,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>;

  const isSorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -mr-3 h-8 text-xs"
          >
            <span>{title}</span>
            {isSorted === "desc" ? (
              <ArrowUp className="size-3" />
            ) : isSorted === "asc" ? (
              <ArrowDown className="size-3" />
            ) : (
              <ChevronsUpDown className="size-3" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32">
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowUp className="text-muted-foreground/70 size-3 ltr:mr-1 rtl:ml-1" />
            {sortLabels?.[1] ?? "نزولی"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowDown className="text-muted-foreground/70 size-3 ltr:mr-1 rtl:ml-1" />
            {sortLabels?.[0] ?? "صعودی"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="text-muted-foreground/70 size-3 ltr:mr-1 rtl:ml-1" />
            پنهان
          </DropdownMenuItem>
          {!isSorted ? null : (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.clearSorting()}>
                <X className="text-muted-foreground/70 size-3 ltr:mr-1 rtl:ml-1" />
                بازنشانی
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
