"use client";

import { Monitor, Search } from "lucide-react";
import { type JSX, type ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchableLayoutProps<T> = {
  title: ReactNode;
  titleIcon?: JSX.ElementType;
  titleClassName?: string;
  description?: string;
  items: T[];
  render: (item: T, index: number) => ReactNode;
  categories?: string[];
  filter: (
    item: T,
    searchQuery: string,
    selectedCategory: string,
    index: number,
  ) => boolean;
};

export default function SearchableLayout<T>(props: SearchableLayoutProps<T>) {
  return (
    <section className="mx-auto min-h-svh max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1
          className={cn(
            "flex items-center gap-3 font-bold text-4xl text-foreground capitalize tracking-tight sm:gap-4 sm:text-5xl",
            props.titleClassName,
          )}
        >
          {props.titleIcon ? (
            <props.titleIcon className="size-8 shrink-0 sm:size-9.5" />
          ) : null}
          {props.title}
        </h1>

        {props?.description ? (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {props.description}
          </p>
        ) : null}
      </div>

      <SearchableLayoutGrid {...props} />
    </section>
  );
}

function SearchableLayoutGrid<T>({
  items,
  title,
  render,
  categories = [],
  filter,
  titleClassName,
}: SearchableLayoutProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allCategories = ["All", ...Array.from(new Set(categories))];

  const hasCategories = allCategories?.length > 1;

  const filteredItems = useMemo(() => {
    return items.filter((item, index) =>
      filter(item, searchQuery, selectedCategory, index),
    );
  }, [items, filter, searchQuery, selectedCategory]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className={cn("relative flex-1", hasCategories ? "max-w-md" : "")}>
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${title}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pr-4 pl-10 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {hasCategories ? (
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => {
              if (!category) return null;
              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>

      <section className="min-h-[50svh]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground text-xl capitalize">
            All <span className={titleClassName}>{title}</span>
            <span className="ml-2 font-normal text-muted-foreground text-sm">
              ({filteredItems.length})
            </span>
          </h2>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(render)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Monitor className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-medium text-foreground text-lg">
              No items found
            </h3>
            <p className="max-w-md text-muted-foreground">
              Try adjusting your search query or selected category to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
