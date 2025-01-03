import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type CharacterRole = 
  | 'protagonist'
  | 'antagonist'
  | 'mentor'
  | 'confidant'
  | 'catalyst'
  | 'comic-relief';

export type CharacterType = 
  | 'main'
  | 'supporting'
  | 'minor'
  | 'background';

interface BackgroundEvent {
  id: string;
  type: 'Early Life' | 'Defining Moment' | 'Major Victory' | 'Significant Loss';
  age: number;
  description: string;
}

interface Trait {
  id: string;
  title: string;
  description: string;
  type: 'strength' | 'flaw';
  severity: 'major' | 'minor';
  impact: string;
  example: string;
}

interface Goal {
  id: string;
  text: string;
}

interface Character {
  // Basic Info
  id: string;
  slotNumber: number;
  name: string;
  role: CharacterRole;
  characterType: CharacterType;
  age: number;
  gender: string;
  description: string;
  
  // Detailed Info
  backgroundEvents: BackgroundEvent[];
  personalityTraits: string[];
  traits: Trait[];
  motivations: string[];
  goals: Goal[];
  
  // UI State
  currentStep: number;
  isComplete: boolean;
}

interface CharacterState {
  // Character Data
  characters: Record<number, Character>;
  activeCharacter: number | null;
  
  // State Management
  isDirty: boolean;

  // Actions
  initializeCharacter: (slotNumber: number) => void;
  updateCharacter: (slotNumber: number, data: Partial<Character>) => void;
  removeCharacter: (slotNumber: number) => void;
  setActiveCharacter: (slotNumber: number | null) => void;
  
  // Background Events
  addBackgroundEvent: (slotNumber: number, event: Omit<BackgroundEvent, 'id'>) => void;
  updateBackgroundEvent: (slotNumber: number, eventId: string, event: Partial<BackgroundEvent>) => void;
  removeBackgroundEvent: (slotNumber: number, eventId: string) => void;
  
  // Traits
  addTrait: (slotNumber: number, trait: Omit<Trait, 'id'>) => void;
  updateTrait: (slotNumber: number, traitId: string, trait: Partial<Trait>) => void;
  removeTrait: (slotNumber: number, traitId: string) => void;
  
  // Goals
  addGoal: (slotNumber: number, goalText: string) => void;
  removeGoal: (slotNumber: number, goalId: string) => void;
  
  // State Management
  markCharacterComplete: (slotNumber: number) => void;
  resetCharacters: () => void;
}

const initialState = {
  characters: {},
  activeCharacter: null,
  isDirty: false,
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      ...initialState,

      initializeCharacter: (slotNumber) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              id: crypto.randomUUID(),
              slotNumber,
              name: '',
              role: 'protagonist' as CharacterRole,
              characterType: 'main' as CharacterType,
              age: 25,
              gender: '',
              description: '',
              backgroundEvents: [],
              personalityTraits: [],
              traits: [],
              motivations: [],
              goals: [],
              currentStep: 1,
              isComplete: false,
            },
          },
          isDirty: true,
        })),

      updateCharacter: (slotNumber, data) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              ...data,
            },
          },
          isDirty: true,
        })),

      removeCharacter: (slotNumber) =>
        set((state) => {
          const { [slotNumber]: removed, ...rest } = state.characters;
          return {
            characters: rest,
            activeCharacter: state.activeCharacter === slotNumber ? null : state.activeCharacter,
            isDirty: true,
          };
        }),

      setActiveCharacter: (slotNumber) =>
        set({ activeCharacter: slotNumber }),

      addBackgroundEvent: (slotNumber, event) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              backgroundEvents: [
                ...state.characters[slotNumber].backgroundEvents,
                { ...event, id: crypto.randomUUID() },
              ],
            },
          },
          isDirty: true,
        })),

      updateBackgroundEvent: (slotNumber, eventId, event) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              backgroundEvents: state.characters[slotNumber].backgroundEvents.map((e) =>
                e.id === eventId ? { ...e, ...event } : e
              ),
            },
          },
          isDirty: true,
        })),

      removeBackgroundEvent: (slotNumber, eventId) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              backgroundEvents: state.characters[slotNumber].backgroundEvents.filter(
                (e) => e.id !== eventId
              ),
            },
          },
          isDirty: true,
        })),

      addTrait: (slotNumber, trait) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              traits: [
                ...state.characters[slotNumber].traits,
                { ...trait, id: crypto.randomUUID() },
              ],
            },
          },
          isDirty: true,
        })),

      updateTrait: (slotNumber, traitId, trait) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              traits: state.characters[slotNumber].traits.map((t) =>
                t.id === traitId ? { ...t, ...trait } : t
              ),
            },
          },
          isDirty: true,
        })),

      removeTrait: (slotNumber, traitId) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              traits: state.characters[slotNumber].traits.filter((t) => t.id !== traitId),
            },
          },
          isDirty: true,
        })),

      addGoal: (slotNumber, goalText) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              goals: [
                ...state.characters[slotNumber].goals,
                { id: crypto.randomUUID(), text: goalText },
              ],
            },
          },
          isDirty: true,
        })),

      removeGoal: (slotNumber, goalId) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              goals: state.characters[slotNumber].goals.filter((g) => g.id !== goalId),
            },
          },
          isDirty: true,
        })),

      markCharacterComplete: (slotNumber) =>
        set((state) => ({
          characters: {
            ...state.characters,
            [slotNumber]: {
              ...state.characters[slotNumber],
              isComplete: true,
            },
          },
          isDirty: true,
        })),

      resetCharacters: () => set(initialState),
    }),
    {
      name: 'novel-characters-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 