import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SettingType = 'contained' | 'expansive' | null;

// Valid setting details for each type
export const CONTAINED_SETTINGS = [
  'Architectural Complexes',
  'Close-Knit Communities',
  'Urban Microcosms',
  'Remote Sanctuaries',
  'Educational Environments',
  'Historic Establishments'
] as const;

export const EXPANSIVE_SETTINGS = [
  'Untamed Frontiers',
  'Settled Kingdoms',
  'Magical Territories',
  'Future Horizons',
  'Shifting Realms',
  'Blended Domains'
] as const;

export type ContainedSetting = typeof CONTAINED_SETTINGS[number];
export type ExpansiveSetting = typeof EXPANSIVE_SETTINGS[number];
export type SettingDetail = ContainedSetting | ExpansiveSetting | null;

interface SettingsState {
  // Settings Data
  settingType: SettingType;
  settingDetails: SettingDetail;
  
  // State Management
  isDirty: boolean;

  // Actions
  setSettingType: (type: SettingType) => void;
  setSettingDetails: (details: SettingDetail) => void;
  resetSettings: () => void;
  markClean: () => void;

  // Computed
  canContinue: () => boolean;
  isValidSelection: (type: SettingType, details: SettingDetail) => boolean;
}

const initialState = {
  settingType: null,
  settingDetails: null,
  isDirty: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSettingType: (type) =>
        set({
          settingType: type,
          // Reset details when type changes
          settingDetails: null,
          isDirty: true,
        }),

      setSettingDetails: (details) =>
        set((state) => ({
          settingDetails: details,
          isDirty: true,
        })),

      resetSettings: () => set(initialState),

      markClean: () => set({ isDirty: false }),

      canContinue: () => {
        const state = get();
        return state.isValidSelection(state.settingType, state.settingDetails);
      },

      isValidSelection: (type, details) => {
        if (!type || !details) return false;
        
        if (type === 'contained') {
          return CONTAINED_SETTINGS.includes(details as ContainedSetting);
        }
        
        if (type === 'expansive') {
          return EXPANSIVE_SETTINGS.includes(details as ExpansiveSetting);
        }
        
        return false;
      },
    }),
    {
      name: 'novel-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 