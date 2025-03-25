import { produce } from "immer";
import _ from "lodash";
import { create } from "zustand";
import { round } from "@/model";
import {
  Attack,
  ComboModeOption,
  DynamicAttack,
  SnapshotAttack,
} from "@/types";
import { useComputed } from "./builder";

type InitialStore = {
  mode: ComboModeOption;
  dynamic: DynamicAttack[];
  snapshot: SnapshotAttack[];
};

const initialStore: InitialStore = {
  mode: "Dynamic",
  dynamic: [],
  snapshot: [],
};

type Store = InitialStore & {
  setComboMode: (mode: ComboModeOption) => void;
  addDynamic: (attack: Attack) => void;
  removeDynamic: (index: number) => void;
  addSnapshot: (attack: Omit<SnapshotAttack, "count">) => void;
  removeSnapshot: (index: number) => void;
  reset: () => void;
};

export const useCombo = create<Store>((set) => ({
  ...initialStore,
  setComboMode: (mode) => set({ mode }),
  addDynamic: (attack) =>
    set(
      produce<Store>((d) => {
        const last = d.dynamic[d.dynamic.length - 1];
        if (!last) {
          d.dynamic.push({ ...attack, count: 1 });
        } else if (last.name === attack.name) {
          last.count += 1;
        } else {
          d.dynamic.push({ ...attack, count: 1 });
        }
      }),
    ),
  removeDynamic: (i) => {
    set(
      produce<Store>((d) => {
        if (!d.dynamic[i]) return;
        if (d.dynamic[i].count === 1) d.dynamic.splice(i, 1);
        else d.dynamic[i].count -= 1;
      }),
    );
  },
  addSnapshot: (a) =>
    set(
      produce<Store>((d) => {
        if (d.snapshot.length === 0) {
          d.snapshot.push({ ...a, count: 1 });
          return;
        }
        const last = d.snapshot[d.snapshot.length - 1];
        const { count, ...rest } = last;
        if (_.isEqual(rest, a)) {
          last.count += 1;
        } else {
          d.snapshot.push({ ...a, count: 1 });
        }
      }),
    ),
  removeSnapshot: (i) => {
    set(
      produce<Store>((d) => {
        if (!d.snapshot[i]) return;
        if (d.snapshot[i].count === 1) d.snapshot.splice(i, 1);
        else d.snapshot[i].count -= 1;
      }),
    );
  },
  reset: () => {
    set({ dynamic: [], snapshot: [] });
  },
}));

export const useAddAttack = () => {
  const store = useCombo();
  const { calcHit, calcCrit, calcAverage } = useComputed();

  const addAttack = (attack: Attack) => {
    if (store.mode === "Dynamic") {
      store.addDynamic(attack);
    } else {
      const hit = calcHit(attack);
      const crit = calcCrit(attack);
      const avg = calcAverage(attack);
      store.addSnapshot({ ...attack, hit, crit, avg });
    }
  };

  return addAttack;
};

export const useTotalHits = (): number => {
  const store = useCombo();
  return store.mode === "Dynamic"
    ? store.dynamic.reduce((acc, { count }) => acc + count, 0)
    : store.snapshot.reduce((acc, { count }) => acc + count, 0);
};

export const useTotalDamage = () => {
  const { calcAverage } = useComputed();
  const { mode, dynamic, snapshot } = useCombo();
  return round(
    mode === "Dynamic"
      ? dynamic.reduce((acc, { count, ...a }) => {
          return acc + calcAverage(a) * count;
        }, 0)
      : snapshot.reduce((acc, a) => acc + a.avg * a.count, 0),
    2,
  );
};
