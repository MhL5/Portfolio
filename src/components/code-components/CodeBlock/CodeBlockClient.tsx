"use client";

import { fileReaderAction } from "@/actions/fileReaderAction";
import type { CodeBlockProps } from "@/components/code-components/CodeBlock/types/types";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodeBlockSkeleton from "@/components/code-components/CodeBlock/ui/Skeleton";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type CodeBlockClientProps = {
  path: string;
} & CodeBlockProps;

export default function CodeBlockClient({
  path,
  lang = "tsx",
  className,
  ...props
}: CodeBlockClientProps) {
  const [codeHTML, setCodeHTML] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    async function getCodeHTML() {
      const code = await fileReaderAction(path);
      const codeHTML = await codeToHtml(code.trim(), {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });

      setCodeHTML(codeHTML);
      setCode(code);
    }
    getCodeHTML();
  }, [lang, path]);

  if (!codeHTML || !code) return <CodeBlockSkeleton />;

  return (
    <CodeBlockShell
      code={code}
      codeHTML={codeHTML}
      className={className}
      {...props}
    />
  );
}
