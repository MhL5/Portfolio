import LinkButton from "@/components/blocks/buttons/LinkButton";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const baseClasses =
  "fixed z-50 top-0 right-0 left-0 translate-x-0 -translate-y-full w-fit focus:m-3 transition-all duration-100 ease-in focus:translate-0";

/**
 * Skip Link
 * accessibility component for users that are navigating the website using keyboard navigation
 * @see https://www.youtube.com/watch?v=VUR0I5mqq7I
 */
export default function SkipLink({
  children,
  href = "#",
  className,
}: {
  children: ReactNode;
  href: `#${string}`;
  className?: string;
}) {
  return (
    <LinkButton href={href} className={cn(baseClasses, className)}>
      {children}
    </LinkButton>
  );
}
