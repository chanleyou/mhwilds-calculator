import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBuild } from "@/builder";
import { Buffs, FieldBuffs, HuntingHornBuffs } from "@/data";
import { Buff } from "@/types";
import { Button, Card, Checkbox, NumberInput, SkillSelect } from ".";

export const BuffsCard = () => {
  const { otherBuffs: buffs, setOtherBuff: setOtherBuff } = useBuild();

  const [miscAttack, setMiscAttack] = useState(0);
  const [miscAttackMul, setMiscAttackMul] = useState(0);
  const [miscElement, setMiscElement] = useState(0);
  const [miscElementMul, setMiscElementMul] = useState(0);
  const [miscAffinity, setMiscAffinity] = useState(0);

  // TODO: refactor
  const miscBuff: Buff = useMemo(() => {
    return {
      name: "Miscellaneous",
      attack: miscAttack,
      element: miscElement,
      elementMul: 1 + miscElementMul / 100,
      attackMul: 1 + miscAttackMul / 100,
      affinity: miscAffinity,
    };
  }, [miscAttack, miscAttackMul, miscAffinity, miscElement, miscElementMul]);

  useEffect(() => {
    setOtherBuff("Miscellaneous", miscBuff);
  }, [miscBuff, setOtherBuff]);

  const [hideBuffs, setHideBuffs] = useState(false);
  return (
    <Card>
      <div>
        <div className="flex justify-between">
          <h1>Buffs</h1>
          <Button
            variant="text"
            size="icon"
            onClick={() => setHideBuffs((c) => !c)}
          >
            {hideBuffs ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {!hideBuffs && (
          <h3>{"Tick 'Overcame Frenzy' to enable related skills."}</h3>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0">
        {Object.entries(Buffs).map(([k, b]) => {
          if (hideBuffs && !buffs[k]) return undefined;
          return (
            <Checkbox
              key={k}
              label={b.name}
              value={buffs[k] === b.levels[0]}
              onChangeValue={(checked) =>
                setOtherBuff(k, checked ? b.levels[0] : undefined)
              }
            />
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(FieldBuffs).map(([k, s]) => {
          if (hideBuffs && !buffs[k]) return undefined;
          return (
            <SkillSelect
              key={k}
              value={buffs[k]}
              skill={s}
              label={s.name}
              placeholder=""
              onChangeValue={(buff) => setOtherBuff(k, buff)}
            />
          );
        })}
        {(!hideBuffs || miscAttack !== 0) && (
          <NumberInput
            label="Attack (Flat)"
            value={miscAttack}
            onChangeValue={setMiscAttack}
          />
        )}
        {(!hideBuffs || miscAttackMul !== 0) && (
          <NumberInput
            label="Attack (%)"
            value={miscAttackMul}
            onChangeValue={setMiscAttackMul}
          />
        )}
        {(!hideBuffs || miscElement !== 0) && (
          <NumberInput
            label="Element (Flat)"
            value={miscElement}
            onChangeValue={setMiscElement}
          />
        )}
        {(!hideBuffs || miscElementMul !== 0) && (
          <NumberInput
            label="Element (%)"
            value={miscElementMul}
            onChangeValue={setMiscElementMul}
          />
        )}
        {(!hideBuffs || miscAffinity !== 0) && (
          <NumberInput
            label="Affinity (%)"
            value={miscAffinity}
            onChangeValue={setMiscAffinity}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xs">Hunting Horn</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(HuntingHornBuffs).map(([k, b]) => {
            if (hideBuffs && !buffs[k]) return undefined;
            return (
              <SkillSelect
                key={k}
                value={buffs[k]}
                skill={b}
                placeholder={b.name}
                onChangeValue={(buff) => setOtherBuff(k, buff)}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};
