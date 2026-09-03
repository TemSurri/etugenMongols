// src/sections/users/registrations/api/registrationsApi.ts

import {
    api
} from "../../../../api/client";

import type {
    UserEventRegistration
} from "../types/registrationTypes";

export async function getUserRegistrations() {

    const response =
        await api.get<
            UserEventRegistration[]
        >(
            "/event-registrations/user"
        );

    return response.data;
}