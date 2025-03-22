"use client";

import { produce } from "immer";
import { ChevronDown, ChevronUp, TimerResetIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  BuffsCard,
  Button,
  Card,
  Checkbox,
  ExportDialog,
  ImportDialog,
  Notice,
  NumberDisplay,
  NumberInput,
  Select,
  SkillSelect,
  SnapshotMovesTable,
  StatsCard,
  WeaponCard,
} from "@/components";
import { MovesTable } from "@/components/MovesTable";
import { ArmorSkills, GroupSkills, WeaponSkills } from "@/data/skills";
import { round } from "@/model";
import { useCalcs, useModel } from "@/store";
import { Attack, SnapshotAttack } from "@/types";

const ComboModeOptions = ["Dynamic", "Snapshot"] as const;
type ComboModeOption = (typeof ComboModeOptions)[number];

export default function Home() {
  const {
    weapon,
    buffs,
    rawHzv,
    eleHzv,
    isWound,
    setBuff,
    setRawHzv,
    setEleHzv,
    setIsWound,
  } = useModel();
  const { calcAverage, calcHit, calcCrit } = useCalcs();

  const [hideSkills, setHideSkills] = useState(false);
  const [dynamicCombo, setDynamicCombo] = useState<Attack[]>([]);
  const [snapshotCombo, setSnapshotCombo] = useState<SnapshotAttack[]>([]);
  const [comboMode, setComboMode] = useState<ComboModeOption>("Dynamic");

  const notice = useMemo(() => {
    if (weapon === "Switch Axe") {
      return "Element Phial Explosion damage is scuffed right now. Still figuring things out.";
    }
  }, [weapon]);

  const comboModeDescription = useMemo(() => {
    if (comboMode === "Snapshot") {
      return "Captures the damage of an attack when it is added.";
    }
    return "Re-calculates damage of all attacks when inputs change.";
  }, [comboMode]);

  const totalDamage = useMemo(() => {
    if (comboMode === "Snapshot") {
      return snapshotCombo.reduce((acc, a) => acc + a.avg, 0);
    }
    return dynamicCombo.reduce((acc, a) => acc + calcAverage(a), 0);
  }, [comboMode, dynamicCombo, snapshotCombo, calcAverage]);

  const totalHits = useMemo(() => {
    if (comboMode === "Snapshot") return snapshotCombo.length;
    return dynamicCombo.length;
  }, [comboMode, dynamicCombo, snapshotCombo]);

  const addAttack = (a: Attack) => {
    if (comboMode === "Snapshot") {
      setSnapshotCombo(
        produce(
          (d) =>
            void d.push({
              name: a.name ?? "",
              hit: calcHit(a),
              crit: calcCrit(a),
              avg: calcAverage(a),
              cantCrit: a.cantCrit,
            }),
        ),
      );
    } else {
      setDynamicCombo(produce((d) => void d.push(a)));
    }
  };

  const removeAttack = (i: number) => {
    if (comboMode === "Snapshot") {
      setSnapshotCombo(produce((d) => void d.splice(i, 1)));
    } else {
      setDynamicCombo(produce((d) => void d.splice(i, 1)));
    }
  };

  useEffect(() => {
    setDynamicCombo([]);
    setSnapshotCombo([]);
  }, [comboMode, weapon]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <ImportDialog />
        <ExportDialog />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex flex-2 flex-col gap-2">
          <WeaponCard />
          <Card>
            <div>
              <div className="flex justify-between">
                <div>
                  <h1>Skills</h1>
                </div>
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => setHideSkills((c) => !c)}
                >
                  {hideSkills ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              {!hideSkills && (
                <h3>
                  {
                    "Tick 'Overcame Frenzy' to enable related skills. Weakness Exploit activates on HZV ≥ 45 and Wound. Convert Element only buffs Dragon."
                  }
                </h3>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs">Weapon</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(WeaponSkills).map(([k, s]) => {
                  if (hideSkills && !buffs[k]) return undefined;
                  if (s.weapons && !s.weapons.includes(weapon))
                    return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      skill={s}
                      value={buffs[k]}
                      onChangeValue={(buff) => setBuff(k, buff)}
                    />
                  );
                })}
              </div>
              <p className="text-xs">Armor</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(ArmorSkills).map(([k, s]) => {
                  if (hideSkills && !buffs[k]) return undefined;
                  if (s.weapons && !s.weapons.includes(weapon))
                    return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      skill={s}
                      value={buffs[k]}
                      onChangeValue={(buff) => setBuff(k, buff)}
                    />
                  );
                })}
              </div>
              <p className="text-xs">Set</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(GroupSkills).map(([k, s]) => {
                  if (hideSkills && !buffs[k]) return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      skill={s}
                      value={buffs[k]}
                      onChangeValue={(buff) => setBuff(k, buff)}
                    />
                  );
                })}
              </div>
            </div>
          </Card>
          <BuffsCard />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <StatsCard />
          <Card>
            <h1>Damage</h1>
            <div className="flex place-items-center">
              <Checkbox
                label="Wound"
                value={isWound}
                onChangeValue={setIsWound}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <NumberInput
                label="Hitzone (Raw)"
                value={rawHzv}
                onChangeValue={setRawHzv}
              />
              <NumberInput
                label="Hitzone (Element)"
                value={eleHzv}
                onChangeValue={setEleHzv}
              />
            </div>
            {notice && <Notice>{notice}</Notice>}
            <MovesTable onClick={addAttack} />
          </Card>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Card>
            <div>
              <h1>Combo</h1>
              <h3>Click on attacks to add or remove them from your combo.</h3>
            </div>
            <Select
              label="Mode"
              value={comboMode}
              options={[...ComboModeOptions]}
              onChangeValue={setComboMode}
              description={comboModeDescription}
            />
            <div>
              <NumberDisplay
                label="Total Average"
                value={round(totalDamage, 2)}
              />
              <NumberDisplay label="Total Hits" value={totalHits} />
            </div>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                className="text-secondary"
                onClick={() => {
                  if (comboMode === "Snapshot") setSnapshotCombo([]);
                  else setDynamicCombo([]);
                }}
              >
                <TimerResetIcon className="h-4 w-4" />
                Reset
              </Button>
            </div>
            {comboMode === "Dynamic" ? (
              <MovesTable
                custom={dynamicCombo}
                onClick={(_, i) => removeAttack(i)}
                hideHits
              />
            ) : (
              <SnapshotMovesTable
                moves={snapshotCombo}
                onClick={(_, i) => removeAttack(i)}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
