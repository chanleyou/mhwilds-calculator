import { cn } from "@/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export type InputContainerProps = Pick<Props, "label" | "description">;

export function InputContainer({
  label,
  description,
  className,
  children,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={label} className="text-primary pl-0.5 text-xs">
          {label}
        </label>
      )}
      {children}
      {description && <p className="pl-0.5 text-xs">{description}</p>}
    </div>
  );
}
