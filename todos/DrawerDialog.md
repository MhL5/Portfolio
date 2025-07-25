# drawer dialog

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils/cn";
import { Close as DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ReactNode } from "react";

type DrawerDialogProps = {
  trigger: ReactNode;
  content: ReactNode;
  accessibility: { srOnlyTitle: string; srOnlyDescription: string };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  drawerDialogContentClassName?: string;
  contentWrapperClassName?: string;
  dialogBreakpoint?: number;
};

/**
 * same as ResponsiveDialog
 * its duplicated for writing new styles without breaking old components that uses ResponsiveDialog
 */
export default function DrawerDialog({
  content,
  trigger,
  onOpenChange,
  open,
  drawerDialogContentClassName,
  contentWrapperClassName,
  dialogBreakpoint = 768,
}: DrawerDialogProps) {
  const isMobile = useIsMobile(dialogBreakpoint);

  // drawer
  if (isMobile)
    return (
      <Drawer
        open={open}
        // fixes block aria hidden attribute accessibility bug
        autoFocus={open}
        // repositionInputs={false} prevents safari keyboard layout shift on dismissal
        repositionInputs={false}
        onOpenChange={onOpenChange}
      >
        <DrawerTrigger
          onClick={(e) => {
            // another fix for block aria hidden attribute accessibility bug
            e.currentTarget.blur();
          }}
          asChild
        >
          {trigger}
        </DrawerTrigger>

        <DrawerContent
          disableDrawerLine
          className={cn("overflow-hidden", drawerDialogContentClassName)}
        >
          <div className="bg-muted mx-auto mb-1.5 mt-4 h-1 w-[32px] rounded-full" />
          <div
            className={cn(
              "p-4.5 max-h-[90dvh] overflow-y-auto",
              contentWrapperClassName,
            )}
          >
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );

  // dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        // prevents closing the dialog on click outside
        onPointerDownOutside={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className={cn(
          "w-[auto] max-w-[80dvw] overflow-hidden p-0",
          drawerDialogContentClassName,
        )}
      >
        <DialogClose className="ring-offset-background focus:ring-ring border-stroke-2-sg focus:ring-offset bg-background focus:outline-hidden absolute left-4 top-4 flex size-10 items-center justify-center rounded-full border transition-opacity hover:cursor-pointer hover:opacity-100 focus:ring disabled:pointer-events-none">
          <X className="stroke-foreground stroke-3 size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <div
          className={cn(
            "max-h-[90dvh] overflow-y-auto p-4",
            contentWrapperClassName,
          )}
        >
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Accessibility({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">{description}</DialogDescription>
    </>
  );
}
```
