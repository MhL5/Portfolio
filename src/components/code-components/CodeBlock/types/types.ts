import type { ComponentPropsWithoutRef } from "react";
import type { BundledLanguage } from "shiki";

export type CodeBlockProps = {
  lang?: BundledLanguage;
} & ComponentPropsWithoutRef<"code">;
