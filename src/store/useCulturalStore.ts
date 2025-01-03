import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CulturalState {
  // Cultural Data
  selectedElements: string[];
  
  // State Management
  isDirty: boolean;

  // Actions
  toggleElement: (elementId: string) => void;
  setSelectedElements: (elements: string[]) => void;
  resetCultural: () => void;
  markClean: () => void;
}

const initialState = {
  selectedElements: [],
  isDirty: false,
};

export const useCulturalStore = create<CulturalState>()(
  persist(
    (set, get) => ({
      ...initialState,

      toggleElement: (elementId) =>
        set((state) => ({
          selectedElements: state.selectedElements.includes(elementId)
            ? state.selectedElements.filter(id => id !== elementId)
            : [...state.selectedElements, elementId],
          isDirty: true,
        })),

      setSelectedElements: (elements) =>
        set({
          selectedElements: elements,
          isDirty: true,
        }),

      markClean: () => set({ isDirty: false }),

      resetCultural: () => set(initialState),
    }),
    {
      name: 'novel-cultural-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 