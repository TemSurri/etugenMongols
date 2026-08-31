import { useState } from "react";
import axios from "axios";

import { changeName } from "../api/accountApi";

import type {
    ChangeNameFormData
} from "../types/accountTypes";

interface UseChangeNameOptions {
    invalidNameMessage: string;
    genericErrorMessage: string;
}

export function useChangeName({
    invalidNameMessage,
    genericErrorMessage
}: UseChangeNameOptions) {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [success, setSuccess] =
        useState(false);

    const submit = async (
        form: ChangeNameFormData
    ): Promise<boolean> => {

        setError(null);
        setSuccess(false);

        const firstName =
            form.firstName.trim();

        const lastName =
            form.lastName.trim();

        if (
            firstName.length === 0 ||
            lastName.length === 0
        ) {
            setError(
                invalidNameMessage
            );

            return false;
        }

        setLoading(true);

        try {

            await changeName({
                firstName,
                lastName
            });

            setSuccess(true);

            return true;

        } catch (err) {

            if (axios.isAxiosError(err)) {
                setError(
                    genericErrorMessage
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