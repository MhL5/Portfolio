"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/registry/hooks/useMediaQuery/useMediaQuery";
import {
  createContext,
  use,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type DrawerDialogContextType = {
  isMobile: boolean | undefined;
};

const DrawerDialogContext = createContext<DrawerDialogContextType | null>(null);

type DrawerDialogProviderProps = {
  children: ReactNode;
  isOpen?: ComponentProps<typeof Dialog>["open"];
  setIsOpen?: ComponentProps<typeof Dialog>["onOpenChange"];
};

function DrawerDialogProvider({
  children,
  isOpen,
  setIsOpen,
}: DrawerDialogProviderProps) {
  const isMobile = useIsMobile();

  return (
    <DrawerDialogContext value={{ isMobile }}>
      {isMobile ? (
        <Drawer
          // autoFocus={open} fixes block aria hidden attribute accessibility bug
          // repositionInputs={true} prevents safari keyboard layout shift on dismissal
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          {children}
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {children}
        </Dialog>
      )}
    </DrawerDialogContext>
  );
}

function useDrawerDialogContext() {
  const context = use(DrawerDialogContext);
  if (!context)
    throw new Error(
      "useDrawerDialogContext must be used within a DrawerDialogProvider",
    );
  return context;
}

type DrawerDialogProps = DrawerDialogProviderProps;

function DrawerDialog(props: DrawerDialogProps) {
  return <DrawerDialogProvider {...props} />;
}

type DrawerDialogContentProps = ComponentPropsWithoutRef<typeof DialogContent>;

function DrawerDialogContent(props: DrawerDialogContentProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerContent data-slot="drawer-dialog-content" {...props} />;
  return <DialogContent data-slot="dialog-dialog-content" {...props} />;
}

type DrawerDialogTriggerProps = ComponentPropsWithoutRef<typeof DialogTrigger>;

function DrawerDialogTrigger({ onClick, ...props }: DrawerDialogTriggerProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return (
      <DrawerTrigger
        data-slot="drawer-dialog-trigger"
        onClick={(e) => {
          e.currentTarget.blur(); // another fix for block aria hidden attribute accessibility bug
          onClick?.(e);
        }}
        {...props}
      />
    );

  return (
    <DialogTrigger
      data-slot="dialog-dialog-trigger"
      onClick={onClick}
      {...props}
    />
  );
}

type DrawerDialogCloseProps = ComponentPropsWithoutRef<typeof DialogClose>;

function DrawerDialogClose(props: DrawerDialogCloseProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerClose data-slot="drawer-dialog-close" {...props} />;
  return <DialogClose data-slot="dialog-dialog-close" {...props} />;
}

type DrawerDialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogDescription
>;

function DrawerDialogDescription(props: DrawerDialogDescriptionProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return (
      <DrawerDescription data-slot="drawer-dialog-description" {...props} />
    );
  return <DialogDescription data-slot="dialog-dialog-description" {...props} />;
}

type DrawerDialogTitleProps = ComponentPropsWithoutRef<typeof DialogTitle>;

function DrawerDialogTitle(props: DrawerDialogTitleProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerTitle data-slot="drawer-dialog-title" {...props} />;
  return <DialogTitle data-slot="dialog-dialog-title" {...props} />;
}

type DrawerDialogFooterProps = ComponentPropsWithoutRef<typeof DialogFooter>;

function DrawerDialogFooter(props: DrawerDialogFooterProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerFooter data-slot="drawer-dialog-footer" {...props} />;
  return <DialogFooter data-slot="dialog-dialog-footer" {...props} />;
}

type DrawerDialogHeaderProps = ComponentPropsWithoutRef<typeof DialogHeader>;

function DrawerDialogHeader(props: DrawerDialogHeaderProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerHeader data-slot="drawer-dialog-header" {...props} />;
  return <DialogHeader data-slot="dialog-dialog-header" {...props} />;
}

type DrawerDialogOverlayProps = ComponentPropsWithoutRef<typeof DialogOverlay>;

function DrawerDialogOverlay(props: DrawerDialogOverlayProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerOverlay data-slot="drawer-dialog-overlay" {...props} />;
  return <DialogOverlay data-slot="dialog-dialog-overlay" {...props} />;
}

type DrawerDialogPortalProps = ComponentPropsWithoutRef<typeof DialogPortal>;

function DrawerDialogPortal(props: DrawerDialogPortalProps) {
  const { isMobile } = useDrawerDialogContext();

  if (isMobile)
    return <DrawerPortal data-slot="drawer-dialog-portal" {...props} />;
  return <DialogPortal data-slot="dialog-dialog-portal" {...props} />;
}

type DrawerDialogScrollAreaProps = ComponentPropsWithoutRef<"div">;

const drawerContentScrollAreaClassNames =
  "max-h-[90dvh] overflow-y-auto p-0 sm:max-w-[80dvw]";
const dialogContentScrollAreaClassNames =
  "max-h-[90dvh] w-[auto] overflow-y-auto p-0 sm:max-w-[80dvw]";

function DrawerDialogScrollArea({
  className,
  ...props
}: DrawerDialogScrollAreaProps) {
  const { isMobile } = useDrawerDialogContext();

  return (
    <div
      data-slot="drawer-dialog-scroll-area"
      className={cn(
        isMobile
          ? drawerContentScrollAreaClassNames
          : dialogContentScrollAreaClassNames,
        className,
      )}
      {...props}
    />
  );
}

export {
  DrawerDialog,
  DrawerDialogClose,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogFooter,
  DrawerDialogHeader,
  DrawerDialogOverlay,
  DrawerDialogPortal,
  DrawerDialogScrollArea,
  DrawerDialogTitle,
  DrawerDialogTrigger,
};
