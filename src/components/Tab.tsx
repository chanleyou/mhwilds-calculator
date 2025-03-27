import { cn } from "@/utils";
import { Button } from ".";

export function Tab<T>({
  value,
  options,
  labelFn = (o) => String(o),
  setValue,
}: {
  options: [T, T];
  value: T;
  labelFn?: (option: T) => string;
  setValue: (option: T) => void;
}) {
  return (
    <div>
      {options.map((o) => (
        <Button
          // variant="text"
          size="sm"
          onClick={() => setValue(o)}
          key={labelFn(o)}
          className={cn(
            "border-accent w-fit flex-1 overflow-visible rounded-none px-4 text-sm first:rounded-l last:rounded-r",
            value === o
              ? "bg-accent text-background"
              : "bg-background text-accent/60",
          )}
        >
          {labelFn(o)}
        </Button>
      ))}
    </div>
  );
}
