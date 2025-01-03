import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GenreState {
  // Genre Data
  primaryGenre: string | null;
  subgenre: string | null;
  genreBlend: string | null;
  genreApproach: string | null;
  
  // State Management
  isDirty: boolean;

  // Actions
  setPrimaryGenre: (genre: string) => void;
  setSubgenre: (subgenre: string) => void;
  setGenreBlend: (blend: string | null) => void;
  setGenreApproach: (approach: string | null) => void;
  resetGenres: () => void;
  markClean: () => void;

  // Computed
  canContinue: () => boolean;
}

const initialState = {
  primaryGenre: null,
  subgenre: null,
  genreBlend: null,
  genreApproach: null,
  isDirty: false,
};

export const useGenreStore = create<GenreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPrimaryGenre: (genre) =>
        set({
          primaryGenre: genre,
          // Reset dependent selections when primary genre changes
          subgenre: null,
          genreBlend: null,
          genreApproach: null,
          isDirty: true,
        }),

      setSubgenre: (subgenre) =>
        set({
          subgenre,
          isDirty: true,
        }),

      setGenreBlend: (blend) =>
        set({
          genreBlend: blend,
          isDirty: true,
        }),

      setGenreApproach: (approach) =>
        set({
          genreApproach: approach,
          isDirty: true,
        }),

      resetGenres: () => set(initialState),

      markClean: () => set({ isDirty: false }),

      canContinue: () => {
        const state = get();
        return !!state.primaryGenre && !!state.subgenre;
      },
    }),
    {
      name: 'novel-genre-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 