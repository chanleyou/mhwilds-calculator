import { cn } from "@/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("bg-content flex flex-col gap-2 rounded-lg p-4", className)}
    >
      {children}
    </div>
  );
}
