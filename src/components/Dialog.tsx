"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { cn } from "@/utils";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogTitle = DialogPrimitive.Title;

type DialogProps = DialogPrimitive.DialogContentProps & {
  ref?: React.Ref<HTMLDivElement>;
};

export const DialogContent = ({ className, ...props }: DialogProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <DialogPrimitive.Content
        className={cn("max-h-[90%] w-3xl max-w-[90%]", className)}
        {...props}
      />
    </DialogPrimitive.Overlay>
  </DialogPrimitive.Portal>
);
