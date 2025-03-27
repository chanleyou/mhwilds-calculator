import { CrosshairIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Monsters } from "@/data/monsters";
import { useBuild } from "@/store/builder";
import { cn } from "@/utils";
import {
  Button,
  Card,
  Select,
  Table,
  TableCell,
  TableHeadRow,
  TableRow,
} from ".";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";

export const HitzoneDialog = () => {
  const { setTarget } = useBuild();

  const [open, setOpen] = useState(false);
  const [monster, setMonster] = useState<keyof typeof Monsters>("Arkveld");

  const rowCn = cn(
    "border-content-alt flex flex-row justify-between gap-3 border-b p-2 [&:nth-last-child(-n+2)]:border-0",
  );

  const cellCn = cn("b text-right first:w-full first:text-left");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="text-error">
          <CrosshairIcon className="size-4" />
          Hitzones
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="sm: h-dvh w-[100vw] sm:h-fit sm:w-2xl sm:max-w-[95vw]">
          <div className="flex items-start justify-between p-2">
            <DialogTitle asChild>
              <h1>Select Monster</h1>
            </DialogTitle>
            <Button variant="text" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <Select
            options={[...Object.keys(Monsters)]}
            value={monster}
            onChangeValue={setMonster}
          />

          <div className="grid gap-1 overflow-y-auto pr-3 text-sm sm:hidden">
            {Object.entries(Monsters[monster]).map(([name, target]) => {
              const { wound, ...hitzones } = target;
              return (
                <div
                  className="border-divider hover:bg-content-alt grid cursor-pointer grid-cols-2 gap-y-1 rounded border p-3"
                  key={name}
                  onClick={() => {
                    setTarget(target);
                    setOpen(false);
                  }}
                >
                  <div className={cn(rowCn, "col-span-2 grid grid-cols-2")}>
                    <div className="flex-1">{name}</div>
                  </div>
                  {/* {wound && (
                    <div className={rowCn}>
                      <div className="text-tertiary flex-1">Wound</div>
                      <div className="flex-2">
                        {target.wound && <CheckIcon className="size-4" />}
                      </div>
                    </div>
                  )} */}
                  {Object.entries(hitzones).map(([k, v]) => (
                    <div className={rowCn} key={k}>
                      <div className="text-tertiary flex-1">{k}</div>
                      <div className="flex-1">{v}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="hidden overflow-auto pr-3 sm:block">
            <Table>
              <thead>
                <TableHeadRow>
                  <TableCell className={cellCn}>Name</TableCell>
                  <TableCell className={cellCn}>Slash</TableCell>
                  <TableCell className={cellCn}>Blunt</TableCell>
                  <TableCell className={cellCn}>Shot</TableCell>
                  <TableCell className={cellCn}>Fire</TableCell>
                  <TableCell className={cellCn}>Water</TableCell>
                  <TableCell className={cellCn}>Thunder</TableCell>
                  <TableCell className={cellCn}>Ice</TableCell>
                  <TableCell className={cellCn}>Dragon</TableCell>
                </TableHeadRow>
              </thead>
              <tbody>
                {Object.entries(Monsters[monster]).map(([name, target]) => {
                  const { wound, ...hitzones } = target;
                  return (
                    <TableRow
                      key={name}
                      onClick={() => {
                        setTarget(target);
                        setOpen(false);
                      }}
                    >
                      <TableCell className={cellCn}>{name}</TableCell>
                      {Object.entries(hitzones).map(([k, v]) => (
                        <TableCell className={cellCn} key={k}>
                          {v}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
