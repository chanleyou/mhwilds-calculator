import { produce } from "immer";
import { create } from "zustand";
import { round } from "@/model";
import { Attack, ComboModeOption, SnapshotAttack } from "@/types";
import { useComputed } from "./builder";

type InitialStore = {
  comboMode: ComboModeOption;
  dynamic: Attack[];
  snapshot: SnapshotAttack[];
};

const initialStore: InitialStore = {
  comboMode: "Dynamic",
  dynamic: [],
  snapshot: [],
};

type Store = InitialStore & {
  setComboMode: (comboMode: ComboModeOption) => void;
  pushDynamic: (attack: Attack) => void;
  pushSnapshot: (attack: SnapshotAttack) => void;
  removeAttack: (index: number) => void;
  reset: () => void;
};

export const useCombo = create<Store>((set, get) => ({
  ...initialStore,
  setComboMode: (comboMode) => set({ comboMode }),
  pushDynamic: (a) => set(produce((d) => void d.dynamic.push(a))),
  pushSnapshot: (a) => set(produce((d) => void d.snapshot.push(a))),
  removeAttack: (i) => {
    if (get().comboMode === "Dynamic") {
      set(produce((d) => void d.dynamic.splice(i, 1)));
    } else {
      set(produce((d) => void d.snapshot.splice(i, 1)));
    }
  },
  reset: () => {
    set({ dynamic: [], snapshot: [] });
  },
}));

export const useAddAttack = () => {
  const store = useCombo();
  const { calcHit, calcCrit, calcAverage } = useComputed();

  const addAttack = (attack: Attack) => {
    if (store.comboMode === "Dynamic") {
      store.pushDynamic(attack);
    } else {
      const hit = calcHit(attack);
      const crit = calcCrit(attack);
      const avg = calcAverage(attack);
      store.pushSnapshot({ ...attack, hit, crit, avg });
    }
  };

  return addAttack;
};

export const useTotalHits = () => {
  const store = useCombo();
  return store.comboMode === "Dynamic"
    ? store.dynamic.length
    : store.snapshot.length;
};

export const useTotalDamage = () => {
  const { calcAverage } = useComputed();
  const store = useCombo();
  return round(
    store.comboMode === "Dynamic"
      ? store.dynamic.reduce((acc, a) => acc + calcAverage(a), 0)
      : store.snapshot.reduce((acc, a) => acc + a.avg, 0),
    2,
  );
};
