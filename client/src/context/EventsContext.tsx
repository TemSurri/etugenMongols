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


        const response =
          await api.get<ApiEvent[]>(
            "/events"
          );


        if (!active) {
          return;
        }


        setEvents(
          response.data
        );

      } catch {

        if (!active) {
          return;
        }


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