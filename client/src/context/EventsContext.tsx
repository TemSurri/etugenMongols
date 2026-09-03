"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import {
  api
} from "../api/client";

import type {
  ApiEvent
} from "../sections/events/types";


type EventsContextValue = {
  events: ApiEvent[];
  loading: boolean;
  error: boolean;
};


const EventsContext =
  createContext<EventsContextValue | null>(
    null
  );


type EventsProviderProps = {
  children: ReactNode;
};


export function EventsProvider({
  children
}: EventsProviderProps) {

  const [
    events,
    setEvents
  ] =
    useState<ApiEvent[]>([]);


  const [
    loading,
    setLoading
  ] =
    useState(true);


  const [
    error,
    setError
  ] =
    useState(false);


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
        const response =
          await api.get<unknown>(
            "/events"
          );


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
        if (
          !Array.isArray(
            response.data
          )
        ) {

          console.error(
            "Invalid events response. Expected an array.",
            response.data
          );


          setEvents([]);
          setError(true);

          return;
        }


        setEvents(
          response.data as ApiEvent[]
        );


      } catch (requestError) {

        if (!active) {
          return;
        }


        console.error(
          "Failed to load events:",
          requestError
        );


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
        error
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}


export function useEventsContext() {

  const context =
    useContext(
      EventsContext
    );


  if (!context) {

    throw new Error(
      "useEventsContext must be used inside EventsProvider"
    );
  }


  return context;
}