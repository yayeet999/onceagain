import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PlotStructureType = 
  | 'three-act'
  | 'heros-journey'
  | 'five-act'
  | 'seven-point'
  | 'save-the-cat'
  | 'fichtean-curve'
  | 'multiple-timelines'
  | 'in-media-res';

interface PlotStructureState {
  selectedStructure: PlotStructureType | null;
  isDetailsOpen: boolean;
  isDirty: boolean;

  setSelectedStructure: (structure: PlotStructureType) => void;
  openDetails: () => void;
  closeDetails: () => void;
  canContinue: () => boolean;
  resetStore: () => void;
}

const initialState = {
  selectedStructure: null,
  isDetailsOpen: false,
  isDirty: false,
};

export const usePlotStructureStore = create<PlotStructureState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedStructure: (structure) =>
        set({
          selectedStructure: structure,
          isDirty: true,
        }),

      openDetails: () =>
        set({ isDetailsOpen: true }),

      closeDetails: () =>
        set({ isDetailsOpen: false }),

      canContinue: () => {
        const state = get();
        return !!state.selectedStructure;
      },

      resetStore: () => set(initialState),
    }),
    {
      name: 'novel-plot-structure-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 