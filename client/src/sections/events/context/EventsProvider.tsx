import { isApiEventList } from "../contracts/eventGuards";
import { EventsContext } from "../hooks/useEventsContext";

import { getPublicEvents } from "../api/eventsApi";

import { useEffect, useState, type ReactNode } from "react";

import type { ApiEvent } from "../types";

type EventsProviderProps = {
  children: ReactNode;
};

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<ApiEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        setLoading(true);
        setError(false);

        /*
         * Use unknown here intentionally.
         *
         * We do not trust an external API
         * response until we verify its shape.
         */
        const response = await getPublicEvents();

        if (!active) {
          return;
        }

        /*
         * A 200 response does not necessarily
         * mean we received events.
         *
         * For example, if the API URL is
         * misconfigured, the frontend host
         * may return index.html with 200.
         */
        if (!isApiEventList(response.data)) {
          console.error("Invalid events response. Expected an array.");

          setEvents([]);
          setError(true);

          return;
        }

        setEvents(response.data);
      } catch (requestError) {
        if (!active) {
          return;
        }

        console.error("Failed to load events:", requestError);

        setEvents([]);
        setError(true);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      active = false;
    };
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
