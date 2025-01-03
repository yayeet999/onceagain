import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SettingType = 'contained' | 'expansive' | 'interwoven';

interface WorldSettingsState {
  settingType: SettingType | null;
  selectedSetting: string | null;
  setSettingType: (type: SettingType) => void;
  setSelectedSetting: (setting: string) => void;
  reset: () => void;
  canContinue: () => boolean;
}

const initialState = {
  settingType: null,
  selectedSetting: null,
};

export const useWorldSettingsStore = create<WorldSettingsState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSettingType: (type) => {
        set({ settingType: type, selectedSetting: null });
      },

      setSelectedSetting: (setting) => {
        set({ selectedSetting: setting });
      },

      reset: () => {
        set(initialState);
      },

      canContinue: () => {
        const state = get();
        return state.settingType !== null && state.selectedSetting !== null;
      },
    }),
    {
      name: 'world-settings-storage',
    }
  )
); 