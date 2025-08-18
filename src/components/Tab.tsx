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
    <div className="border-divider flex border-b">
      {options.map((o) => (
        <Button
          // variant="text"
          size="sm"
          onClick={() => setValue(o)}
          variant="secondary"
          key={labelFn(o)}
          className={cn(
            "flex-1",
            value === o
              ? "text-accent border-0 border-b-2 border-solid font-semibold"
              : "text-primary border-none",
          )}
        >
          {labelFn(o)}
        </Button>
      ))}
    </div>
  );
}
