import ComponentSource from "@/features/MDX-remote/components/ComponentSource";
import type { ComponentProps } from "react";

export default function MdxCode({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  if (className?.startsWith("language-")) {
    // If it's a code block
    const lang = className.replace("language-", ""); // Extract the

    return (
      <ComponentSource
        code={typeof children === "string" ? children : ""}
        lang={lang}
      />
    );
  }

  return (
    <code
      {...props}
      className="rounded-sm bg-secondary px-1.5 py-0.5 tracking-wide text-nowrap text-secondary-foreground before:content-none after:content-none prose-code:after:content-none"
    >
      {typeof children === "string" ? children.replaceAll("`", "") : children}
    </code>
  );
}
