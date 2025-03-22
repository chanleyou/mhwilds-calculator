"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "@/utils";

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

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
        "bg-primary text-background z-50 rounded-xs px-2 py-1 text-xs shadow-md",
        className,
      )}
      {...props}
    />
  );
};

TooltipContent.displayName = TooltipPrimitive.Content.displayName;
