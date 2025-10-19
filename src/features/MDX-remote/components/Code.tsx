import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Code({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "text-nowrap rounded-sm bg-secondary px-1.5 py-0.5 text-secondary-foreground tracking-wide before:content-none after:content-none prose-code:after:content-none",
        className,
      )}
      {...props}
    >
      {typeof children === "string" ? children.replaceAll("`", "") : children}
    </code>
  );
}
