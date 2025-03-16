import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "cva";
import { cn } from "@/utils";

const button = cva({
  base: "disabled:pointer-events inline-flex cursor-pointer items-center justify-center gap-1 rounded-sm text-sm hover:opacity-75",
  variants: {
    variant: {
      primary: "bg-accent text-background",
      secondary: "bg-divider text-white",
      text: "bg-inherit text-white hover:opacity-50",
    },
    size: {
      md: "px-4 py-2",
      sm: "px-3 py-1.5",
      icon: "p-1",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = ({
  children,
  className,
  asChild,
  variant,
  size,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
