export interface SavedTuition {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  tutorName: string;
  bannerImage: string;
}

export const FREE_BOOKMARK_LIMIT = 5;

const STORAGE_KEY = "mentorlagbe.saved-tuitions";
const EMPTY: SavedTuition[] = [];
const listeners = new Set<() => void>();

let cache: Record<string, SavedTuition[]> | null = null;

function readAll(): Record<string, SavedTuition[]> {
  if (cache) return cache;

  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    cache =
      parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, SavedTuition[]>)
        : {};
  } catch {
    cache = {};
  }

  return cache;
}

function writeAll(value: Record<string, SavedTuition[]>) {
  cache = value;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}

  listeners.forEach((listener) => listener());
}

export function getSavedTuitions(userId?: string): SavedTuition[] {
  if (!userId) return EMPTY;

  return readAll()[userId] ?? EMPTY;
}

export function subscribeToSavedTuitions(listener: () => void) {
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

export function toggleSavedTuition(
  userId: string,
  tuition: SavedTuition,
  isPro: boolean
): { saved: boolean; limitReached: boolean } {
  const all = readAll();
  const current = all[userId] ?? [];

  if (current.some((item) => item._id === tuition._id)) {
    writeAll({ ...all, [userId]: current.filter((item) => item._id !== tuition._id) });
    return { saved: false, limitReached: false };
  }

  if (!isPro && current.length >= FREE_BOOKMARK_LIMIT) {
    return { saved: false, limitReached: true };
  }

  writeAll({ ...all, [userId]: [tuition, ...current] });

  return { saved: true, limitReached: false };
}

export function removeSavedTuition(userId: string, tuitionId: string) {
  const all = readAll();
  const current = all[userId] ?? [];

  writeAll({
    ...all,
    [userId]: current.filter((item) => item._id !== tuitionId),
  });
}
