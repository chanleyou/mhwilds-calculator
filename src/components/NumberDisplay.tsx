import { cn } from "@/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function NumberDisplay({ label, className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "border-divider text-primary flex items-center justify-between gap-2 border-b py-1.5 text-sm last:border-0 sm:py-1",
        className,
      )}
      {...props}
    >
      <p>{label}</p>
      <div className="text-regular">{children}</div>
    </div>
  );
}
