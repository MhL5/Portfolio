"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useCopyToClipboard from "@/registry/hooks/useCopyToClipboard/useCopyToClipboard";
import { CheckIcon, ClipboardIcon, XIcon } from "lucide-react";
import type { ComponentProps } from "react";

type CopyButtonProps = {
  content: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
} & ButtonProps;

export default function CopyButton({
  content,
  className,
  side = "left",
  ...props
}: CopyButtonProps) {
  const { handleCopy, copyState } = useCopyToClipboard(content);

  return (
    <Tooltip open={copyState !== "idle"}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleCopy}
          variant="ghost"
          className={cn("text-muted-foreground size-8", className)}
          {...props}
        >
          {copyState === "copied" ? (
            <CheckIcon className="text-success-foreground" />
          ) : copyState === "error" ? (
            <XIcon className="text-destructive" />
          ) : (
            <ClipboardIcon />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          "text-success-foreground bg-success-background border-success-border [&_svg]:bg-success-background [&_svg]:fill-success-background",
          copyState === "error" &&
            "text-error-foreground bg-error-background border-error-border [&_svg]:bg-error-background [&_svg]:fill-error-background",
        )}
        side={side}
      >
        {copyState === "copied" ? "Copied" : "Error"}
      </TooltipContent>
    </Tooltip>
  );
}
