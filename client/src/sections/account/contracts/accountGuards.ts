import type { ActivityDTO, ActivityHistoryResponse } from "./activityContracts";

function isActivity(value: unknown): value is ActivityDTO {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<ActivityDTO>;
  return [item.id, item.type, item.description, item.status, item.createdAt].every(v => typeof v === "string")
    && Number.isFinite(Date.parse(item.createdAt!));
}

export function isActivityHistoryResponse(value: unknown): value is ActivityHistoryResponse {
  if (typeof value !== "object" || value === null) return false;
  const page = value as Partial<ActivityHistoryResponse>;
  return Array.isArray(page.activities) && page.activities.every(isActivity)
    && ((page.nextCursorTime === null && page.nextCursorId === null)
      || (typeof page.nextCursorTime === "string" && page.nextCursorTime.length > 0
        && typeof page.nextCursorId === "string" && page.nextCursorId.length > 0));
}

export function requireActivityHistoryResponse(value: unknown): ActivityHistoryResponse {
  if (!isActivityHistoryResponse(value)) throw new Error("Invalid activity history response");
  return value;
}
