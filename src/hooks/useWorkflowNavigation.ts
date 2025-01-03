import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNovelStore } from '@/store/useNovelStore';
import { useGenreStore } from '@/store/useGenreStore';
import { useCulturalStore } from '@/store/useCulturalStore';
import { useCharacterStore } from '@/store/useCharacterStore';
import { useRelationshipStore } from '@/store/useRelationshipStore';
import { useTimelineStore } from '@/store/useTimelineStore';
import { useParametersStore } from '@/store/useParametersStore';

export const useWorkflowNavigation = () => {
  const router = useRouter();
  
  // Get isDirty state from all stores
  const novelIsDirty = useNovelStore((state) => state.isDirty);
  const genreIsDirty = useGenreStore((state) => state.isDirty);
  const culturalIsDirty = useCulturalStore((state) => state.isDirty);
  const charactersIsDirty = useCharacterStore((state) => state.isDirty);
  const relationshipsIsDirty = useRelationshipStore((state) => state.isDirty);
  const timelineIsDirty = useTimelineStore((state) => state.isDirty);
  const parametersIsDirty = useParametersStore((state) => state.isDirty);

  // Get reset functions from all stores
  const resetNovel = useNovelStore((state) => state.resetStore);
  const resetGenre = useGenreStore((state) => state.resetGenres);
  const resetCultural = useCulturalStore((state) => state.resetCultural);
  const resetCharacters = useCharacterStore((state) => state.resetCharacters);
  const resetRelationships = useRelationshipStore((state) => state.resetRelationships);
  const resetTimeline = useTimelineStore((state) => state.resetTimeline);
  const resetParameters = useParametersStore((state) => state.resetParameters);

  const hasUnsavedChanges = 
    novelIsDirty ||
    genreIsDirty ||
    culturalIsDirty ||
    charactersIsDirty ||
    relationshipsIsDirty ||
    timelineIsDirty ||
    parametersIsDirty;

  const resetAllStores = () => {
    resetNovel();
    resetGenre();
    resetCultural();
    resetCharacters();
    resetRelationships();
    resetTimeline();
    resetParameters();
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    const handleRouteChange = (url: string) => {
      if (hasUnsavedChanges) {
        const confirm = window.confirm(
          'You have unsaved changes. Would you like to save them before leaving?'
        );

        if (!confirm) {
          resetAllStores();
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    // router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [hasUnsavedChanges]);

  return {
    hasUnsavedChanges,
    resetAllStores,
  };
}; 