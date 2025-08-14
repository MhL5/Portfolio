import { fileReader } from "@/actions/fileReader";
import CopyButton from "@/components/blocks/buttons/CopyButton";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { codeToHtml } from "shiki";

export default async function ComponentSource({
  path,
  lang = "tsx",
  className,
  ...props
}: {
  path: string;
  lang?: string;
  className?: string;
} & ComponentPropsWithoutRef<"code">) {
  const code = await fileReader(path);
  const codeHTML = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <pre className="not-prose relative max-w-full">
      <CopyButton content={code} className="absolute top-3 right-3" />

      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
