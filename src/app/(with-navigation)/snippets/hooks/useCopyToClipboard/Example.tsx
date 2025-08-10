"use client";

import useCopyToClipboard from "@/app/(with-navigation)/snippets/hooks/useCopyToClipboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Example() {
  const { hasCopied, handleCopy } = useCopyToClipboard("Hello, world!");

  return (
    <Button
      onClick={handleCopy}
      className={cn(
        hasCopied ? "bg-green-500 text-green-100 hover:bg-green-500/90" : "",
      )}
    >
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  );
}
