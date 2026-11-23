"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getSavedTuitions,
  subscribeToSavedTuitions,
  type SavedTuition,
} from "@/lib/data/saved-tuitions";

export function useSavedTuitions(userId?: string): SavedTuition[] {
  const getSnapshot = useCallback(() => getSavedTuitions(userId), [userId]);

  return useSyncExternalStore(
    subscribeToSavedTuitions,
    getSnapshot,
    () => getSavedTuitions()
  );
}
