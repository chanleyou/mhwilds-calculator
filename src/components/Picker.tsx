import { cn } from "@/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
}

export const Picker = ({
  children = "\u00a0",
  label,
  className,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "border-divider hover:bg-content-alt disabled:bg-content-alt/30 flex h-7.5 flex-1 cursor-pointer justify-between rounded-sm border p-2 py-1 pr-1 pl-2 text-left text-sm disabled:pointer-events-none disabled:border-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
