import { create } from "zustand";

interface ManualSaveState {
  value: boolean;
  setValue: (newValue: boolean) => void;
}

const useManuallSave = create<ManualSaveState>()((set) => ({
  value: false,
  setValue: (newValue: boolean) => set({ value: newValue }),
}));

export default useManuallSave;
