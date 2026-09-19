import type { ApiEvent } from "./eventContracts";

export function isApiEvent(value: unknown): value is ApiEvent {
  if (typeof value !== "object" || value === null) return false;
  const event = value as Partial<ApiEvent>;
  return (
    typeof event.id === "string" &&
    typeof event.slug === "string" &&
    typeof event.titleEn === "string" &&
    typeof event.titleMn === "string" &&
    typeof event.descriptionEn === "string" &&
    typeof event.descriptionMn === "string" &&
    typeof event.startsAt === "string" &&
    typeof event.createdAt === "string" &&
    typeof event.location === "string" &&
    typeof event.published === "boolean" &&
    typeof event.registerable === "boolean" &&
    (event.registrationCost === null ||
      typeof event.registrationCost === "number") &&
    [
      event.endsAt,
      event.coverImage,
      event.coverImageAltEn,
      event.coverImageAltMn,
      event.contactEmail,
      event.contactPhone,
    ].every((v) => v === null || typeof v === "string")
  );
}

export function isApiEventList(value: unknown): value is ApiEvent[] {
  return Array.isArray(value) && value.every(isApiEvent);
}

export function requireApiEvent(value: unknown): ApiEvent {
  if (!isApiEvent(value)) throw new Error("Invalid event response");
  return value;
}

export function requireApiEvents(value: unknown): ApiEvent[] {
  if (!isApiEventList(value)) throw new Error("Invalid events response");
  return value;
}
