import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Buffs, FieldBuffs, HuntingHornBuffs, WeaponBuffs } from "@/data";
import { useBuild, useComputed } from "@/store/builder";
import { Button, Card, Checkbox, Notice, SkillSelect } from ".";

export const BuffsCard = () => {
  const { w: w, otherBuffs, setOtherBuff } = useBuild();
  const { buffs } = useComputed();

  const [hideBuffs, setHideBuffs] = useState(false);

  const showBuffsNotice = useMemo(() => {
    if ((!!buffs.Antivirus || !!buffs["Black Eclipse II"]) && !buffs.Frenzy) {
      return true;
    }
    return false;
  }, [buffs]);

  const showWeaponSection = useMemo(() => {
    if (!Object.values(WeaponBuffs).some((b) => b.weapons?.includes(w.type)))
      return false;
    if (!hideBuffs) return true;
    return Object.keys(otherBuffs).some((k) => WeaponBuffs[k]);
  }, [hideBuffs, otherBuffs, w.type]);

  const showItemsSection = useMemo(() => {
    if (!hideBuffs) return true;
    return Object.keys(otherBuffs).some((k) => FieldBuffs[k]);
  }, [hideBuffs, otherBuffs]);

  const showHornBelowSection = useMemo(() => {
    if (w.type === "Hunting Horn") return false;
    if (!hideBuffs) return true;
    return Object.keys(otherBuffs).some((k) => HuntingHornBuffs[k]);
  }, [hideBuffs, otherBuffs, w.type]);

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
            {hideBuffs ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <Notice
        closable
        variant="warning"
        className={!showBuffsNotice ? "hidden" : undefined}
      >
        {"Tick 'Overcame Frenzy' to enable related skills."}
      </Notice>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-4 gap-y-0">
          {Object.entries(Buffs).map(([k, b]) => {
            if (hideBuffs && !otherBuffs[k]) return undefined;
            return (
              <Checkbox
                key={k}
                label={b.name}
                value={otherBuffs[k] === b.levels[0]}
                onChangeValue={(checked) =>
                  setOtherBuff(k, checked ? b.levels[0] : undefined)
                }
              />
            );
          })}
        </div>
        {showWeaponSection && (
          <div className="flex flex-col gap-2">
            <h2>{w.type}</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {w.coatings && (
                <SkillSelect
                  skill={WeaponBuffs.BowCoating}
                  value={otherBuffs["BowCoating"]}
                  placeholder={"Coating"}
                  disabledOptions={WeaponBuffs.BowCoating.levels.filter((l) => {
                    return !w.coatings!.some((c) => c === l.name);
                  })}
                  onChangeValue={(buff) => setOtherBuff("BowCoating", buff)}
                />
              )}
              {Object.entries(WeaponBuffs)
                .filter(([k]) => {
                  return k !== "SwitchAxePhial" && k !== "BowCoating"; // TODO: remove all this
                })
                .map(([k, s]) => {
                  if (!s.weapons?.includes(w.type)) return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      skill={s}
                      value={otherBuffs[k]}
                      placeholder={s.name}
                      onChangeValue={(buff) => setOtherBuff(k, buff)}
                    />
                  );
                })}
              {w.type === "Hunting Horn" &&
                Object.entries(HuntingHornBuffs).map(([k, b]) => {
                  if (hideBuffs && !otherBuffs[k]) return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      value={otherBuffs[k]}
                      skill={b}
                      placeholder={b.name}
                      onChangeValue={(buff) => setOtherBuff(k, buff)}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {showItemsSection && (
          <div className="flex flex-col gap-2">
            <h2>Consumables</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(FieldBuffs).map(([k, s]) => {
                if (hideBuffs && !otherBuffs[k]) return undefined;
                return (
                  <SkillSelect
                    key={k}
                    value={otherBuffs[k]}
                    skill={s}
                    placeholder={s.name}
                    onChangeValue={(buff) => setOtherBuff(k, buff)}
                  />
                );
              })}
            </div>
          </div>
        )}
        {showHornBelowSection && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2>Hunting Horn</h2>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.entries(HuntingHornBuffs).map(([k, b]) => {
                  if (hideBuffs && !otherBuffs[k]) return undefined;
                  return (
                    <SkillSelect
                      key={k}
                      value={otherBuffs[k]}
                      skill={b}
                      placeholder={b.name}
                      onChangeValue={(buff) => setOtherBuff(k, buff)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
