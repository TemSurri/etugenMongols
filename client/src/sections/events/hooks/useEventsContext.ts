import { createContext, useContext } from "react";

import type { ApiEvent } from "../types";
type EventsContextValue = {
  events: ApiEvent[];
  loading: boolean;
  error: boolean;
};

export const EventsContext = createContext<EventsContextValue | null>(null);

export function useEventsContext() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error("useEventsContext must be used inside EventsProvider");
  }

  return context;
}
