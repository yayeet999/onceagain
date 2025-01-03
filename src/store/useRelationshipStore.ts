import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type RelationType = 
  | 'family'
  | 'friend'
  | 'rival'
  | 'mentor'
  | 'romantic'
  | 'professional'
  | 'enemy'
  | 'custom';

interface Relationship {
  id: string;
  character1Id: string;
  character2Id: string;
  type: RelationType;
  strength: number; // 1-10
  description: string;
  dynamics: string[];
  history: string;
  conflicts: string[];
}

interface RelationshipState {
  // Relationship Data
  relationships: Record<string, Relationship>;
  activeRelationship: string | null;
  
  // State Management
  isDirty: boolean;

  // Actions
  addRelationship: (relationship: Omit<Relationship, 'id'>) => void;
  updateRelationship: (id: string, data: Partial<Relationship>) => void;
  removeRelationship: (id: string) => void;
  setActiveRelationship: (id: string | null) => void;
  
  // Dynamics Management
  addDynamic: (relationshipId: string, dynamic: string) => void;
  removeDynamic: (relationshipId: string, dynamic: string) => void;
  
  // Conflict Management
  addConflict: (relationshipId: string, conflict: string) => void;
  removeConflict: (relationshipId: string, conflict: string) => void;
  
  // State Management
  resetRelationships: () => void;
}

const initialState = {
  relationships: {},
  activeRelationship: null,
  isDirty: false,
};

export const useRelationshipStore = create<RelationshipState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addRelationship: (relationship) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [crypto.randomUUID()]: {
              ...relationship,
              id: crypto.randomUUID(),
            },
          },
          isDirty: true,
        })),

      updateRelationship: (id, data) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [id]: {
              ...state.relationships[id],
              ...data,
            },
          },
          isDirty: true,
        })),

      removeRelationship: (id) =>
        set((state) => {
          const { [id]: removed, ...rest } = state.relationships;
          return {
            relationships: rest,
            activeRelationship: state.activeRelationship === id ? null : state.activeRelationship,
            isDirty: true,
          };
        }),

      setActiveRelationship: (id) =>
        set({ activeRelationship: id }),

      addDynamic: (relationshipId, dynamic) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [relationshipId]: {
              ...state.relationships[relationshipId],
              dynamics: [...state.relationships[relationshipId].dynamics, dynamic],
            },
          },
          isDirty: true,
        })),

      removeDynamic: (relationshipId, dynamic) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [relationshipId]: {
              ...state.relationships[relationshipId],
              dynamics: state.relationships[relationshipId].dynamics.filter(
                (d) => d !== dynamic
              ),
            },
          },
          isDirty: true,
        })),

      addConflict: (relationshipId, conflict) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [relationshipId]: {
              ...state.relationships[relationshipId],
              conflicts: [...state.relationships[relationshipId].conflicts, conflict],
            },
          },
          isDirty: true,
        })),

      removeConflict: (relationshipId, conflict) =>
        set((state) => ({
          relationships: {
            ...state.relationships,
            [relationshipId]: {
              ...state.relationships[relationshipId],
              conflicts: state.relationships[relationshipId].conflicts.filter(
                (c) => c !== conflict
              ),
            },
          },
          isDirty: true,
        })),

      resetRelationships: () => set(initialState),
    }),
    {
      name: 'novel-relationships-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 