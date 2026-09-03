// src/sections/users/registrations/components/RegistrationEventCard.tsx

import {
    useState
} from "react";

import type {
    UserEventRegistration
} from "../types/registrationTypes";

interface RegistrationCopy {
    attendees: string;
    registration: string;
    registrations: string;
    registered: string;
    cancelled: string;
    eventDate: string;
    location: string;

    showMore?: string;
    showLess?: string;
}

interface RegistrationEventCardProps {
    registrations:
        UserEventRegistration[];

    copy:
        RegistrationCopy;

    lang:
        "en" |
        "mn";
}

export function RegistrationEventCard({
    registrations,
    copy,
    lang
}: RegistrationEventCardProps) {

    const [
        descriptionOpen,
        setDescriptionOpen
    ] =
        useState(false);

    const event =
        registrations[0].event;

    const eventTitle =
        lang === "mn"
            ? event.titleMn
            : event.titleEn;

    const eventDescription =
        lang === "mn"
            ? event.descriptionMn
            : event.descriptionEn;

    const imageAlt =
        lang === "mn"
            ? (
                event.coverImageAltMn ??
                eventTitle
            )
            : (
                event.coverImageAltEn ??
                eventTitle
            );

    return (
        <article
            className="
                overflow-hidden
                rounded-xl
                border
                border-[#27301d]/10
                bg-[#f7f6f1]
            "
        >

            {event.coverImage && (
                <div
                    className="
                        h-48
                        w-full
                        overflow-hidden
                        bg-[#27301d]/5
                    "
                >
                    <img
                        src={
                            event.coverImage
                        }
                        alt={
                            imageAlt
                        }
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                </div>
            )}

            <div
                className="
                    p-5
                    sm:p-6
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                    "
                >

                    <div
                        className="
                            min-w-0
                            flex-1
                        "
                    >

                        <h3
                            className="
                                text-xl
                                font-semibold
                                text-[#27301d]
                            "
                        >
                            {eventTitle}
                        </h3>

                        {eventDescription && (
                            <div
                                className="
                                    mt-2
                                "
                            >

                                <p
                                    className={`
                                        max-w-2xl
                                        text-sm
                                        leading-6
                                        text-[#667056]

                                        ${
                                            descriptionOpen
                                                ? ""
                                                : "line-clamp-2"
                                        }
                                    `}
                                >
                                    {eventDescription}
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        () =>
                                            setDescriptionOpen(
                                                current =>
                                                    !current
                                            )
                                    }
                                    className="
                                        mt-1.5
                                        text-xs
                                        font-semibold
                                        text-[#8a7127]
                                        transition-colors
                                        duration-150

                                        hover:text-[#5f4d16]
                                    "
                                >
                                    {
                                        descriptionOpen
                                            ? (
                                                copy.showLess ??
                                                (
                                                    lang === "mn"
                                                        ? "Хураах"
                                                        : "Show less"
                                                )
                                            )
                                            : (
                                                copy.showMore ??
                                                (
                                                    lang === "mn"
                                                        ? "Дэлгэрэнгүй"
                                                        : "Show more"
                                                )
                                            )
                                    }
                                </button>

                            </div>
                        )}

                    </div>

                    <div
                        className="
                            shrink-0
                            rounded-lg
                            border
                            border-[#9a7b26]/20
                            bg-[#9a7b26]/10
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#7c651f]
                        "
                    >
                        {registrations.length}{" "}
                        {
                            registrations.length === 1
                                ? copy.registration
                                : copy.registrations
                        }
                    </div>

                </div>

                <div
                    className="
                        mt-5
                        grid
                        gap-3
                        border-t
                        border-[#27301d]/10
                        pt-5
                        sm:grid-cols-2
                    "
                >

                    <div>
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-[#9a7b26]
                            "
                        >
                            {copy.eventDate}
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-medium
                                text-[#27301d]
                            "
                        >
                            {
                                formatEventDate(
                                    event.startsAt,
                                    lang
                                )
                            }
                        </p>
                    </div>

                    <div>
                        <p
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-[#9a7b26]
                            "
                        >
                            {copy.location}
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                font-medium
                                text-[#27301d]
                            "
                        >
                            {event.location}
                        </p>
                    </div>

                </div>

                <div
                    className="
                        mt-5
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#9a7b26]
                        "
                    >
                        {copy.attendees}
                    </p>

                    <div
                        className="
                            mt-3
                            divide-y
                            divide-[#27301d]/10
                        "
                    >

                        {registrations.map(
                            registration => (
                                <div
                                    key={
                                        registration.id
                                    }
                                    className="
                                        flex
                                        flex-col
                                        gap-2
                                        py-3
                                        first:pt-0
                                        last:pb-0
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    "
                                >

                                    <div
                                        className="
                                            min-w-0
                                        "
                                    >
                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-[#27301d]
                                            "
                                        >
                                            {
                                                registration.firstName
                                            }{" "}
                                            {
                                                registration.lastName
                                            }
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                truncate
                                                text-xs
                                                text-[#667056]
                                            "
                                        >
                                            {
                                                registration.email
                                            }
                                        </p>
                                    </div>

                                    <RegistrationStatus
                                        status={
                                            registration.status
                                        }
                                        registeredCopy={
                                            copy.registered
                                        }
                                        cancelledCopy={
                                            copy.cancelled
                                        }
                                    />

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>

        </article>
    );
}

function RegistrationStatus({
    status,
    registeredCopy,
    cancelledCopy
}: {
    status:
        "REGISTERED" |
        "CANCELLED";

    registeredCopy:
        string;

    cancelledCopy:
        string;
}) {

    const registered =
        status === "REGISTERED";

    return (
        <span
            className={`
                inline-flex
                w-fit
                shrink-0
                rounded-md
                px-2.5
                py-1
                text-[11px]
                font-semibold

                ${
                    registered
                        ? "bg-[#e7ecdf] text-[#556247]"
                        : "bg-[#f2e4e1] text-[#8b4a42]"
                }
            `}
        >
            {
                registered
                    ? registeredCopy
                    : cancelledCopy
            }
        </span>
    );
}

function formatEventDate(
    value:
        string,
    lang:
        "en" |
        "mn"
) {

    return new Intl.DateTimeFormat(
        lang === "mn"
            ? "mn-MN"
            : "en-CA",
        {
            year:
                "numeric",
            month:
                "long",
            day:
                "numeric",
            hour:
                "numeric",
            minute:
                "2-digit"
        }
    ).format(
        new Date(
            value
        )
    );
}