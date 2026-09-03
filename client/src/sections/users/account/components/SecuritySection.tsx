import { useState } from "react";

import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangeEmailForm } from "./ChangeEmailForm";

interface SecurityCopy {
    title: string;

    email: string;

    changeEmail: string;
    changePassword: string;

    newEmail: string;
    confirmEmail: string;

    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    changingEmail: string;
    changingPassword: string;

    emailSuccess: string;
    passwordSuccess: string;

    emailMismatch: string;
    invalidEmail: string;

    passwordMismatch: string;
    weakPassword: string;
    incorrectPassword: string;

    genericError: string;

    show: string;
    hide: string;

    cancel: string;
}

interface SecuritySectionProps {
    email: string;
    copy: SecurityCopy;
}

export function SecuritySection({
    email,
    copy
}: SecuritySectionProps) {

    const [
        editingEmail,
        setEditingEmail
    ] = useState(false);

    const [
        editingPassword,
        setEditingPassword
    ] = useState(false);

    return (
        <section className="rounded-2xl border border-[#27301d]/10 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#27301d]">
                {copy.title}
            </h2>

            <div className="mt-6 divide-y divide-[#27301d]/10">

                <div className="py-4">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-medium text-[#667056]">
                                {copy.email}
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#27301d]">
                                {email}
                            </p>
                        </div>

                        {!editingEmail && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingEmail(true);
                                    setEditingPassword(false);
                                }}
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
                                    hover:bg-[#27301d]
                                    hover:text-white
                                "
                            >
                                {copy.changeEmail}
                            </button>
                        )}

                    </div>

                    {editingEmail && (
                        <div className="mt-5">

                            <ChangeEmailForm
                                copy={copy}
                                onCancel={() =>
                                    setEditingEmail(false)
                                }
                            />

                        </div>
                    )}

                </div>

                <div className="py-4">

                    <div className="flex items-center justify-between gap-4">

                        <p className="text-sm font-medium text-[#667056]">
                            {copy.changePassword}
                        </p>

                        {!editingPassword && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingPassword(true);
                                    setEditingEmail(false);
                                }}
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
                                    hover:bg-[#27301d]
                                    hover:text-white
                                "
                            >
                                {copy.changePassword}
                            </button>
                        )}

                    </div>

                    {editingPassword && (
                        <div className="mt-5">

                            <ChangePasswordForm
                                copy={copy}
                                onCancel={() =>
                                    setEditingPassword(false)
                                }
                            />

                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}