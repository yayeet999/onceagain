import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TimelineType = 
  | 'linear'
  | 'nonlinear'
  | 'parallel'
  | 'circular'
  | 'episodic';

export type TimelineEventType =
  | 'plot-point'
  | 'character-development'
  | 'world-building'
  | 'conflict'
  | 'resolution';

interface TimelineEvent {
  id: string;
  title: string;
  type: TimelineEventType;
  description: string;
  characters: string[]; // Character IDs
  location: string;
  timeMarker: string;
  importance: number; // 1-5
  consequences: string[];
  subEvents: string[]; // Event IDs
}

interface TimelineState {
  // Timeline Data
  timelineType: TimelineType | null;
  subTimelineType: string | null;
  events: Record<string, TimelineEvent>;
  eventOrder: string[]; // Event IDs in order
  
  // State Management
  isDirty: boolean;
  activeEvent: string | null;

  // Timeline Type Actions
  setTimelineType: (type: TimelineType) => void;
  setSubTimelineType: (type: string) => void;
  
  // Event Actions
  addEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateEvent: (id: string, data: Partial<TimelineEvent>) => void;
  removeEvent: (id: string) => void;
  setActiveEvent: (id: string | null) => void;
  
  // Event Order Actions
  reorderEvents: (newOrder: string[]) => void;
  moveEventUp: (id: string) => void;
  moveEventDown: (id: string) => void;
  
  // Sub-Event Management
  addSubEvent: (parentId: string, childId: string) => void;
  removeSubEvent: (parentId: string, childId: string) => void;
  
  // Character Association
  addCharacterToEvent: (eventId: string, characterId: string) => void;
  removeCharacterFromEvent: (eventId: string, characterId: string) => void;
  
  // Consequence Management
  addConsequence: (eventId: string, consequence: string) => void;
  removeConsequence: (eventId: string, consequence: string) => void;
  
  // State Management
  resetTimeline: () => void;
}

const initialState = {
  timelineType: null,
  subTimelineType: null,
  events: {},
  eventOrder: [],
  isDirty: false,
  activeEvent: null,
};

export const useTimelineStore = create<TimelineState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTimelineType: (type) =>
        set({
          timelineType: type,
          isDirty: true,
        }),

      setSubTimelineType: (type) =>
        set({
          subTimelineType: type,
          isDirty: true,
        }),

      addEvent: (event) => {
        const id = crypto.randomUUID();
        set((state) => ({
          events: {
            ...state.events,
            [id]: {
              ...event,
              id,
            },
          },
          eventOrder: [...state.eventOrder, id],
          isDirty: true,
        }));
      },

      updateEvent: (id, data) =>
        set((state) => ({
          events: {
            ...state.events,
            [id]: {
              ...state.events[id],
              ...data,
            },
          },
          isDirty: true,
        })),

      removeEvent: (id) =>
        set((state) => {
          const { [id]: removed, ...rest } = state.events;
          return {
            events: rest,
            eventOrder: state.eventOrder.filter((eventId) => eventId !== id),
            activeEvent: state.activeEvent === id ? null : state.activeEvent,
            isDirty: true,
          };
        }),

      setActiveEvent: (id) =>
        set({ activeEvent: id }),

      reorderEvents: (newOrder) =>
        set((state) => ({
          eventOrder: newOrder,
          isDirty: true,
        })),

      moveEventUp: (id) =>
        set((state) => {
          const index = state.eventOrder.indexOf(id);
          if (index <= 0) return state;

          const newOrder = [...state.eventOrder];
          [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];

          return {
            eventOrder: newOrder,
            isDirty: true,
          };
        }),

      moveEventDown: (id) =>
        set((state) => {
          const index = state.eventOrder.indexOf(id);
          if (index === -1 || index === state.eventOrder.length - 1) return state;

          const newOrder = [...state.eventOrder];
          [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];

          return {
            eventOrder: newOrder,
            isDirty: true,
          };
        }),

      addSubEvent: (parentId, childId) =>
        set((state) => ({
          events: {
            ...state.events,
            [parentId]: {
              ...state.events[parentId],
              subEvents: [...state.events[parentId].subEvents, childId],
            },
          },
          isDirty: true,
        })),

      removeSubEvent: (parentId, childId) =>
        set((state) => ({
          events: {
            ...state.events,
            [parentId]: {
              ...state.events[parentId],
              subEvents: state.events[parentId].subEvents.filter((id) => id !== childId),
            },
          },
          isDirty: true,
        })),

      addCharacterToEvent: (eventId, characterId) =>
        set((state) => ({
          events: {
            ...state.events,
            [eventId]: {
              ...state.events[eventId],
              characters: [...state.events[eventId].characters, characterId],
            },
          },
          isDirty: true,
        })),

      removeCharacterFromEvent: (eventId, characterId) =>
        set((state) => ({
          events: {
            ...state.events,
            [eventId]: {
              ...state.events[eventId],
              characters: state.events[eventId].characters.filter((id) => id !== characterId),
            },
          },
          isDirty: true,
        })),

      addConsequence: (eventId, consequence) =>
        set((state) => ({
          events: {
            ...state.events,
            [eventId]: {
              ...state.events[eventId],
              consequences: [...state.events[eventId].consequences, consequence],
            },
          },
          isDirty: true,
        })),

      removeConsequence: (eventId, consequence) =>
        set((state) => ({
          events: {
            ...state.events,
            [eventId]: {
              ...state.events[eventId],
              consequences: state.events[eventId].consequences.filter((c) => c !== consequence),
            },
          },
          isDirty: true,
        })),

      resetTimeline: () => set(initialState),
    }),
    {
      name: 'novel-timeline-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 