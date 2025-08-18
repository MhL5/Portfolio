"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import { Button } from "@/components/ui/button";
import {
  shadcnRegistry,
  snippetsCategoryConfig,
  type ShadcnRegistry,
} from "@/constants/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  url: string;
  isActive: boolean;
  className?: string;
  isSubItem?: boolean;
}

const NavItem = ({
  title,
  url,
  isActive,
  className,
  isSubItem,
}: NavItemProps) => (
  <Button
    asChild
    variant={isActive ? "secondary" : "ghost"}
    size={isSubItem ? "xs" : "sm"}
    className={cn("w-full justify-start transition-all", className)}
  >
    <Link href={url}>{title}</Link>
  </Button>
);

type AsideProps = {
  className?: string;
  shadcnRegistry: typeof shadcnRegistry;
};

export default function Aside({ className, shadcnRegistry }: AsideProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full", className)}>
      <nav className="no-visible-scrollbar || grid gap-6 px-3 pt-4 xl:sticky xl:top-16 xl:h-[calc(100svh-4rem)] xl:overflow-y-auto xl:px-5 xl:pb-8">
        {generateNavigationLinks(shadcnRegistry).map(
          ({ title, url, items }) => {
            const config = snippetsCategoryConfig?.[`${title}`];
            if (!config) return null;
            const Icon = config.icon;

            return (
              <div
                key={`${title}-${url}`}
                className={title === "components" ? "capitalize" : ""}
              >
                <LinkButton
                  href={url}
                  buttonProps={{
                    variant: "ghost",
                  }}
                  className={`${config.tailwindClass} || mb-2 flex w-full items-center justify-start gap-2 px-2 text-sm font-semibold tracking-wider capitalize`}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  {title}
                </LinkButton>
                <div className="space-y-1 pl-0.5">
                  {items?.map((item, i) => {
                    const isActive = pathname.includes(item.url);

                    return (
                      <div
                        key={`${item.title}-${item.url}-${i}`}
                        className="space-y-1"
                      >
                        <NavItem
                          title={item.title}
                          url={item.url}
                          isActive={isActive}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
      </nav>
    </aside>
  );
}

type Links = {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
};

function generateNavigationLinks(shadcnRegistry: ShadcnRegistry): Links[] {
  type DefaultCategorizedItems = typeof defaultCategorizedItems;
  const defaultCategorizedItems: Record<
    "utils" | "actions" | "types" | "components" | "hooks",
    Links[]
  > = {
    components: [],
    hooks: [],
    actions: [],
    utils: [],
    types: [],
  } as const;
  const categorizedItems = shadcnRegistry.items.reduce<DefaultCategorizedItems>(
    (acc, item) => {
      // Get the first file path to determine category
      const firstFilePath = item.files?.[0]?.path || "";

      let category: string = "components";

      if (firstFilePath.includes("components/")) category = "components";
      if (firstFilePath.includes("actions/")) category = "actions";
      if (firstFilePath.includes("utils/")) category = "utils";
      if (firstFilePath.includes("types/")) category = "types";
      if (firstFilePath.includes("hooks/")) category = "hooks";

      acc[category as keyof DefaultCategorizedItems].push({
        title: item.title,
        url: `/snippets/${category}/${item.name}`,
        items: [],
      });

      return acc;
    },
    defaultCategorizedItems,
  );

  return Object.entries(categorizedItems).reduce<Links[]>(
    (acc, [category, items]) => {
      if (items.length > 0)
        acc.push({
          title: category,
          url: `/snippets/${category}`,
          items: items,
        });

      return acc;
    },
    [],
  );
}
