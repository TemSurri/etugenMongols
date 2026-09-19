import { api } from "../../../api/client";
export function getPublicEvents() {
  return api.get<unknown>("/events");
}
