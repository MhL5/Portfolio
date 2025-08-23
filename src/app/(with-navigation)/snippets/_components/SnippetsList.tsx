"use client";

import { Button } from "@/components/ui/button";
import { navigationLinks, snippetsCategoryConfig } from "@/constants/constants";
import { AutoGrid } from "@/registry/new-york/AutoGrid/AutoGrid";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import Typography from "@/registry/new-york/Typography/Typography";
import Link from "next/link";
import { useState } from "react";

export default function SnippetsList() {
  const [search, setSearch] = useState("");

  return (
    <section className="not-prose mt-8">
      <header className="mb-4 flex flex-col items-start justify-between gap-5">
        <Typography variant="h2" className="text-start">
          Snippets
        </Typography>
        <DebouncedInput
          initialValue={search}
          onDebouncedChange={setSearch}
          placeholder="Search snippets"
          delay={300}
        />
      </header>

      <AutoGrid
        uniqueId={`SnippetsList`}
        grid={{
          maxColCount: 2,
          minColSize: 10,
          gap: 3,
        }}
        className="mx-auto max-w-4xl"
      >
        {navigationLinks.map((link) => {
          const config =
            snippetsCategoryConfig[
              link.title as keyof typeof snippetsCategoryConfig
            ];
          const Icon = config?.icon;
          const filteredItems = link.items?.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          );

          if (filteredItems?.length === 0) return null;
          return (
            <div key={link.title} className="mb-8">
              <div
                className={`${config?.tailwindClass || "text-gray-600"} mb-4 flex h-10 w-full items-center justify-start gap-3 px-3 text-lg font-semibold tracking-wider capitalize`}
              >
                {Icon && <Icon className="size-5" />}
                {link.title}
              </div>
              <div className="space-y-2 pl-2">
                {filteredItems?.map((item) => (
                  <Button key={item.title} variant="ghost" asChild>
                    <Link
                      href={item.url}
                      className="h-10 w-full justify-start text-base"
                    >
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </AutoGrid>
    </section>
  );
}
