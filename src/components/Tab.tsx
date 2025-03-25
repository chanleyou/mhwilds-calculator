import { cn } from "@/utils";
import { Button } from ".";

export const Tab = ({
  selected,
  options,
  onClick,
}: {
  selected: string;
  options: string[];
  onClick: (option: string) => void;
}) => {
  return (
    <div className="bg-content flex gap-1 rounded p-1.5">
      {options.map((o) => (
        <Button
          variant="text"
          size="sm"
          onClick={() => onClick(o)}
          key={o}
          className={cn(
            "text-bold flex-1 text-base",
            selected === o
              ? "bg-accent text-background rounded"
              : "text-tertiary border-0 bg-inherit",
          )}
        >
          {o}
        </Button>
      ))}
    </div>
  );
};
