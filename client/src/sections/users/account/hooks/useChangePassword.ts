import { useState } from "react";
import axios from "axios";

import { changePassword } from "../api/accountApi";

import type {
    ChangePasswordFormData
} from "../types/accountTypes";

interface UseChangePasswordOptions {
    passwordMismatchMessage: string;
    weakPasswordMessage: string;
    incorrectPasswordMessage: string;
    genericErrorMessage: string;
}

function isValidPassword(
    password: string
): boolean {

    const hasMinLength =
        password.length >= 8;

    const hasUppercase =
        /[A-Z]/.test(password);

    const hasNumberOrSpecial =
        /[0-9]|[^A-Za-z0-9]/.test(password);

    return (
        hasMinLength &&
        hasUppercase &&
        hasNumberOrSpecial
    );
}

export function useChangePassword({
    passwordMismatchMessage,
    weakPasswordMessage,
    incorrectPasswordMessage,
    genericErrorMessage
}: UseChangePasswordOptions) {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [success, setSuccess] =
        useState(false);

    const submit = async (
        form: ChangePasswordFormData
    ): Promise<boolean> => {

        setError(null);
        setSuccess(false);

        if (
            form.newPassword !==
            form.confirmPassword
        ) {

            setError(
                passwordMismatchMessage
            );

            return false;
        }

        if (
            !isValidPassword(
                form.newPassword
            )
        ) {

            setError(
                weakPasswordMessage
            );

            return false;
        }

        setLoading(true);

        try {

            await changePassword({
                currentPassword:
                    form.currentPassword,

                newPassword:
                    form.newPassword
            });

            setSuccess(true);

            return true;

        } catch (err) {

            if (
                axios.isAxiosError(err) &&
                err.response?.status === 400
            ) {

                setError(
                    incorrectPasswordMessage
                );

            } else {

                setError(
                    genericErrorMessage
                );

            }

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