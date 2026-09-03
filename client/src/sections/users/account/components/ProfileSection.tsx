import { useState } from "react";

import { ChangeNameForm } from "./ChangeNameForm";

import type {
    AccountUser
} from "../types/accountTypes";

interface ProfileCopy {
    title: string;

    firstName: string;
    lastName: string;
    email: string;
    memberSince: string;
    emailStatus: string;

    verified: string;
    notVerified: string;

    editName: string;

    save: string;
    cancel: string;

    changingName: string;
    nameSuccess: string;

    invalidName: string;
    genericError: string;
}

interface ProfileSectionProps {
    user: AccountUser;
    copy: ProfileCopy;

    onUserChanged?: () => void;
}

export function ProfileSection({
    user,
    copy,
    onUserChanged
}: ProfileSectionProps) {

    const [editingName, setEditingName] =
        useState(false);

    const createdDate =
        new Date(
            user.createdAt
        ).toLocaleDateString();

    return (
        <section className="rounded-2xl border border-[#27301d]/10 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-4">

                <h2 className="text-xl font-semibold text-[#27301d]">
                    {copy.title}
                </h2>

                {!editingName && (
                    <button
                        type="button"
                        onClick={() =>
                            setEditingName(true)
                        }
                        className="rounded-lg border border-[#27301d]/20 px-4 py-2 text-sm font-medium text-[#27301d] transition hover:bg-[#27301d] hover:text-white"
                    >
                        {copy.editName}
                    </button>
                )}

            </div>

            {editingName ? (

                <ChangeNameForm
                    firstName={user.firstName}
                    lastName={user.lastName}
                    copy={copy}
                    onCancel={() =>
                        setEditingName(false)
                    }
                    onSuccess={() => {
                        onUserChanged?.();
                        setEditingName(false);
                    }}
                />

            ) : (

                <div className="mt-6 divide-y divide-[#27301d]/10">

                    <ProfileRow
                        label={copy.firstName}
                        value={user.firstName}
                    />

                    <ProfileRow
                        label={copy.lastName}
                        value={user.lastName}
                    />

                    <ProfileRow
                        label={copy.email}
                        value={user.email}
                    />

                    <ProfileRow
                        label={copy.memberSince}
                        value={createdDate}
                    />

                    <ProfileRow
                        label={copy.emailStatus}
                        value={
                            user.verified
                                ? copy.verified
                                : copy.notVerified
                        }
                    />

                </div>

            )}

        </section>
    );
}

interface ProfileRowProps {
    label: string;
    value: string;
}

function ProfileRow({
    label,
    value
}: ProfileRowProps) {

    return (
        <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">

            <span className="text-sm font-medium text-[#667056]">
                {label}
            </span>

            <span className="text-sm font-medium text-[#27301d]">
                {value}
            </span>

        </div>
    );
}