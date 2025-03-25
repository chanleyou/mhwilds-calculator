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
    <div className="bg-accent flex gap-1 rounded p-0.5">
      {options.map((o) => (
        <Button
          variant="text"
          size="sm"
          onClick={() => setValue(o)}
          key={labelFn(o)}
          className={cn(
            "text-bold flex-1 px-2 py-0.5 text-base",
            value === o
              ? "bg-content rounded text-white"
              : "text-primary border-0 bg-inherit",
          )}
        >
          {labelFn(o)}
        </Button>
      ))}
    </div>
  );
}
