import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setSelectedStructure: (structure: PlotStructureType) => void;
  openDetails: () => void;
  closeDetails: () => void;
  reset: () => void;
  canContinue: () => boolean;
}

const initialState = {
  selectedStructure: null,
  isDetailsOpen: false,
};

export const usePlotStructureStore = create<PlotStructureState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSelectedStructure: (structure) => {
        set({ selectedStructure: structure });
      },

      openDetails: () => {
        set({ isDetailsOpen: true });
      },

      closeDetails: () => {
        set({ isDetailsOpen: false });
      },

      reset: () => {
        set(initialState);
      },

      canContinue: () => {
        const state = get();
        return state.selectedStructure !== null;
      },
    }),
    {
      name: 'plot-structure-storage',
    }
  )
); 