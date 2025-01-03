import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ParameterCategory =
  | 'magic'
  | 'technology'
  | 'society'
  | 'environment'
  | 'politics'
  | 'economy'
  | 'custom';

interface Parameter {
  id: string;
  category: ParameterCategory;
  name: string;
  description: string;
  rules: string[];
  limitations: string[];
  consequences: string[];
  interactions: Record<string, string>; // Parameter ID -> Interaction description
}

interface ParametersState {
  // Parameters Data
  parameters: Record<string, Parameter>;
  activeParameter: string | null;
  categoryOrder: ParameterCategory[];
  
  // State Management
  isDirty: boolean;

  // Parameter Actions
  addParameter: (parameter: Omit<Parameter, 'id'>) => void;
  updateParameter: (id: string, data: Partial<Parameter>) => void;
  removeParameter: (id: string) => void;
  setActiveParameter: (id: string | null) => void;
  
  // Rules Management
  addRule: (parameterId: string, rule: string) => void;
  removeRule: (parameterId: string, rule: string) => void;
  
  // Limitations Management
  addLimitation: (parameterId: string, limitation: string) => void;
  removeLimitation: (parameterId: string, limitation: string) => void;
  
  // Consequences Management
  addConsequence: (parameterId: string, consequence: string) => void;
  removeConsequence: (parameterId: string, consequence: string) => void;
  
  // Interactions Management
  addInteraction: (parameterId: string, targetId: string, description: string) => void;
  removeInteraction: (parameterId: string, targetId: string) => void;
  
  // Category Management
  reorderCategories: (newOrder: ParameterCategory[]) => void;
  
  // State Management
  resetParameters: () => void;
  markClean: () => void;
}

const initialState: Omit<ParametersState, keyof { addParameter: any, updateParameter: any, removeParameter: any, setActiveParameter: any, addRule: any, removeRule: any, addLimitation: any, removeLimitation: any, addConsequence: any, removeConsequence: any, addInteraction: any, removeInteraction: any, reorderCategories: any, resetParameters: any, markClean: any }> = {
  parameters: {},
  activeParameter: null,
  categoryOrder: ['magic', 'technology', 'society', 'environment', 'politics', 'economy', 'custom'] as ParameterCategory[],
  isDirty: false,
};

export const useParametersStore = create<ParametersState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addParameter: (parameter) => {
        const id = crypto.randomUUID();
        set((state) => ({
          parameters: {
            ...state.parameters,
            [id]: {
              ...parameter,
              id,
              interactions: {},
            },
          },
          isDirty: true,
        }));
      },

      updateParameter: (id, data) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [id]: {
              ...state.parameters[id],
              ...data,
            },
          },
          isDirty: true,
        })),

      removeParameter: (id) =>
        set((state) => {
          const { [id]: removed, ...rest } = state.parameters;
          
          // Remove interactions referencing this parameter
          const updatedParameters = Object.entries(rest).reduce(
            (acc, [parameterId, parameter]) => ({
              ...acc,
              [parameterId]: {
                ...parameter,
                interactions: Object.entries(parameter.interactions).reduce(
                  (interAcc, [targetId, description]) =>
                    targetId === id
                      ? interAcc
                      : { ...interAcc, [targetId]: description },
                  {}
                ),
              },
            }),
            {}
          );

          return {
            parameters: updatedParameters,
            activeParameter: state.activeParameter === id ? null : state.activeParameter,
            isDirty: true,
          };
        }),

      setActiveParameter: (id) =>
        set({ activeParameter: id }),

      addRule: (parameterId, rule) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              rules: [...state.parameters[parameterId].rules, rule],
            },
          },
          isDirty: true,
        })),

      removeRule: (parameterId, rule) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              rules: state.parameters[parameterId].rules.filter((r) => r !== rule),
            },
          },
          isDirty: true,
        })),

      addLimitation: (parameterId, limitation) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              limitations: [...state.parameters[parameterId].limitations, limitation],
            },
          },
          isDirty: true,
        })),

      removeLimitation: (parameterId, limitation) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              limitations: state.parameters[parameterId].limitations.filter(
                (l) => l !== limitation
              ),
            },
          },
          isDirty: true,
        })),

      addConsequence: (parameterId, consequence) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              consequences: [...state.parameters[parameterId].consequences, consequence],
            },
          },
          isDirty: true,
        })),

      removeConsequence: (parameterId, consequence) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              consequences: state.parameters[parameterId].consequences.filter(
                (c) => c !== consequence
              ),
            },
          },
          isDirty: true,
        })),

      addInteraction: (parameterId, targetId, description) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              interactions: {
                ...state.parameters[parameterId].interactions,
                [targetId]: description,
              },
            },
          },
          isDirty: true,
        })),

      removeInteraction: (parameterId, targetId) =>
        set((state) => ({
          parameters: {
            ...state.parameters,
            [parameterId]: {
              ...state.parameters[parameterId],
              interactions: Object.entries(
                state.parameters[parameterId].interactions
              ).reduce(
                (acc, [id, description]) =>
                  id === targetId ? acc : { ...acc, [id]: description },
                {}
              ),
            },
          },
          isDirty: true,
        })),

      reorderCategories: (newOrder) =>
        set((state) => ({
          categoryOrder: newOrder,
          isDirty: true,
        })),

      markClean: () => set({ isDirty: false }),

      resetParameters: () => set(initialState),
    }),
    {
      name: 'novel-parameters-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 