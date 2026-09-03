"use client";

import {
    useState
} from "react";

import axios
    from "axios";

import EventRegistrantsModal
    from "./EventRegistrantsModal";

import type {
    ApiEvent,
    EventUpdateType
} from "../../types";


type Props = {

    event:
        ApiEvent;

    onEdit:
        () => void;

    updateEvent:
        (
            eventId:
                string,
            type:
                EventUpdateType,
            value:
                string | null
        ) => Promise<ApiEvent>;

    lang:
        "en" | "mn";
};


export default function AdminEventCard({
    event,
    onEdit,
    updateEvent,
    lang
}: Props) {

    const [
        registrantsOpen,
        setRegistrantsOpen
    ] =
        useState(false);


    const [
        changingPublished,
        setChangingPublished
    ] =
        useState(false);


    const [
        error,
        setError
    ] =
        useState<string | null>(
            null
        );


    async function togglePublished() {

        if (
            changingPublished
        ) {
            return;
        }


        try {

            setChangingPublished(
                true
            );

            setError(
                null
            );


            await updateEvent(
                event.id,
                "PUBLISHED",
                String(
                    !event.published
                )
            );

        } catch (error) {

            console.error(
                error
            );


            setError(
                getErrorMessage(
                    error,
                    lang
                )
            );

        } finally {

            setChangingPublished(
                false
            );

        }
    }


    return (
        <>

            <article
                className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#fffdf8]/95
                    shadow-lg
                    shadow-black/10
                "
            >

                <div
                    className="
                        grid

                        lg:grid-cols-[280px_minmax(0,1fr)]
                    "
                >

                    <div
                        className="
                            relative
                            min-h-[195px]
                            overflow-hidden
                            bg-[#27301d]

                            lg:min-h-[230px]
                        "
                    >

                        {event.coverImage ? (

                            <img
                                src={
                                    event.coverImage
                                }
                                alt={
                                    lang === "mn"
                                        ? event.coverImageAltMn ??
                                          event.titleMn
                                        : event.coverImageAltEn ??
                                          event.titleEn
                                }
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    ease-out
                                    group-hover:scale-[1.025]
                                "
                            />

                        ) : (

                            <div
                                className="
                                    flex
                                    h-full
                                    min-h-[195px]
                                    items-center
                                    justify-center
                                    text-sm
                                    text-white/50
                                "
                            >
                                {lang === "mn"
                                    ? "Зураг алга"
                                    : "No cover image"}
                            </div>

                        )}


                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/30
                                via-transparent
                                to-transparent
                            "
                        />


                        <span
                            className={`
                                absolute
                                left-4
                                top-4
                                rounded-lg
                                px-2.5
                                py-1.5
                                text-xs
                                font-medium
                                shadow-sm

                                ${
                                    event.published
                                        ? "bg-[#27301d]/90 text-white"
                                        : "bg-white/90 text-[#59634c]"
                                }
                            `}
                        >
                            {event.published
                                ? lang === "mn"
                                    ? "Нийтлэгдсэн"
                                    : "Published"
                                : lang === "mn"
                                    ? "Ноорог"
                                    : "Draft"}
                        </span>

                    </div>


                    <div
                        className="
                            flex
                            min-w-0
                            flex-col
                            justify-between
                            p-6
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4

                                    xl:flex-row
                                    xl:items-start
                                    xl:justify-between
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
                                            tracking-tight
                                            text-[#27301d]
                                        "
                                    >
                                        {lang === "mn"
                                            ? event.titleMn
                                            : event.titleEn}
                                    </h3>


                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-[#667056]
                                        "
                                    >
                                        {lang === "mn"
                                            ? event.titleEn
                                            : event.titleMn}
                                    </p>

                                </div>


                                <div
                                    className="
                                        flex
                                        shrink-0
                                        flex-wrap
                                        gap-2
                                    "
                                >

                                    <button
                                        type="button"
                                        onClick={
                                            onEdit
                                        }
                                        className="
                                            rounded-lg
                                            border
                                            border-[#27301d]/15
                                            bg-transparent
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-[#27301d]
                                            transition-colors
                                            duration-150
                                            hover:border-[#9a7b26]/45
                                            hover:bg-[#f2ecdf]
                                        "
                                    >
                                        {lang === "mn"
                                            ? "Засах"
                                            : "Edit"}
                                    </button>


                                    <button
                                        type="button"
                                        disabled={
                                            changingPublished
                                        }
                                        onClick={
                                            togglePublished
                                        }
                                        className="
                                            rounded-lg
                                            bg-[#27301d]
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-white
                                            transition-colors
                                            duration-150
                                            hover:bg-[#3b472d]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {
                                            changingPublished
                                                ? lang === "mn"
                                                    ? "Хадгалж байна..."
                                                    : "Saving..."
                                                : event.published
                                                    ? lang === "mn"
                                                        ? "Нуух"
                                                        : "Unpublish"
                                                    : lang === "mn"
                                                        ? "Нийтлэх"
                                                        : "Publish"
                                        }
                                    </button>

                                </div>

                            </div>


                            <div
                                className="
                                    mt-6
                                    grid
                                    gap-4

                                    sm:grid-cols-3
                                "
                            >

                                <Detail
                                    label={
                                        lang === "mn"
                                            ? "Огноо"
                                            : "Date"
                                    }
                                    value={
                                        formatDate(
                                            event.startsAt,
                                            lang
                                        )
                                    }
                                />


                                <Detail
                                    label={
                                        lang === "mn"
                                            ? "Байршил"
                                            : "Location"
                                    }
                                    value={
                                        event.location
                                    }
                                />


                                <Detail
                                    label={
                                        lang === "mn"
                                            ? "Бүртгэл"
                                            : "Registration"
                                    }
                                    value={
                                        getRegistrationText(
                                            event,
                                            lang
                                        )
                                    }
                                />

                            </div>

                        </div>


                        {error && (

                            <p
                                className="
                                    mt-4
                                    text-sm
                                    text-[#8b4a42]
                                "
                            >
                                {error}
                            </p>

                        )}


                        {event.registerable && (

                            <div
                                className="
                                    mt-5
                                    border-t
                                    border-[#27301d]/10
                                    pt-4
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setRegistrantsOpen(
                                            true
                                        )
                                    }
                                    className="
                                        rounded-md
                                        px-1
                                        py-1
                                        text-sm
                                        font-semibold
                                        text-[#9a7b26]
                                        transition-colors
                                        duration-150
                                        hover:text-[#27301d]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Бүртгүүлсэн хүмүүсийг харах →"
                                        : "View registrants →"}
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </article>


            <EventRegistrantsModal
                event={
                    event
                }
                open={
                    registrantsOpen
                }
                onClose={() =>
                    setRegistrantsOpen(
                        false
                    )
                }
                lang={
                    lang
                }
            />

        </>
    );
}


function Detail({
    label,
    value
}: {
    label:
        string;

    value:
        string;
}) {

    return (
        <div className="min-w-0">

            <p
                className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[#9a7b26]
                "
            >
                {label}
            </p>


            <p
                className="
                    mt-1
                    break-words
                    text-sm
                    leading-6
                    text-[#667056]
                "
            >
                {value}
            </p>

        </div>
    );
}


function getRegistrationText(
    event:
        ApiEvent,
    lang:
        "en" | "mn"
) {

    if (
        !event.registerable
    ) {
        return lang === "mn"
            ? "Хаалттай"
            : "Disabled";
    }


    if (
        event.registrationCost === 0
    ) {
        return lang === "mn"
            ? "Үнэгүй"
            : "Free";
    }


    if (
        event.registrationCost !== null
    ) {

        return `$${(
            event.registrationCost /
            100
        ).toFixed(2)} CAD`;
    }


    return lang === "mn"
        ? "Нээлттэй"
        : "Open";
}


function formatDate(
    value:
        string,
    lang:
        "en" | "mn"
) {

    return new Intl.DateTimeFormat(
        lang === "mn"
            ? "mn-MN"
            : "en-CA",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    ).format(
        new Date(
            value
        )
    );
}


function getErrorMessage(
    error:
        unknown,
    lang:
        "en" | "mn"
) {

    if (
        axios.isAxiosError(
            error
        ) &&
        error.response?.status === 403
    ) {

        return lang === "mn"
            ? "Танд энэ өөрчлөлтийг хийх эрх байхгүй."
            : "You do not have permission to make this change.";
    }


    return lang === "mn"
        ? "Арга хэмжээг шинэчилж чадсангүй."
        : "Could not update the event.";
}