import type { ComponentProps } from "react";

import Code from "./Code";
import ComponentSource from "./ComponentSource";

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
    <Code {...props} className={className}>
      {children}
    </Code>
  );
}
