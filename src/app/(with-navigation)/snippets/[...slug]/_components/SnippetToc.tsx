"use client";

import { Bug, Lightbulb, NotebookPen } from "lucide-react";
import { usePathname } from "next/navigation";
import { GITHUB_REPO_URL } from "@/constants";
import { cn } from "@/lib/utils";

const contributeLinks = [
  {
    title: "Report an issue",
    href: (pathname: string) =>
      `${GITHUB_REPO_URL}/issues/new?title=[BUG]: ${pathname}&labels=bug`,
    icon: Bug,
  },
  {
    title: "Request a feature",
    href: (pathname: string) =>
      `${GITHUB_REPO_URL}/issues/new?title=[FEAT]: ${pathname}&labels=enhancement`,
    icon: Lightbulb,
  },
  {
    title: "Edit this page",
    href: (pathname: string) =>
      `${GITHUB_REPO_URL}/edit/main/contents/${pathname}.mdx`,
    icon: NotebookPen,
  },
] as const;

type SnippetTocProps = {
  className?: string;
  tocDepth?: number;
  toc: { title: string; id: string; depth: number }[];
};

export default function SnippetToc({ className, toc }: SnippetTocProps) {
  const pathname = usePathname();

  if (toc.length <= 1) return null;
  return (
    <div
      className={cn(
        "sticky top-18 flex flex-col gap-2 p-4 pt-0 text-sm",
        className,
      )}
    >
      <h3 className="h-6 text-muted-foreground text-xs">On This Page</h3>

      {toc.map((item, index) => (
        <a
          key={`${item.id}-${index}-${item.title}`}
          href={`#${item.id}`}
          className="text-muted-foreground text-xs no-underline transition-all hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[depth=5]:pl-8 data-[depth=6]:pl-10 data-[active=true]:font-semibold data-[active=true]:text-foreground"
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}

      <h3 className="mt-6 h-6 text-muted-foreground text-xs">Contribute</h3>
      {contributeLinks.map(({ href, title, icon: Icon }, index) => (
        <a
          key={`${href}-${index}-${title}`}
          href={href(pathname)}
          target="_blank"
          className="text-muted-foreground text-xs no-underline transition-all hover:text-foreground"
        >
          <Icon className="mr-2 inline-block size-4" />
          {title}
        </a>
      ))}
    </div>
  );
}
