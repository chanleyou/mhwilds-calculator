import { FileTerminalIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Attacks from "@/data/attacks";
import { useCalcs, useGetters, useModel } from "@/store";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export function StatsDialog() {
  const {
    weapon,
    attack,
    affinity,
    element,
    sharpness,
    buffs,
    frenzy,
    rawHzv,
    eleHzv,
    isWound,
  } = useModel();
  const getters = useGetters();
  const { calcEffectiveRaw, calcEffectiveEle } = useCalcs();

  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    return JSON.stringify(
      {
        input: {
          weapon,
          attack,
          affinity,
          element,
          sharpness,
          buffs,
          frenzy,
          rawHzv,
          eleHzv,
          isWound,
        },
        computed: {
          ...getters,
          effectiveRaw: calcEffectiveRaw(),
          effectiveEle: calcEffectiveEle(),
        },
        attacks: Attacks[weapon],
      },
      null,
      2,
    );
  }, [
    weapon,
    attack,
    affinity,
    element,
    sharpness,
    buffs,
    frenzy,
    rawHzv,
    eleHzv,
    isWound,
    getters,
    calcEffectiveRaw,
    calcEffectiveEle,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="text" size="icon">
          <FileTerminalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card>
          <div className="flex items-center justify-between">
            <DialogTitle asChild>
              <h1>Inspect</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <textarea
            disabled
            className="bg-content-alt text-secondary p-2 font-mono text-sm"
            value={stats}
            rows={30}
          />
        </Card>
      </DialogContent>
    </Dialog>
  );
}
