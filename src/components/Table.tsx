import { cn } from "@/utils";

export const Table = ({
  children,
  className,
  ...props
}: React.ComponentProps<"table">) => {
  return (
    <table
      className={cn(
        "text-secondary w-full table-auto border-collapse text-left text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </table>
  );
};

export const TableHeadRow = ({
  className,
  children,
  ...props
}: React.ComponentProps<"tr">) => {
  return (
    <tr
      className={cn("border-tertiary border-b font-medium", className)}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableRow = ({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={cn(
        onClick &&
          "hover:bg-content-alt border-content-alt cursor-pointer border-b last:border-none",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({
  className,
  children,
  small,
  ...props
}: React.ComponentProps<"td"> & { small?: boolean }) => {
  return (
    <td className={cn("py-2", small ? "px-1" : "px-2", className)} {...props}>
      {children}
    </td>
  );
};
