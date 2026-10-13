import { api } from "../../../api/client";
import { requireActivityHistoryResponse } from "../contracts/accountGuards";
import type { HistoryCategory, HistoryCursor } from "../contracts/activityContracts";

export async function getActivityHistory(category: HistoryCategory, cursor?: HistoryCursor, signal?: AbortSignal) {
  const response = await api.get<unknown>(`/activity/history/${category}`, {
    params: cursor,
    signal,
  });
  return requireActivityHistoryResponse(response.data);
}
