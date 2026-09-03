// src/sections/users/registrations/hooks/useUserRegistrations.ts

import {
    useCallback,
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    getUserRegistrations
} from "../api/registrationsApi";

import type {
    UserEventRegistration
} from "../types/registrationTypes";

export function useUserRegistrations() {

    const [
        registrations,
        setRegistrations
    ] =
        useState<
            UserEventRegistration[]
        >([]);

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

    const load =
        useCallback(
            async () => {

                setLoading(true);
                setError(false);

                try {

                    const result =
                        await getUserRegistrations();

                    setRegistrations(
                        result
                    );

                } catch (err) {

                    if (
                        axios.isAxiosError(err)
                    ) {

                        console.error(
                            "Failed to load registrations:",
                            err.response?.status
                        );

                    } else {

                        console.error(
                            "Failed to load registrations:",
                            err
                        );

                    }

                    setRegistrations([]);
                    setError(true);

                } finally {

                    setLoading(false);

                }
            },
            []
        );

    useEffect(
        () => {

            void load();

        },
        [
            load
        ]
    );

    return {
        registrations,
        loading,
        error,
        reload: load
    };
}