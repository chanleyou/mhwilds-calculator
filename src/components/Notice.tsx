import { type VariantProps, cva } from "cva";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { cn } from "@/utils";

const notice = cva({
  base: "flex flex-row items-center gap-2 rounded border p-2 text-sm",
  variants: {
    variant: {
      info: "text-info",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
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
};

export function Notice({ children, variant = "info", className }: NoticeProps) {
  return (
    <div className={cn(notice({ variant }), className)}>
      {variant === "info" && <InfoIcon className="h-5 w-5" />}
      {variant === "success" && <CircleCheckIcon className="h-5 w-5" />}
      {(variant === "error" || variant === "warning") && (
        <TriangleAlertIcon className="h-5 w-5" />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
