import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  api
} from "../../../api/client";

import type {
  ApiEvent,
  EventCreateRequest,
  EventUpdateType
} from "../types";


export function useAdminEvents() {

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


  const loadEvents =
    useCallback(
      async () => {

        try {

          setLoading(true);
          setError(false);


          const response =
            await api.get<ApiEvent[]>(
              "/events/admin"
            );


          setEvents(
            response.data
          );

        } catch (error) {

          console.error(
            "Failed to load admin events:",
            error
          );

          setError(true);

        } finally {

          setLoading(false);

        }

      },
      []
    );


  useEffect(() => {

    void loadEvents();

  }, [loadEvents]);


  const createEvent =
    useCallback(
      async (
        request:
          EventCreateRequest
      ) => {

        const response =
          await api.post<ApiEvent>(
            "/events",
            request
          );


        setEvents(
          current => [
            response.data,
            ...current
          ]
        );


        return response.data;

      },
      []
    );


  const updateEvent =
    useCallback(
      async (
        eventId: string,
        type: EventUpdateType,
        value: string | null
      ) => {

        const response =
          await api.patch<ApiEvent>(
            `/events/${eventId}`,
            {
              type,
              value
            }
          );


        setEvents(
          current =>
            current.map(
              event =>
                event.id === eventId
                  ? response.data
                  : event
            )
        );


        return response.data;

      },
      []
    );


  const updateRegistration =
    useCallback(
      async (
        eventId: string,
        registerable: boolean,
        registrationCost: number | null
      ) => {

        const response =
          await api.patch<ApiEvent>(
            `/events/${eventId}/registration`,
            {
              registerable,
              registrationCost
            }
          );


        setEvents(
          current =>
            current.map(
              event =>
                event.id === eventId
                  ? response.data
                  : event
            )
        );


        return response.data;

      },
      []
    );


  const publishedCount =
    useMemo(
      () =>
        events.filter(
          event =>
            event.published
        ).length,
      [events]
    );


  const draftCount =
    events.length -
    publishedCount;


  return {

    events,

    loading,
    error,

    publishedCount,
    draftCount,

    createEvent,
    updateEvent,
    updateRegistration,

    reload:
      loadEvents
  };
}