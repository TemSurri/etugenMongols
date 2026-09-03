import {
    useCallback,
    useState
} from "react";

import {
    api
} from "../../../api/client";

import type {
    AdminRegistration
} from "../types";


export function useEventRegistrations() {

    const [
        registrations,
        setRegistrations
    ] =
        useState<
            AdminRegistration[]
        >([]);


    const [
        loading,
        setLoading
    ] =
        useState(false);


    const [
        error,
        setError
    ] =
        useState(false);


    const load =
        useCallback(
            async (
                eventId:
                    string
            ) => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        false
                    );


                    const response =
                        await api.get<
                            AdminRegistration[]
                        >(
                            `/event-registrations/admin/events/${eventId}`
                        );


                    setRegistrations(
                        response.data
                    );


                    return response.data;

                } catch (error) {

                    console.error(
                        "Failed to load event registrations:",
                        error
                    );


                    setError(
                        true
                    );


                    setRegistrations(
                        []
                    );


                    return [];

                } finally {

                    setLoading(
                        false
                    );

                }

            },
            []
        );


    const clear =
        useCallback(
            () => {

                setRegistrations(
                    []
                );

                setError(
                    false
                );

            },
            []
        );


    return {

        registrations,
        loading,
        error,

        load,
        clear
    };
}