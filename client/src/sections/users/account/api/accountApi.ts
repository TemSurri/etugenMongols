import { api } from "../../../../api/client";

import type {
    ChangeEmailRequest,
    ChangeNameRequest,
    ChangePasswordRequest
} from "../types/accountTypes";

export async function changeName(
    request: ChangeNameRequest
): Promise<void> {
    await api.patch(
        "/users/change_name",
        request
    );
}

export async function changePassword(
    request: ChangePasswordRequest
): Promise<void> {
    await api.patch(
        "/users/change_password",
        request
    );
}

export async function changeEmail(
    request: ChangeEmailRequest
): Promise<void> {
    await api.patch(
        "/users/change_email",
        request
    );
}