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
        "border-divider group hover:border-primary disabled:bg-content-alt/30 flex flex-1 cursor-pointer items-center justify-between rounded-sm border py-1.5 pr-1.5 pl-2 text-left text-sm disabled:pointer-events-none disabled:border-none sm:py-1",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
