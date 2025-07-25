"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import ResponsiveAlertDialog from "@/components/blocks/responsive-dialog/ResponsiveAlertDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import { Info, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

type DataTableSimpleColumnActionsProps = {
  label: string;

  pageHref?: string;
  editPageHref?: string;

  disabled: boolean;

  deleteOptions?: {
    onDelete: () => void;
    openAlterDialog: boolean;
    setOpenAlertDialog: Dispatch<SetStateAction<boolean>>;
  };

  additionalActions?: ActionItemProps[];
};

export default function DataTableSimpleColumnActions({
  disabled,
  deleteOptions,
  additionalActions,
  pageHref,
  editPageHref,
  label,
}: DataTableSimpleColumnActionsProps) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only"> باز کردن منو </span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="space-y-1 rounded-[.5rem]">
          <DropdownMenuLabel className="sr-only">اعمال</DropdownMenuLabel>
          {pageHref && (
            <>
              <ActionItem
                label={label}
                icon={<Info className="size-3.5" />}
                href={pageHref}
                disabled={disabled}
              />
            </>
          )}

          {editPageHref && (
            <ActionItem
              label="ویرایش"
              icon={<Pencil className="size-3.5" />}
              href={editPageHref}
              disabled={disabled}
            />
          )}

          {additionalActions?.map((action, i) => (
            <ActionItem key={`${action.label}-${i}`} {...action} />
          ))}

          {deleteOptions && (
            <ActionItem
              label="حذف"
              icon={<Trash2 className="size-3.5" />}
              onClick={() => deleteOptions.setOpenAlertDialog((s) => !s)}
              disabled={disabled}
              className="text-destructive"
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteOptions && (
        <ResponsiveAlertDialog
          open={deleteOptions.openAlterDialog}
          onOpenChange={deleteOptions.setOpenAlertDialog}
          title="حذف"
          description={`از پاک کردن ${label} مطمئن هستید؟`}
          onClick={deleteOptions.onDelete}
          trigger={null}
          disabled={disabled}
        />
      )}
    </>
  );
}

const ActionItemContent = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <>
    {icon}
    <span>{label}</span>
  </>
);

type ActionItemProps = (
  | {
      href: string;
    }
  | {
      href?: never;

      onClick?: () => void;
    }
) & {
  className?: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
};
function ActionItem(props: ActionItemProps) {
  const baseClassName =
    "flex min-w-36 cursor-pointer items-center justify-start gap-2.5 text-xs p-2 ml-1";

  const { icon, label, className, disabled } = props;

  if (typeof props?.href === "string") {
    return (
      <DropdownMenuItem disabled={disabled} className={baseClassName} asChild>
        <LinkButton
          href={props.href}
          variant="none"
          className={cn(
            "flex w-full cursor-pointer items-center justify-start gap-2.5 text-xs",
            className,
          )}
        >
          <ActionItemContent icon={icon} label={label} />
        </LinkButton>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      disabled={disabled}
      className={baseClassName}
      onClick={props.onClick}
      asChild
    >
      <Button
        variant="none"
        size="sm"
        className={cn(
          "flex h-8 w-full cursor-pointer items-center justify-start gap-2.5 text-xs",
          className,
        )}
      >
        <ActionItemContent icon={icon} label={label} />
      </Button>
    </DropdownMenuItem>
  );
}
