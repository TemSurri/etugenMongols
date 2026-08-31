import {
    useState,
    type FormEvent
} from "react";

import { useChangeName } from "../hooks/useChangeName";

interface ProfileCopy {
    firstName: string;
    lastName: string;

    save: string;
    cancel: string;

    changingName: string;
    nameSuccess: string;

    invalidName: string;
    genericError: string;
}

interface ChangeNameFormProps {
    firstName: string;
    lastName: string;

    copy: ProfileCopy;

    onCancel: () => void;
    onSuccess?: () => void;
}

export function ChangeNameForm({
    firstName,
    lastName,
    copy,
    onCancel,
    onSuccess
}: ChangeNameFormProps) {

    const [newFirstName, setNewFirstName] =
        useState(firstName);

    const [newLastName, setNewLastName] =
        useState(lastName);

    const {
        submit,
        loading,
        error,
        success
    } = useChangeName({
        invalidNameMessage:
            copy.invalidName,

        genericErrorMessage:
            copy.genericError
    });

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const changed = await submit({
            firstName: newFirstName,
            lastName: newLastName
        });

        if (changed) {
            onSuccess?.();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
        >

            <NameInput
                label={copy.firstName}
                value={newFirstName}
                onChange={setNewFirstName}
                autoComplete="given-name"
            />

            <NameInput
                label={copy.lastName}
                value={newLastName}
                onChange={setNewLastName}
                autoComplete="family-name"
            />

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-700">
                    {copy.nameSuccess}
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
                        !newFirstName.trim() ||
                        !newLastName.trim()
                    }
                    className="rounded-lg bg-[#27301d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9a7b26] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {
                        loading
                            ? copy.changingName
                            : copy.save
                    }
                </button>

            </div>

        </form>
    );
}

interface NameInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete: string;
}

function NameInput({
    label,
    value,
    onChange,
    autoComplete
}: NameInputProps) {

    return (
        <label className="block">

            <span className="mb-1 block text-sm font-medium text-[#27301d]">
                {label}
            </span>

            <input
                type="text"
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