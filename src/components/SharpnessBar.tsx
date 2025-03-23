import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { memo, useId } from "react";
import { Sharpnesses } from "@/data";
import { WeaponSharpness } from "@/types";
import { cn } from "@/utils";
import { TooltipContent } from "./Tooltip";

type Props = {
  sharpness: WeaponSharpness;
  small?: boolean;
};

const SharpnessBarComponent = ({ sharpness, small }: Props) => {
  const id = useId();
  return (
    <div className={small ? "" : "mb-1 py-1"}>
      <div className={cn("flex", small && "w-fit bg-gray-300 p-1 dark:p-0")}>
        {sharpness.map((v, i) => {
          if (v === 0) return;
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "group relative inline-block h-3",
                    small && "h-2.5",
                  )}
                  key={`${id}-${i}`}
                  style={{
                    width: `${small ? v / 5 : v / 2}px`,
                    backgroundColor: Sharpnesses[i],
                  }}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                {Sharpnesses[i]}: {v}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export const SharpnessBar = memo(SharpnessBarComponent);
