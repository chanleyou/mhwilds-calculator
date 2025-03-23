import { cn } from "@/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  suffix?: string;
}

export function NumberDisplay({
  label,
  value,
  suffix,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "border-divider text-primary flex justify-between gap-2 border-b py-1 text-sm last:border-0",
        className,
      )}
      {...props}
    >
      <p>{label}</p>
      <p>
        {value}
        {suffix}
      </p>
    </div>
  );
}
