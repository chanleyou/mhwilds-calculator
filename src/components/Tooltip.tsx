"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "src/utils";

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
        "bg-neutral-gray animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md px-4 py-1.5 text-sm text-white shadow-md",
        className,
      )}
      {...props}
    />
  );
};

TooltipContent.displayName = TooltipPrimitive.Content.displayName;
