import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Buffs,
  CombinedBuffs,
  FieldBuffs,
  HuntingHornBuffs,
  SliderBuffs,
  WeaponBuffs,
} from "@/data";
import { useBuild, useComputed } from "@/store/builder";
import { Button, Card, Checkbox, Notice, SkillSelect, Slider } from ".";

export const BuffsCard = () => {
  const { otherBuffs, setOtherBuff, uptime, setUptime } = useBuild();
  const { weapon: w, buffs, skillPoints } = useComputed();

  const [hideBuffs, setHideBuffs] = useState(false);

  const showBuffsNotice = useMemo(() => {
    if (
      (!!buffs.Antivirus || !!buffs["Black Eclipse II"]) &&
      uptime.Frenzy === 0
    ) {
      return true;
    }
    return false;
  }, [buffs, uptime.Frenzy]);

  const showWeaponSection = useMemo(() => {
    if (!Object.values(WeaponBuffs).some((b) => b.weapons?.includes(w.type)))
      return false;
    if (!hideBuffs) return true;
    return Object.keys(otherBuffs).some((k) => WeaponBuffs[k]);
  }, [hideBuffs, otherBuffs, w.type]);

  const showUptimeSection = useMemo(() => {
    if (skillPoints["Slicked Blade"] > 0) return true;
    return false;
    // return Object.keys(SliderBuffs).some((k) => uptime[k] && uptime[k] > 0);
  }, [skillPoints]);

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
        {"Frenzy controls Antivirus and Black Eclipse II's bonus Attack."}
      </Notice>
      <div className="flex flex-wrap gap-x-4 gap-y-0">
        {Object.entries(Buffs).map(([k, b]) => {
          if (hideBuffs && !otherBuffs[k]) return undefined;
          if (k === "Frenzy") return undefined;
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
      {(!hideBuffs || uptime.Frenzy > 0) && (
        <div className="flex flex-col">
          <label className="text-sm">Frenzy</label>
          <div className="flex items-center justify-between gap-2">
            <Slider
              defaultValue={[uptime["Frenzy"] ?? 0]}
              max={100}
              step={1}
              onValueChange={(v) => {
                if (v[0] > 0) {
                  setOtherBuff("Frenzy", CombinedBuffs.Frenzy.levels[0]);
                } else {
                  setOtherBuff("Frenzy", undefined);
                }
                setUptime("Frenzy", v[0]);
              }}
            />
            <div className="text-sm">{uptime["Frenzy"] ?? 100}%</div>
          </div>
        </div>
      )}
      {showUptimeSection && (
        <>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(SliderBuffs).map(([k, s]) => {
              return (
                // <NumberInputTwo
                //   key={k}
                //   label={s.name}
                //   value={uptime[k] ?? 0}
                //   onChangeValue={(v) => setUptime(k, v)}
                //   min={0}
                //   max={100}
                //   step={10}
                // />
                <div key={k} className="flex flex-col">
                  <label className="text-sm">{s.name}</label>
                  <div className="flex items-center justify-between gap-2">
                    <Slider
                      value={[uptime[k] ?? 0]}
                      max={100}
                      step={1}
                      onValueChange={(v) => {
                        if (v[0] > 0) {
                          setOtherBuff(k, CombinedBuffs[k].levels[0]);
                        } else {
                          setOtherBuff(k, undefined);
                        }
                        setUptime(k, v[0]);
                      }}
                    />
                    <div className="text-sm">{uptime[k] ?? 0}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {showWeaponSection && (
        <>
          <h2>{w.type}</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {Object.entries(WeaponBuffs).map(([k, s]) => {
              if (!s.weapons?.includes(w.type)) return undefined;
              return (
                <SkillSelect
                  key={k}
                  skill={s}
                  value={otherBuffs[k]}
                  placeholder={s.name}
                  onChangeValue={(buff) => setOtherBuff(k, buff)}
                  disabledOptions={
                    k === "BowCoating"
                      ? WeaponBuffs.BowCoating.levels.filter((l) => {
                          if (!w.coatings) return false;
                          return !w.coatings.some((c) => c === l.name);
                        })
                      : undefined
                  }
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
        </>
      )}
      {showItemsSection && (
        <>
          <h2>Consumables</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
        </>
      )}
      {showHornBelowSection && (
        <>
          <h2>Hunting Horn</h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
        </>
      )}
    </Card>
  );
};
