import { useState } from "react";

import {
    ChangePasswordForm
} from "./ChangePasswordForm";

import {
    ChangeEmailForm
} from "./ChangeEmailForm";

interface SecurityCopy {
    title: string;

    email: string;
    changeEmail: string;

    password: string;
    passwordValue: string;
    changePassword: string;

    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    newEmail: string;
    confirmEmail: string;

    save: string;
    cancel: string;

    changing: string;
    success: string;

    changingEmail: string;
    emailSuccess: string;

    incorrectPassword: string;
    mismatch: string;
    weakPassword: string;

    emailMismatch: string;
    invalidEmail: string;

    genericError: string;
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
        changingPassword,
        setChangingPassword
    ] = useState(false);

    const [
        changingEmail,
        setChangingEmail
    ] = useState(false);

    return (
        <section className="rounded-2xl border border-[#27301d]/10 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-[#27301d]">
                {copy.title}
            </h2>

            <div className="mt-6 divide-y divide-[#27301d]/10">

                {/* Email */}
                <div className="py-5 first:pt-0">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-medium text-[#667056]">
                                {copy.email}
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#27301d]">
                                {email}
                            </p>

                        </div>

                        {!changingEmail && (
                            <button
                                type="button"
                                onClick={() => {
                                    setChangingPassword(false);
                                    setChangingEmail(true);
                                }}
                                className="rounded-lg border border-[#27301d]/20 px-4 py-2 text-sm font-medium text-[#27301d] transition hover:bg-[#27301d] hover:text-white"
                            >
                                {copy.changeEmail}
                            </button>
                        )}

                    </div>

                    {changingEmail && (
                        <ChangeEmailForm
                            copy={copy}
                            onCancel={() =>
                                setChangingEmail(false)
                            }
                        />
                    )}

                </div>

                {/* Password */}
                <div className="py-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-sm font-medium text-[#667056]">
                                {copy.password}
                            </p>

                            <p className="mt-1 tracking-widest text-[#27301d]">
                                {copy.passwordValue}
                            </p>

                        </div>

                        {!changingPassword && (
                            <button
                                type="button"
                                onClick={() => {
                                    setChangingEmail(false);
                                    setChangingPassword(true);
                                }}
                                className="rounded-lg border border-[#27301d]/20 px-4 py-2 text-sm font-medium text-[#27301d] transition hover:bg-[#27301d] hover:text-white"
                            >
                                {copy.changePassword}
                            </button>
                        )}

                    </div>

                    {changingPassword && (
                        <ChangePasswordForm
                            copy={copy}
                            onCancel={() =>
                                setChangingPassword(false)
                            }
                        />
                    )}

                </div>

            </div>

        </section>
    );
}