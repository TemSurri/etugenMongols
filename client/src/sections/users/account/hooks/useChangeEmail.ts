import { useState } from "react";
import axios from "axios";

import {
    changeEmail
} from "../api/accountApi";

import type {
    ChangeEmailFormData
} from "../types/accountTypes";


interface UseChangeEmailOptions {
    emailMismatchMessage: string;
    invalidEmailMessage: string;
    genericErrorMessage: string;
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


    async function submit(
        form: ChangeEmailFormData
    ): Promise<boolean> {

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
            !newEmail ||
            !confirmEmail
        ) {

            setError(
                invalidEmailMessage
            );

            return false;
        }


        if (
            newEmail !== confirmEmail
        ) {

            setError(
                emailMismatchMessage
            );

            return false;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(newEmail)
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

        } catch (err) {

            if (
                axios.isAxiosError(err) &&
                err.response?.status === 409
            ) {

                setError(
                    "That email address is already in use."
                );

                return false;
            }


            setError(
                genericErrorMessage
            );

            return false;

        } finally {

            setLoading(false);

        }

    }


    return {
        submit,
        loading,
        error,
        success
    };

}