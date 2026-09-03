// src/sections/users/registrations/components/RegistrationsSection.tsx

import {
    useMemo
} from "react";

import {
    useLanguage
} from "../../../../context/LanguageContext";

import {
    useUserRegistrations
} from "../hooks/useUserRegistrations";

import {
    RegistrationEventCard
} from "./RegistrationEventCard";

interface RegistrationsSectionCopy {
    title: string;
    description: string;

    loading: string;

    error: string;
    retry: string;

    emptyTitle: string;
    emptyBody: string;

    attendees: string;

    registration: string;
    registrations: string;

    registered: string;
    cancelled: string;

    eventDate: string;
    location: string;
}

interface RegistrationsSectionProps {
    copy:
        RegistrationsSectionCopy;
}

export function RegistrationsSection({
    copy
}: RegistrationsSectionProps) {

    const {
        lang
    } =
        useLanguage();

    const {
        registrations,
        loading,
        error,
        reload
    } =
        useUserRegistrations();

    const groupedRegistrations =
        useMemo(
            () => {

                const grouped =
                    new Map<
                        string,
                        typeof registrations
                    >();

                for (
                    const registration
                    of registrations
                ) {

                    const eventId =
                        registration.event.id;

                    const existing =
                        grouped.get(
                            eventId
                        );

                    if (existing) {

                        existing.push(
                            registration
                        );

                    } else {

                        grouped.set(
                            eventId,
                            [
                                registration
                            ]
                        );
                    }
                }

                return Array.from(
                    grouped.values()
                );

            },
            [
                registrations
            ]
        );

    return (
        <section
            className="
                rounded-2xl
                border
                border-[#27301d]/10
                bg-white
                p-6
                shadow-sm
                sm:p-7
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-2
                "
            >
                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    {copy.title}
                </h2>

                <p
                    className="
                        max-w-2xl
                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {copy.description}
                </p>
            </div>

            <div
                className="
                    mt-6
                    border-t
                    border-[#27301d]/10
                    pt-6
                "
            >

                {loading && (
                    <LoadingState
                        text={
                            copy.loading
                        }
                    />
                )}

                {!loading &&
                    error && (
                        <ErrorState
                            text={
                                copy.error
                            }
                            retryText={
                                copy.retry
                            }
                            onRetry={
                                reload
                            }
                        />
                    )}

                {!loading &&
                    !error &&
                    groupedRegistrations.length === 0 && (
                        <EmptyState
                            title={
                                copy.emptyTitle
                            }
                            body={
                                copy.emptyBody
                            }
                        />
                    )}

                {!loading &&
                    !error &&
                    groupedRegistrations.length > 0 && (

                        <div
                            className="
                                space-y-5
                            "
                        >
                            {groupedRegistrations.map(
                                group => (
                                    <RegistrationEventCard
                                        key={
                                            group[0].event.id
                                        }
                                        registrations={
                                            group
                                        }
                                        copy={{
                                            attendees:
                                                copy.attendees,

                                            registration:
                                                copy.registration,

                                            registrations:
                                                copy.registrations,

                                            registered:
                                                copy.registered,

                                            cancelled:
                                                copy.cancelled,

                                            eventDate:
                                                copy.eventDate,

                                            location:
                                                copy.location
                                        }}
                                        lang={
                                            lang
                                        }
                                    />
                                )
                            )}
                        </div>

                    )}

            </div>

        </section>
    );
}

function LoadingState({
    text
}: {
    text:
        string;
}) {

    return (
        <div
            className="
                rounded-xl
                border
                border-[#27301d]/10
                bg-[#f7f6f1]
                px-5
                py-8
            "
        >
            <p
                className="
                    text-sm
                    text-[#667056]
                "
            >
                {text}
            </p>
        </div>
    );
}

function ErrorState({
    text,
    retryText,
    onRetry
}: {
    text:
        string;

    retryText:
        string;

    onRetry:
        () => void;
}) {

    return (
        <div
            className="
                rounded-xl
                border
                border-[#27301d]/10
                bg-[#f7f6f1]
                px-5
                py-7
            "
        >

            <p
                className="
                    text-sm
                    text-[#667056]
                "
            >
                {text}
            </p>

            <button
                type="button"
                onClick={
                    onRetry
                }
                className="
                    mt-4
                    rounded-lg
                    border
                    border-[#27301d]/15
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#27301d]
                    transition-colors
                    duration-150

                    hover:border-[#9a7b26]/30
                    hover:bg-[#f3efe4]
                "
            >
                {retryText}
            </button>

        </div>
    );
}

function EmptyState({
    title,
    body
}: {
    title:
        string;

    body:
        string;
}) {

    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-[#27301d]/10
                bg-[#f7f6f1]
                px-5
                py-7
                sm:px-6
                sm:py-8
            "
        >

            <div
                className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-1
                    bg-[#9a7b26]
                "
            />

            <div
                className="
                    pl-2
                "
            >

                <h3
                    className="
                        text-lg
                        font-semibold
                        text-[#27301d]
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {body}
                </p>

            </div>

        </div>
    );
}