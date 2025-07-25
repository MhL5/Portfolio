"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import type { ReactNode } from "react";

export default function ShareUrlButton({
  children,
  className,
  relativeUrl,
  title,
  ...props
}: {
  className?: string;
  children: ReactNode;
  relativeUrl: string;
  title: string;
} & ButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Share URL"
      className={className}
      onClick={async () => {
        try {
          navigator.share({
            url:
              `${process.env.NEXT_PUBLIC_APPLICATION_URL}${relativeUrl}` || "",
            title,
          });
        } catch {
          // fallback for old browser that doesn't support share, we can copy it into clipboard
          navigator.clipboard.writeText(`
            ${title}
            ${process.env.NEXT_PUBLIC_APPLICATION_URL}${relativeUrl}
            `);
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
