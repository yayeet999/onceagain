import { useEffect, useRef } from 'react';
import { useNovelStore } from '@/store/useNovelStore';

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export const useAutoSave = () => {
  const isDirty = useNovelStore((state) => state.isDirty);
  const saveProgress = useNovelStore((state) => state.saveProgress);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isDirty) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set new timer
      timerRef.current = setTimeout(() => {
        saveProgress();
      }, AUTO_SAVE_INTERVAL);
    }

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, saveProgress]);
}; 