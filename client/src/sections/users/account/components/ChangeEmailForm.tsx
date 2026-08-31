import {
    useState,
    type FormEvent
} from "react";

import {
    useChangeEmail
} from "../hooks/useChangeEmail";

interface SecurityCopy {
    newEmail: string;
    confirmEmail: string;

    save: string;
    cancel: string;

    changingEmail: string;

    emailSuccess: string;

    emailMismatch: string;
    invalidEmail: string;
    genericError: string;
}

interface ChangeEmailFormProps {
    copy: SecurityCopy;
    onCancel: () => void;
}

export function ChangeEmailForm({
    copy,
    onCancel
}: ChangeEmailFormProps) {

    const [newEmail, setNewEmail] =
        useState("");

    const [confirmEmail, setConfirmEmail] =
        useState("");

    const {
        submit,
        loading,
        error,
        success
    } = useChangeEmail({
        emailMismatchMessage:
            copy.emailMismatch,

        invalidEmailMessage:
            copy.invalidEmail,

        genericErrorMessage:
            copy.genericError
    });

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const sent = await submit({
            newEmail,
            confirmEmail
        });

        if (sent) {
            setNewEmail("");
            setConfirmEmail("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
        >

            <EmailInput
                label={copy.newEmail}
                value={newEmail}
                onChange={setNewEmail}
            />

            <EmailInput
                label={copy.confirmEmail}
                value={confirmEmail}
                onChange={setConfirmEmail}
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm leading-6 text-green-700">
                    {copy.emailSuccess}
                </p>
            )}

            <div className="flex justify-end gap-3 pt-2">

                <button
                    type="button"
                    disabled={loading}
                    onClick={onCancel}
                    className="rounded-lg border border-[#27301d]/20 px-4 py-2 text-sm font-medium text-[#27301d] transition hover:bg-[#27301d]/5 disabled:opacity-50"
                >
                    {copy.cancel}
                </button>

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !newEmail ||
                        !confirmEmail
                    }
                    className="rounded-lg bg-[#27301d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9a7b26] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {
                        loading
                            ? copy.changingEmail
                            : copy.save
                    }
                </button>

            </div>

        </form>
    );
}

interface EmailInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

function EmailInput({
    label,
    value,
    onChange
}: EmailInputProps) {

    return (
        <label className="block">

            <span className="mb-1 block text-sm font-medium text-[#27301d]">
                {label}
            </span>

            <input
                type="email"
                value={value}
                autoComplete="email"
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className="w-full rounded-lg border border-[#27301d]/20 px-3 py-2 outline-none transition focus:border-[#27301d]/50 focus:ring-2 focus:ring-[#27301d]/10"
            />

        </label>
    );
}