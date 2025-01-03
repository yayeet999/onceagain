import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNovelStore } from '@/store/useNovelStore';

export const useNavigationProtection = () => {
  const router = useRouter();
  const hasUnsavedChanges = useNovelStore((state) => state.hasUnsavedChanges);
  const saveProgress = useNovelStore((state) => state.saveProgress);
  const discardChanges = useNovelStore((state) => state.discardChanges);

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

        if (confirm) {
          saveProgress();
        } else {
          discardChanges();
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    // router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [hasUnsavedChanges, saveProgress, discardChanges]);
}; 