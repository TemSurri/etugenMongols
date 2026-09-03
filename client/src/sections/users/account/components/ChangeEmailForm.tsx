import {
    useState,
    type FormEvent
} from "react";

import { useChangeEmail } from "../hooks/useChangeEmail";

interface SecurityCopy {
    newEmail: string;
    confirmEmail: string;

    changeEmail: string;
    changingEmail: string;

    emailSuccess: string;

    emailMismatch: string;
    invalidEmail: string;
    genericError: string;

    cancel: string;
}

interface ChangeEmailFormProps {
    copy: SecurityCopy;
    onCancel: () => void;
}

export function ChangeEmailForm({
    copy,
    onCancel
}: ChangeEmailFormProps) {

    const [
        newEmail,
        setNewEmail
    ] = useState("");

    const [
        confirmEmail,
        setConfirmEmail
    ] = useState("");

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

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const requested =
            await submit({
                newEmail,
                confirmEmail
            });

        if (requested) {
            setNewEmail("");
            setConfirmEmail("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <EmailField
                label={copy.newEmail}
                value={newEmail}
                onChange={setNewEmail}
                disabled={loading}
            />

            <EmailField
                label={copy.confirmEmail}
                value={confirmEmail}
                onChange={setConfirmEmail}
                disabled={loading}
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm font-medium text-green-700">
                    {copy.emailSuccess}
                </p>
            )}

            <div className="flex gap-3 pt-2">

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        rounded-lg
                        bg-[#27301d]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-[#9a7b26]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {
                        loading
                            ? copy.changingEmail
                            : copy.changeEmail
                    }
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        rounded-lg
                        border
                        border-[#27301d]/20
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-[#27301d]
                        transition
                        hover:bg-[#27301d]/5
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {copy.cancel}
                </button>

            </div>

        </form>
    );
}

interface EmailFieldProps {
    label: string;
    value: string;

    onChange: (
        value: string
    ) => void;

    disabled: boolean;
}

function EmailField({
    label,
    value,
    onChange,
    disabled
}: EmailFieldProps) {

    return (
        <label className="block">

            <span className="mb-1 block text-sm font-medium text-[#27301d]">
                {label}
            </span>

            <input
                type="email"
                value={value}
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                autoComplete="email"
                disabled={disabled}
                required
                className="
                    w-full
                    rounded-lg
                    border
                    border-[#27301d]/20
                    px-3
                    py-2
                    outline-none
                    transition
                    focus:border-[#27301d]/50
                    focus:ring-2
                    focus:ring-[#27301d]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            />

        </label>
    );
}