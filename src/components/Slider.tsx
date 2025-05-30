"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { SkillName } from "@/types";
import { cn } from "@/utils";
import { TooltipContent } from ".";

type SliderProps = SliderPrimitive.SliderProps & {
  skill?: SkillName;
  ref?: React.Ref<HTMLDivElement>;
  tooltip?: string;
};

export const Slider = ({
  className,
  ref,
  value,
  tooltip,
  // onValueChange,
  ...props
}: SliderProps) => {
  return (
    <Tooltip>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          className,
        )}
        value={value}
        {...props}
      >
        <SliderPrimitive.Track className="bg-divider relative h-1 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-secondary absolute h-full" />
        </SliderPrimitive.Track>
        <TooltipTrigger asChild>
          <SliderPrimitive.Thumb className="bg-primary ring-offset-background focus:bg-accent block size-4 rounded-full focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        </TooltipTrigger>
      </SliderPrimitive.Root>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
};
