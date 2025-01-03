import { useEffect, useRef } from 'react';
import { useNovelStore } from '@/store/useNovelStore';
import { useGenreStore } from '@/store/useGenreStore';
import { useCulturalStore } from '@/store/useCulturalStore';
import { useCharacterStore } from '@/store/useCharacterStore';
import { useRelationshipStore } from '@/store/useRelationshipStore';
import { useTimelineStore } from '@/store/useTimelineStore';
import { useParametersStore } from '@/store/useParametersStore';

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export const useWorkflowAutoSave = () => {
  const timerRef = useRef<NodeJS.Timeout>();

  // Get isDirty state from all stores
  const novelIsDirty = useNovelStore((state) => state.isDirty);
  const genreIsDirty = useGenreStore((state) => state.isDirty);
  const culturalIsDirty = useCulturalStore((state) => state.isDirty);
  const charactersIsDirty = useCharacterStore((state) => state.isDirty);
  const relationshipsIsDirty = useRelationshipStore((state) => state.isDirty);
  const timelineIsDirty = useTimelineStore((state) => state.isDirty);
  const parametersIsDirty = useParametersStore((state) => state.isDirty);

  // Get markClean functions from all stores
  const markNovelClean = useNovelStore((state) => state.markClean);
  const markGenreClean = useGenreStore((state) => state.markClean);
  const markCulturalClean = useCulturalStore((state) => state.markClean);
  const markCharactersClean = useCharacterStore((state) => state.markClean);
  const markRelationshipsClean = useRelationshipStore((state) => state.markClean);
  const markTimelineClean = useTimelineStore((state) => state.markClean);
  const markParametersClean = useParametersStore((state) => state.markClean);

  const hasUnsavedChanges = 
    novelIsDirty ||
    genreIsDirty ||
    culturalIsDirty ||
    charactersIsDirty ||
    relationshipsIsDirty ||
    timelineIsDirty ||
    parametersIsDirty;

  const markAllClean = () => {
    markNovelClean();
    markGenreClean();
    markCulturalClean();
    markCharactersClean();
    markRelationshipsClean();
    markTimelineClean();
    markParametersClean();
  };

  useEffect(() => {
    if (hasUnsavedChanges) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        markAllClean();
      }, AUTO_SAVE_INTERVAL);
    }

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hasUnsavedChanges]);

  return {
    hasUnsavedChanges,
    markAllClean,
  };
}; 