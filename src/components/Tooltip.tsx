"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils";

interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {
  ref?: React.RefObject<HTMLDivElement>;
}

export const TooltipContent = ({
  ref,
  sideOffset,
  className,
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bg-background text-primary border-divider z-50 rounded border p-2 text-sm shadow-md",
        className,
      )}
      {...props}
    />
  );
};

TooltipContent.displayName = TooltipPrimitive.Content.displayName;
