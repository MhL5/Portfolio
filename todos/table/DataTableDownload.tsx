"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import DownloadButton from "../buttons/DownloadButton";

type DataTableDownloadProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  fileName: string;
};

export default function DataTableDownload({
  data,
  fileName,
}: DataTableDownloadProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-sm border-dashed px-3"
        >
          <Download className="size-4" />
          <span className="mr-1">دریافت</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <DownloadButton
            data={data}
            format="csv"
            fileName={fileName}
            buttonVariant="ghost"
            className="w-full cursor-pointer justify-start text-sm"
          >
            فایل csv
          </DownloadButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DownloadButton
            data={data}
            format="json"
            fileName={fileName}
            buttonVariant="ghost"
            className="w-full cursor-pointer justify-start text-sm"
          >
            فایل json
          </DownloadButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
