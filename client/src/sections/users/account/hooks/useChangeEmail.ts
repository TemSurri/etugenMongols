import { useState } from "react";

import { changeEmail } from "../api/accountApi";

import type {
    ChangeEmailFormData
} from "../types/accountTypes";

interface UseChangeEmailOptions {
    emailMismatchMessage: string;
    invalidEmailMessage: string;
    genericErrorMessage: string;
}

function isValidEmail(
    email: string
): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}

export function useChangeEmail({
    emailMismatchMessage,
    invalidEmailMessage,
    genericErrorMessage
}: UseChangeEmailOptions) {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [success, setSuccess] =
        useState(false);

    const submit = async (
        form: ChangeEmailFormData
    ): Promise<boolean> => {

        setError(null);
        setSuccess(false);

        const newEmail =
            form.newEmail
                .trim()
                .toLowerCase();

        const confirmEmail =
            form.confirmEmail
                .trim()
                .toLowerCase();

        if (
            newEmail !==
            confirmEmail
        ) {

            setError(
                emailMismatchMessage
            );

            return false;
        }

        if (
            !isValidEmail(
                newEmail
            )
        ) {

            setError(
                invalidEmailMessage
            );

            return false;
        }

        setLoading(true);

        try {

            await changeEmail({
                newEmail
            });

            setSuccess(true);

            return true;

        } catch {

            setError(
                genericErrorMessage
            );

            return false;

        } finally {

            setLoading(false);

        }
    };

    return {
        submit,
        loading,
        error,
        success
    };
}