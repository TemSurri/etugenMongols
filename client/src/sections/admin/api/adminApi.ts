import { api } from "../../../api/client";
import type { ApiEvent } from "../../events/contracts/eventContracts";
import {
  requireApiEvent,
  requireApiEvents,
} from "../../events/contracts/eventGuards";
import type {
  AdminRegistration,
  EventCreateRequest,
  EventUpdateType,
} from "../contracts/adminContracts";
export function getAdminEvents() {
  return api.get<ApiEvent[]>("/events/admin").then((response) => ({
    ...response,
    data: requireApiEvents(response.data),
  }));
}

export function createAdminEvent(request: EventCreateRequest) {
  return api.post<ApiEvent>("/events", request).then((response) => ({
    ...response,
    data: requireApiEvent(response.data),
  }));
}

export function updateAdminEvent(
  eventId: string,
  type: EventUpdateType,
  value: string | null,
) {
  return api
    .patch<ApiEvent>(`/events/${eventId}`, {
      type,
      value,
    })
    .then((response) => ({
      ...response,
      data: requireApiEvent(response.data),
    }));
}

export function updateAdminRegistration(
  eventId: string,
  registerable: boolean,
  registrationCost: number | null,
) {
  return api
    .patch<ApiEvent>(`/events/${eventId}/registration`, {
      registerable,
      registrationCost,
    })
    .then((response) => ({
      ...response,
      data: requireApiEvent(response.data),
    }));
}

export function getAdminRegistrations(eventId: string) {
  return api.get<AdminRegistration[]>(
    `/event-registrations/admin/events/${eventId}`,
  );
}
