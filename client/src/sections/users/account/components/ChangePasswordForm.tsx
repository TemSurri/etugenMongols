import {
    useState,
    type FormEvent
} from "react";

import {
    useChangePassword
} from "../hooks/useChangePassword";

interface SecurityCopy {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    save: string;
    cancel: string;

    changing: string;
    success: string;

    incorrectPassword: string;
    mismatch: string;
    weakPassword: string;
    genericError: string;
}

interface ChangePasswordFormProps {
    copy: SecurityCopy;
    onCancel: () => void;
}

export function ChangePasswordForm({
    copy,
    onCancel
}: ChangePasswordFormProps) {

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const {
        submit,
        loading,
        error,
        success
    } = useChangePassword({
        passwordMismatchMessage:
            copy.mismatch,

        weakPasswordMessage:
            copy.weakPassword,

        incorrectPasswordMessage:
            copy.incorrectPassword,

        genericErrorMessage:
            copy.genericError
    });

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const changed = await submit({
            currentPassword,
            newPassword,
            confirmPassword
        });

        if (changed) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
        >

            <PasswordInput
                label={copy.currentPassword}
                value={currentPassword}
                onChange={setCurrentPassword}
                autoComplete="current-password"
            />

            <PasswordInput
                label={copy.newPassword}
                value={newPassword}
                onChange={setNewPassword}
                autoComplete="new-password"
            />

            <p className="text-xs leading-5 text-[#667056]">
                {copy.weakPassword}
            </p>

            <PasswordInput
                label={copy.confirmPassword}
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-700">
                    {copy.success}
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
                        !currentPassword ||
                        !newPassword ||
                        !confirmPassword
                    }
                    className="rounded-lg bg-[#27301d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9a7b26] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {
                        loading
                            ? copy.changing
                            : copy.save
                    }
                </button>

            </div>

        </form>
    );
}

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete: string;
}

function PasswordInput({
    label,
    value,
    onChange,
    autoComplete
}: PasswordInputProps) {

    return (
        <label className="block">

            <span className="mb-1 block text-sm font-medium text-[#27301d]">
                {label}
            </span>

            <input
                type="password"
                value={value}
                autoComplete={autoComplete}
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