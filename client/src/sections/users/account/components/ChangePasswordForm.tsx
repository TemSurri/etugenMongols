import {
    useState,
    type FormEvent
} from "react";

import { useChangePassword } from "../hooks/useChangePassword";

interface SecurityCopy {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    changePassword: string;
    changingPassword: string;

    passwordSuccess: string;

    passwordMismatch: string;
    weakPassword: string;
    incorrectPassword: string;
    genericError: string;

    show: string;
    hide: string;
    cancel: string;
}

interface ChangePasswordFormProps {
    copy: SecurityCopy;
    onCancel: () => void;
}

export function ChangePasswordForm({
    copy,
    onCancel
}: ChangePasswordFormProps) {

    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");

    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const [
        showCurrentPassword,
        setShowCurrentPassword
    ] = useState(false);

    const [
        showNewPassword,
        setShowNewPassword
    ] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword
    ] = useState(false);

    const {
        submit,
        loading,
        error,
        success
    } = useChangePassword({
        passwordMismatchMessage:
            copy.passwordMismatch,

        weakPasswordMessage:
            copy.weakPassword,

        incorrectPasswordMessage:
            copy.incorrectPassword,

        genericErrorMessage:
            copy.genericError
    });

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const changed =
            await submit({
                currentPassword,
                newPassword,
                confirmPassword
            });

        if (changed) {

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <PasswordField
                label={copy.currentPassword}
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={showCurrentPassword}
                onToggle={() =>
                    setShowCurrentPassword(
                        current => !current
                    )
                }
                showText={copy.show}
                hideText={copy.hide}
                autoComplete="current-password"
                disabled={loading}
            />

            <PasswordField
                label={copy.newPassword}
                value={newPassword}
                onChange={setNewPassword}
                visible={showNewPassword}
                onToggle={() =>
                    setShowNewPassword(
                        current => !current
                    )
                }
                showText={copy.show}
                hideText={copy.hide}
                autoComplete="new-password"
                disabled={loading}
            />

            <PasswordField
                label={copy.confirmPassword}
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                onToggle={() =>
                    setShowConfirmPassword(
                        current => !current
                    )
                }
                showText={copy.show}
                hideText={copy.hide}
                autoComplete="new-password"
                disabled={loading}
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm font-medium text-green-700">
                    {copy.passwordSuccess}
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
                            ? copy.changingPassword
                            : copy.changePassword
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

interface PasswordFieldProps {
    label: string;
    value: string;

    onChange: (
        value: string
    ) => void;

    visible: boolean;
    onToggle: () => void;

    showText: string;
    hideText: string;

    autoComplete: string;
    disabled: boolean;
}

function PasswordField({
    label,
    value,
    onChange,
    visible,
    onToggle,
    showText,
    hideText,
    autoComplete,
    disabled
}: PasswordFieldProps) {

    return (
        <label className="block">

            <span className="mb-1 block text-sm font-medium text-[#27301d]">
                {label}
            </span>

            <div className="relative">

                <input
                    type={
                        visible
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }
                    autoComplete={autoComplete}
                    disabled={disabled}
                    required
                    className="
                        w-full
                        rounded-lg
                        border
                        border-[#27301d]/20
                        px-3
                        py-2
                        pr-16
                        outline-none
                        transition
                        focus:border-[#27301d]/50
                        focus:ring-2
                        focus:ring-[#27301d]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-xs
                        font-semibold
                        text-[#667056]
                        transition
                        hover:text-[#9a7b26]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {
                        visible
                            ? hideText
                            : showText
                    }
                </button>

            </div>

        </label>
    );
}