"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type SearchableLayoutProps<T> = {
  title: string;
  description: string;
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
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          {props.title}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          {props.description}
        </p>
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
}: SearchableLayoutProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allCategories = ["All", ...Array.from(new Set(categories))];

  const filteredItems = useMemo(() => {
    return items.filter((item, index) =>
      filter(item, searchQuery, selectedCategory, index),
    );
  }, [items, filter, searchQuery, selectedCategory]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${title}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background focus:ring-ring w-full rounded-lg border py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
          />
        </div>

        {allCategories?.length > 1 ? (
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

      {/*  Grid */}
      <section className="min-h-[50svh]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-xl font-semibold">
            All {title}
            <span className="text-muted-foreground ml-2 text-sm font-normal">
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
            <Monitor className="text-muted-foreground/50 mb-4 h-12 w-12" />
            <h3 className="text-foreground mb-2 text-lg font-medium">
              No items found
            </h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search query or selected category to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
