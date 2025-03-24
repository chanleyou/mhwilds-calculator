import { BowgunAmmoLevels } from "@/types";
import { cn } from "@/utils";

type Props = {
  ammo: BowgunAmmoLevels;
  className?: string;
};

export const BowgunAmmoDisplay = ({ ammo, className }: Props) => {
  return (
    <div className={cn(className)}>
      {Object.entries(ammo ?? {}).map(([k, v]) => (
        <div key={k}>
          {k} {v.levels[0]}
          {v.levels.length > 1 && "+"} {v.rapidFire && "▲"}
        </div>
      ))}
    </div>
  );
};
