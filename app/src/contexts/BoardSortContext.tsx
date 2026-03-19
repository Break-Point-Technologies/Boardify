import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@boardify/boardSortMode';

export type BoardSortMode = 'newest' | 'oldest' | 'updated' | 'name_asc' | 'name_desc' | 'stale';

export const BOARD_SORT_ORDER: BoardSortMode[] = [
  'newest',
  'oldest',
  'updated',
  'stale',
  'name_asc',
  'name_desc',
];

export const BOARD_SORT_LABELS: Record<BoardSortMode, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  updated: 'Recently updated',
  stale: 'Least recently updated',
  name_asc: 'Name (A-Z)',
  name_desc: 'Name (Z-A)',
};

const DEFAULT_SORT: BoardSortMode = 'newest';

type BoardSortContextValue = {
  sortMode: BoardSortMode;
  setSortMode: (mode: BoardSortMode) => void;
};

const BoardSortContext = createContext<BoardSortContextValue | null>(null);

export function BoardSortProvider({ children }: { children: React.ReactNode }) {
  const [sortMode, setSortModeState] = useState<BoardSortMode>(DEFAULT_SORT);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled || !raw) return;
        if (BOARD_SORT_ORDER.includes(raw as BoardSortMode)) {
          setSortModeState(raw as BoardSortMode);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setSortMode = useCallback((mode: BoardSortMode) => {
    setSortModeState(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ sortMode, setSortMode }),
    [sortMode, setSortMode],
  );

  return <BoardSortContext.Provider value={value}>{children}</BoardSortContext.Provider>;
}

export function useBoardSort() {
  const ctx = useContext(BoardSortContext);
  if (!ctx) {
    throw new Error('useBoardSort must be used within BoardSortProvider');
  }
  return ctx;
}

export function sortBoards<
  T extends { name: string; createdAt: string; updatedAt: string },
>(boards: T[], mode: BoardSortMode): T[] {
  const copy = [...boards];
  const byCreated = (a: T, b: T) => a.createdAt.localeCompare(b.createdAt);
  const byUpdated = (a: T, b: T) => a.updatedAt.localeCompare(b.updatedAt);
  switch (mode) {
    case 'newest':
      return copy.sort((a, b) => -byCreated(a, b));
    case 'oldest':
      return copy.sort(byCreated);
    case 'updated':
      return copy.sort((a, b) => -byUpdated(a, b));
    case 'stale':
      return copy.sort(byUpdated);
    case 'name_asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    case 'name_desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }));
    default:
      return copy;
  }
}
