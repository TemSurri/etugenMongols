import {
    api
} from "../../../../api/client";

import type {
    ChangeEmailRequest,
    ChangeNameRequest,
    ChangePasswordRequest
} from "../types/accountTypes";

export async function changeName(
    request: ChangeNameRequest
): Promise<void> {

    await api.post(
        "/auth/user/update-name",
        request
    );
}

export async function changePassword(
    request: ChangePasswordRequest
): Promise<void> {

    await api.post(
        "/auth/user/update-password",
        request
    );
}

export async function changeEmail(
    request: ChangeEmailRequest
): Promise<void> {

    await api.post(
        "/auth/user/update-email",
        request
    );

}


import type {
    UserHistoryPage
} from "../types/accountTypes";

export async function getUserHistory(
    page: number,
    size: number
): Promise<UserHistoryPage> {

    const response =
        await api.get<UserHistoryPage>(
            "/auth/user/history",
            {
                params: {
                    page,
                    size
                }
            }
        );

    return response.data;
}