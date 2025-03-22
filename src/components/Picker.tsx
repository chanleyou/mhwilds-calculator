import { cn } from "@/utils";
import { InputContainer } from "./InputContainer";

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
    <InputContainer label={label}>
      <button
        type="button"
        className={cn(
          "border-divider hover:bg-content-alt disabled:bg-disabled flex-1 cursor-pointer rounded-sm border px-2 py-1 text-left text-sm disabled:pointer-events-none disabled:border-none",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </InputContainer>
  );
};
