# DownloadButton

````tsx
"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { ReactNode } from "react";

type DownloadButtonProps = (
  | {
      format: "csv";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any[];
    }
  | {
      format: "json";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
    }
  | {
      format: "pdf";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetcher: () => Promise<any>;
    }
) & {
  withIcon?: boolean;
  fileName: string;
  children: ReactNode;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 *
 * @example
 * ```tsx
 * <DownloadButton
 *   data={tasks}
 *   fileName={title}
 *   format="csv"
 * >
 *   دریافت وظایف
 * </DownloadButton>
 *
 * <DownloadButton
 *   data={tasks}
 *   fileName={title}
 *   format="json"
 * >
 *   Download as JSON
 * </DownloadButton>
 * ```
 */
export default function DownloadButton({
  fileName,
  children,
  buttonVariant,
  onClick,
  withIcon = true,
  className,
  blob,
  ...props
}: DownloadButtonProps) {
  async function handleClick() {
    try {
      let content: string | undefined;
      let mimeType: string;
      let extension: string;

      switch (props.format) {
        case "pdf":
          const [error, pdfContent] = await props.fetcher();
          if (error) return toast.error("خطایی رخ داده است");
          content = pdfContent;
          mimeType = "application/pdf;charset=utf-8;";
          extension = "pdf";
          break;

        case "csv":
          content = jsonToCsv({ data: props.data });
          mimeType = "text/csv;charset=utf-8;";
          extension = "csv";
          break;

        case "json":
          content = JSON.stringify(props.data, null, 2);
          mimeType = "application/json;charset=utf-8;";
          extension = "json";
          break;

        default:
          return toast.error("فرمت ناشناخته است");
      }

      if (!content) return;

      // Create a Blob with the content
      const blob = new Blob([content], { type: mimeType });

      // Create a download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${fileName.replaceAll(" ", "-")}.${extension}`,
      );
      link.style.visibility = "hidden";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      discordLog({
        title: "DownloadButton",
        description: `\`\`\`tsx\n${JSON.stringify(error, null, 2)}\n\`\`\``,
        variant: "error",
      });
      toast.error("خطایی رخ داده است");
    }
  }

  return (
    <Button
      size="sm"
      className={className}
      variant={buttonVariant ?? "outline"}
      onClick={(e) => {
        handleClick();
        onClick?.(e);
      }}
    >
      {withIcon ? <Download /> : null}
      {children}
    </Button>
  );
}
````
