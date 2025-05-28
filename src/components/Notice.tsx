import { type VariantProps, cva } from "cva";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils";
import { Button } from "./ui/Button";

const notice = cva({
  base: "flex items-center gap-2 rounded border p-2 text-sm",
  variants: {
    variant: {
      info: "text-info",
      success: "text-success",
      error: "text-error",
      warning: "text-accent",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type NoticeVariants = VariantProps<typeof notice>;

export type NoticeProps = NoticeVariants & {
  children: React.ReactNode;
  className?: string;
  closable?: boolean;
};

export function Notice({
  children,
  variant = "info",
  className,
  closable,
}: NoticeProps) {
  const [open, setOpen] = useState(true);

  if (!open) return;

  return (
    <div className={cn(notice({ variant }), className)}>
      {variant === "info" && <InfoIcon className="size-4" />}
      {variant === "success" && <CircleCheckIcon className="size-4" />}
      {(variant === "error" || variant === "warning") && (
        <TriangleAlertIcon className="size-4" />
      )}
      <div className="flex-1">{children}</div>
      {closable && (
        <Button variant="text" size="icon" onClick={() => setOpen(false)}>
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}
