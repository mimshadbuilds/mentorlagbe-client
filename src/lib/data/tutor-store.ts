import type { TuitionRecord } from "./tuitions";
import { getOwnedTuitions } from "./tutor";

const STORAGE_KEY = "mentorlagbe.tutor.tuitions";

/**
 * Tiny client-side store so Post / Edit / Delete / Toggle share one list across
 * tutor pages. Seeded from the tutor's tuitions on first load.
 * TODO(backend): replace with mentorlagbe-server CRUD calls.
 *
 * Exposed through useSyncExternalStore so SSR renders the seed and the browser
 * transparently swaps in the persisted list after hydration.
 */
let cache: TuitionRecord[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): TuitionRecord[] {
  if (typeof window === "undefined") return getOwnedTuitions();
  if (cache === null) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      cache = Array.isArray(parsed) ? (parsed as TuitionRecord[]) : getOwnedTuitions();
    } catch {
      cache = getOwnedTuitions();
    }
  }
  return cache;
}

function getServerSnapshot(): TuitionRecord[] {
  return getOwnedTuitions();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = () => {
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveTutorTuitions(tuitions: TuitionRecord[]): void {
  cache = tuitions;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tuitions));
  } catch {
    // Storage unavailable — in-memory state still works for this session.
  }
  listeners.forEach((listener) => listener());
}

export function addTutorTuition(tuition: TuitionRecord): void {
  saveTutorTuitions([tuition, ...getSnapshot()]);
}

export const tutorStore = { subscribe, getSnapshot, getServerSnapshot };
