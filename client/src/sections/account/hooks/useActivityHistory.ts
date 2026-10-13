import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { useAuth } from "../../auth/hooks/useAuth";
import { getActivityHistory } from "../api/activityApi";
import { createHistoryCache } from "../model/historyCache";
import type { HistoryCategory } from "../contracts/activityContracts";

export function useActivityHistory() {
  const { user, refreshAuth } = useAuth();
  const userId = user?.id;
  const [category, setCategory] = useState<HistoryCategory>("account");
  const cache = useMemo(() => {
    const instance = createHistoryCache(
      (kind, cursor, signal) => userId === undefined
        ? Promise.reject(new Error("Authentication required"))
        : getActivityHistory(kind, cursor, signal),
      error => {
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
          instance.reset();
          void refreshAuth();
        }
      },
    );
    return instance;
  }, [userId, refreshAuth]);
  const states = useSyncExternalStore(cache.subscribe, cache.getSnapshot);
  const state = states[category];

  useEffect(() => () => cache.reset(), [cache]);
  useEffect(() => {
    if (userId !== undefined) void cache.load(category, cache.getSnapshot()[category].currentPageIndex);
  }, [cache, category, userId]);
  useEffect(() => {
    const invalidate = () => {
      cache.reset();
      if (userId !== undefined) void cache.load(category, 0);
    };
    window.addEventListener("activity-history-invalidated", invalidate);
    return () => window.removeEventListener("activity-history-invalidated", invalidate);
  }, [cache, category, userId]);

  return {
    ...state,
    category, setCategory,
    history: state.pages[state.currentPageIndex],
    previousPage: () => void cache.load(category, state.currentPageIndex - 1),
    nextPage: () => void cache.load(category, state.currentPageIndex + 1),
    retry: () => void cache.load(category, state.failedPage ?? state.currentPageIndex),
    refresh: () => { cache.reset(); if (userId !== undefined) void cache.load(category, 0); },
  };
}
