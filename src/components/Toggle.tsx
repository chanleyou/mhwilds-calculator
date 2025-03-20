import { cn } from "@/utils";
import { Button } from "./Button";

interface ToggleProps<T> {
  options: [T, T];
  value: T;
  onClick: (option: T) => void;
  labelFn?: (option: T) => string;
}

export const Toggle = <T extends string>({
  value,
  options,
  onClick,
  labelFn = (n) => String(n),
}: ToggleProps<T>) => {
  return (
    <div className="border-accent mr-auto inline-block border p-0.5">
      {options.map((o) => (
        <Button
          key={o}
          variant="text"
          size="sm"
          className={cn(
            "border-none",
            o === value
              ? "bg-accent text-background rounded-none"
              : "text-accent border-none",
          )}
          onClick={() => onClick(o)}
        >
          {labelFn(o)}
        </Button>
      ))}
    </div>
  );
};
