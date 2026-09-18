import { api } from "../../../api/client";
import type { ApiEvent } from "../../../contracts/eventContracts";
import type { AdminRegistration,EventCreateRequest,EventUpdateType } from "../contracts/adminContracts";
export function getAdminEvents() { return api.get<ApiEvent[]>(
              "/events/admin"
            ); }

export function createAdminEvent(request: EventCreateRequest) { return api.post<ApiEvent>(
            "/events",
            request
          ); }

export function updateAdminEvent(eventId: string, type: EventUpdateType, value: string | null) { return api.patch<ApiEvent>(
            `/events/${eventId}`,
            {
              type,
              value
            }
          ); }

export function updateAdminRegistration(eventId: string, registerable: boolean, registrationCost: number | null) { return api.patch<ApiEvent>(
            `/events/${eventId}/registration`,
            {
              registerable,
              registrationCost
            }
          ); }

export function getAdminRegistrations(eventId: string) { return api.get<
                            AdminRegistration[]
                        >(
                            `/event-registrations/admin/events/${eventId}`
                        ); }
