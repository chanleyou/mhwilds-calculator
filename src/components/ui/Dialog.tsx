"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import React from "react";
import { cn } from "@/utils";
import { Button } from "./Button";
import { Card } from "./Card";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogTitle = DialogPrimitive.Title;

type DialogContentProps = DialogPrimitive.DialogContentProps & {
  ref?: React.Ref<HTMLDivElement>;
  title?: string;
  width?: "4xl" | "7xl";
  setOpen?: (n: boolean) => void;
};

export const DialogContent = ({
  className,
  width = "4xl",
  title,
  setOpen,
  children,
  ...props
}: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <DialogPrimitive.Content {...props}>
        <Card
          className={cn(
            "h-dvh w-[100vw] sm:h-[85dvh] sm:w-4xl sm:max-w-[95vw]",
            `sm:w-${width}`,
            className,
          )}
        >
          {(title || setOpen) && (
            <div className="flex items-start justify-between gap-2">
              <DialogTitle asChild>
                <h1>{title}</h1>
              </DialogTitle>
              {setOpen && (
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
          {children}
        </Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Overlay>
  </DialogPrimitive.Portal>
);
