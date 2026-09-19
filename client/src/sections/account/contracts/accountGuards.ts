import type { UserHistoryItem, UserHistoryPage } from "./accountContracts";

function isHistoryItem(value: unknown): value is UserHistoryItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Partial<UserHistoryItem>;
  return (
    [item.type, item.title, item.description, item.createdAt].every(
      (v) => typeof v === "string",
    ) &&
    [
      item.status,
      item.resource,
      item.operation,
      item.field,
      item.oldValue,
      item.newValue,
    ].every((v) => v === null || typeof v === "string")
  );
}

export function isUserHistoryPage(value: unknown): value is UserHistoryPage {
  if (typeof value !== "object" || value === null) return false;
  const page = value as Partial<UserHistoryPage>;
  return (
    Array.isArray(page.content) &&
    page.content.every(isHistoryItem) &&
    [
      page.totalElements,
      page.totalPages,
      page.size,
      page.number,
      page.numberOfElements,
    ].every((v) => typeof v === "number") &&
    [page.first, page.last, page.empty].every((v) => typeof v === "boolean")
  );
}

export function requireUserHistoryPage(value: unknown): UserHistoryPage {
  if (!isUserHistoryPage(value))
    throw new Error("Invalid user history response");
  return value;
}
