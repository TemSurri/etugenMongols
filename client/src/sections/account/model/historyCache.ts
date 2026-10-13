import type { ActivityHistoryResponse, HistoryCategory, HistoryCursor } from "../contracts/activityContracts";

export interface HistoryPaginationState {
  pages: ActivityHistoryResponse[];
  currentPageIndex: number;
  loading: boolean;
  error: boolean;
  failedPage: number | null;
}

const emptyState = (): HistoryPaginationState => ({ pages: [], currentPageIndex: 0, loading: false, error: false, failedPage: null });
type FetchHistory = (category: HistoryCategory, cursor?: HistoryCursor, signal?: AbortSignal) => Promise<ActivityHistoryResponse>;

// One instance per mounted user's history. Nothing is persisted between sessions.
export function createHistoryCache(fetchHistory: FetchHistory, onError: (error: unknown) => void) {
  let state = { account: emptyState(), participation: emptyState() };
  let generation = 0;
  const requests = new Map<HistoryCategory, AbortController>();
  const listeners = new Set<() => void>();
  const publish = () => listeners.forEach(listener => listener());
  const update = (category: HistoryCategory, value: HistoryPaginationState) => {
    state = { ...state, [category]: value };
    publish();
  };
  const reset = () => {
    generation++;
    requests.forEach(request => request.abort());
    requests.clear();
    state = { account: emptyState(), participation: emptyState() };
    publish();
  };
  const load = async (category: HistoryCategory, index: number) => {
    const current = state[category];
    if (current.loading || index < 0 || index > current.pages.length) return;
    if (current.pages[index]) {
      update(category, { ...current, currentPageIndex: index, error: false, failedPage: null });
      return;
    }
    const previous = current.pages[index - 1];
    if (index > 0 && (!previous?.nextCursorTime || !previous.nextCursorId)) return;
    const cursor = previous ? { cursorTime: previous.nextCursorTime!, cursorId: previous.nextCursorId! } : undefined;
    const requestGeneration = generation;
    const controller = new AbortController();
    requests.set(category, controller);
    update(category, { ...current, loading: true, error: false, failedPage: null });
    try {
      const page = await fetchHistory(category, cursor, controller.signal);
      if (requestGeneration !== generation) return;
      update(category, { pages: [...current.pages, page], currentPageIndex: index, loading: false, error: false, failedPage: null });
    } catch (error) {
      if (requestGeneration !== generation) return;
      update(category, { ...current, loading: false, error: true, failedPage: index });
      onError(error);
    } finally {
      if (requestGeneration === generation) requests.delete(category);
    }
  };
  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getSnapshot: () => state,
    load,
    reset,
  };
}
