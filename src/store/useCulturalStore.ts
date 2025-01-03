import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CulturalElement {
  id: string;
  type: 'tradition' | 'belief' | 'custom' | 'value';
  name: string;
  description: string;
}

interface CulturalState {
  // Cultural Data
  elements: CulturalElement[];
  worldview: string;
  socialStructure: string;
  customElements: string[];
  
  // State Management
  isDirty: boolean;

  // Actions
  addElement: (element: CulturalElement) => void;
  updateElement: (id: string, element: Partial<CulturalElement>) => void;
  removeElement: (id: string) => void;
  setWorldview: (worldview: string) => void;
  setSocialStructure: (structure: string) => void;
  addCustomElement: (element: string) => void;
  removeCustomElement: (element: string) => void;
  resetCultural: () => void;
}

const initialState = {
  elements: [],
  worldview: '',
  socialStructure: '',
  customElements: [],
  isDirty: false,
};

export const useCulturalStore = create<CulturalState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addElement: (element) =>
        set((state) => ({
          elements: [...state.elements, element],
          isDirty: true,
        })),

      updateElement: (id, updatedElement) =>
        set((state) => ({
          elements: state.elements.map((element) =>
            element.id === id
              ? { ...element, ...updatedElement }
              : element
          ),
          isDirty: true,
        })),

      removeElement: (id) =>
        set((state) => ({
          elements: state.elements.filter((element) => element.id !== id),
          isDirty: true,
        })),

      setWorldview: (worldview) =>
        set({
          worldview,
          isDirty: true,
        }),

      setSocialStructure: (structure) =>
        set({
          socialStructure: structure,
          isDirty: true,
        }),

      addCustomElement: (element) =>
        set((state) => ({
          customElements: [...state.customElements, element],
          isDirty: true,
        })),

      removeCustomElement: (element) =>
        set((state) => ({
          customElements: state.customElements.filter((e) => e !== element),
          isDirty: true,
        })),

      resetCultural: () => set(initialState),
    }),
    {
      name: 'novel-cultural-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 