import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type WorkflowStep = 
  | 'basic-info'
  | 'genre'
  | 'cultural'
  | 'characters'
  | 'relationships'
  | 'timeline'
  | 'parameters';

interface BasicNovelInfo {
  title: string;
  length: string;
  structure: string;
}

interface NovelGenState {
  // Workflow State
  currentStep: WorkflowStep;
  isDirty: boolean;
  hasUnsavedChanges: boolean;
  lastSavedTimestamp: number;

  // Novel Data
  basicInfo: BasicNovelInfo;

  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  updateBasicInfo: (data: Partial<BasicNovelInfo>) => void;
  markDirty: () => void;
  markClean: () => void;
  saveProgress: () => void;
  discardChanges: () => void;
  resetStore: () => void;
}

const initialState = {
  currentStep: 'basic-info' as WorkflowStep,
  isDirty: false,
  hasUnsavedChanges: false,
  lastSavedTimestamp: Date.now(),
  basicInfo: {
    title: '',
    length: '',
    structure: '',
  },
};

export const useNovelStore = create<NovelGenState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation Actions
      setCurrentStep: (step) => 
        set({ currentStep: step, isDirty: true }),

      // Data Actions
      updateBasicInfo: (data) =>
        set((state) => ({
          basicInfo: { ...state.basicInfo, ...data },
          isDirty: true,
          hasUnsavedChanges: true,
        })),

      // State Management Actions
      markDirty: () => 
        set({ isDirty: true, hasUnsavedChanges: true }),

      markClean: () =>
        set({ 
          isDirty: false, 
          hasUnsavedChanges: false,
          lastSavedTimestamp: Date.now(),
        }),

      saveProgress: () => {
        const state = get();
        // Here we'll add actual save logic later
        set({ 
          isDirty: false,
          hasUnsavedChanges: false,
          lastSavedTimestamp: Date.now(),
        });
      },

      discardChanges: () =>
        set({ 
          ...initialState,
          lastSavedTimestamp: Date.now(),
        }),

      resetStore: () => 
        set(initialState),
    }),
    {
      name: 'novel-gen-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        basicInfo: state.basicInfo,
        currentStep: state.currentStep,
      }),
    }
  )
); 