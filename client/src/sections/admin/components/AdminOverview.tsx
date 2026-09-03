import {
    useEffect,
    useMemo,
    useState
} from "react";

import type {
    UserHistoryItem
} from "../../users/account/types/accountTypes";

import type {
    ApiEvent
} from "../types";


const ACTIVITY_PAGE_SIZE =
    5;


type Props = {

    events:
        ApiEvent[];

    publishedCount:
        number;

    draftCount:
        number;

    eventsLoading:
        boolean;

    activity:
        UserHistoryItem[];

    activityLoading:
        boolean;

    activityError:
        boolean;

    lang:
        "en" | "mn";
};


export default function AdminOverview({
    events,
    publishedCount,
    draftCount,
    eventsLoading,
    activity,
    activityLoading,
    activityError,
    lang
}: Props) {

    const [
        activityPage,
        setActivityPage
    ] =
        useState(0);


    const totalActivityPages =
        Math.max(
            1,
            Math.ceil(
                activity.length /
                ACTIVITY_PAGE_SIZE
            )
        );


    const visibleActivity =
        useMemo(
            () => {

                const start =
                    activityPage *
                    ACTIVITY_PAGE_SIZE;


                return activity.slice(
                    start,
                    start +
                    ACTIVITY_PAGE_SIZE
                );

            },
            [
                activity,
                activityPage
            ]
        );


    useEffect(
        () => {

            if (
                activityPage >=
                totalActivityPages
            ) {

                setActivityPage(
                    Math.max(
                        0,
                        totalActivityPages -
                        1
                    )
                );

            }

        },
        [
            activityPage,
            totalActivityPages
        ]
    );


    const canGoPrevious =
        activityPage > 0;


    const canGoNext =
        activityPage <
        totalActivityPages - 1;


    return (
        <div>

            <div
                className="
                    grid
                    gap-4

                    sm:grid-cols-3
                "
            >

                <StatCard
                    label={
                        lang === "mn"
                            ? "Нийт арга хэмжээ"
                            : "Total Events"
                    }
                    value={
                        eventsLoading
                            ? "—"
                            : events.length
                    }
                />


                <StatCard
                    label={
                        lang === "mn"
                            ? "Нийтлэгдсэн"
                            : "Published"
                    }
                    value={
                        eventsLoading
                            ? "—"
                            : publishedCount
                    }
                />


                <StatCard
                    label={
                        lang === "mn"
                            ? "Ноорог"
                            : "Drafts"
                    }
                    value={
                        eventsLoading
                            ? "—"
                            : draftCount
                    }
                />

            </div>


            <section
                className="
                    mt-5
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#fffdf8]/95
                    p-6
                    shadow-lg
                    shadow-black/10

                    sm:p-7
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-[#9a7b26]
                            "
                        >
                            {lang === "mn"
                                ? "Үйл ажиллагаа"
                                : "Activity"}
                        </p>


                        <h2
                            className="
                                mt-1
                                text-xl
                                font-semibold
                                tracking-tight
                                text-[#27301d]

                                sm:text-2xl
                            "
                        >
                            {lang === "mn"
                                ? "Сүүлийн өөрчлөлтүүд"
                                : "Recent Updates"}
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[#667056]
                            "
                        >
                            {lang === "mn"
                                ? "Хамгийн сүүлийн арга хэмжээний админ өөрчлөлтүүд."
                                : "The most recent administrative changes made to events."}
                        </p>

                    </div>


                    {!activityLoading &&
                        !activityError &&
                        activity.length > 0 && (

                        <p
                            className="
                                shrink-0
                                text-xs
                                text-[#7b8372]
                            "
                        >
                            {lang === "mn"
                                ? `Сүүлийн ${activity.length} өөрчлөлт`
                                : `Latest ${activity.length} updates`}
                        </p>

                    )}

                </div>


                {activityError ? (

                    <StateMessage
                        text={
                            lang === "mn"
                                ? "Сүүлийн өөрчлөлтүүдийг ачаалж чадсангүй."
                                : "Could not load recent updates."
                        }
                        error
                    />

                ) : activityLoading ? (

                    <StateMessage
                        text={
                            lang === "mn"
                                ? "Ачаалж байна..."
                                : "Loading updates..."
                        }
                    />

                ) : activity.length === 0 ? (

                    <StateMessage
                        text={
                            lang === "mn"
                                ? "Одоогоор арга хэмжээний өөрчлөлт алга."
                                : "No recent event activity."
                        }
                    />

                ) : (

                    <>
                        <div
                            className="
                                mt-5
                                divide-y
                                divide-[#27301d]/10
                                border-y
                                border-[#27301d]/10
                            "
                        >

                            {visibleActivity.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <HistoryRow
                                        key={
                                            `${item.createdAt}-${index}`
                                        }
                                        item={
                                            item
                                        }
                                        lang={
                                            lang
                                        }
                                    />

                                )
                            )}

                        </div>


                        {totalActivityPages > 1 && (

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <button
                                    type="button"
                                    disabled={
                                        !canGoPrevious
                                    }
                                    onClick={
                                        () =>
                                            setActivityPage(
                                                current =>
                                                    current - 1
                                            )
                                    }
                                    className="
                                        rounded-lg
                                        border
                                        border-[#27301d]/10
                                        bg-white
                                        px-3.5
                                        py-2
                                        text-sm
                                        font-medium
                                        text-[#667056]
                                        transition-colors
                                        duration-150

                                        hover:border-[#9a7b26]/30
                                        hover:bg-[#f6efdf]/60
                                        hover:text-[#27301d]

                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                        disabled:hover:border-[#27301d]/10
                                        disabled:hover:bg-white
                                        disabled:hover:text-[#667056]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Өмнөх"
                                        : "Previous"}
                                </button>


                                <div
                                    className="
                                        text-center
                                        text-xs
                                        text-[#7b8372]
                                    "
                                >

                                    <p
                                        className="
                                            font-medium
                                            text-[#667056]
                                        "
                                    >
                                        {lang === "mn"
                                            ? `${activityPage + 1} / ${totalActivityPages} хуудас`
                                            : `Page ${activityPage + 1} of ${totalActivityPages}`}
                                    </p>


                                    <p className="mt-0.5">
                                        {lang === "mn"
                                            ? "Зөвхөн хамгийн сүүлийн үйл ажиллагаа"
                                            : "Most recent activity only"}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    disabled={
                                        !canGoNext
                                    }
                                    onClick={
                                        () =>
                                            setActivityPage(
                                                current =>
                                                    current + 1
                                            )
                                    }
                                    className="
                                        rounded-lg
                                        border
                                        border-[#27301d]/10
                                        bg-white
                                        px-3.5
                                        py-2
                                        text-sm
                                        font-medium
                                        text-[#667056]
                                        transition-colors
                                        duration-150

                                        hover:border-[#9a7b26]/30
                                        hover:bg-[#f6efdf]/60
                                        hover:text-[#27301d]

                                        disabled:cursor-not-allowed
                                        disabled:opacity-35
                                        disabled:hover:border-[#27301d]/10
                                        disabled:hover:bg-white
                                        disabled:hover:text-[#667056]
                                    "
                                >
                                    {lang === "mn"
                                        ? "Дараах"
                                        : "Next"}
                                </button>

                            </div>

                        )}

                    </>
                )}

            </section>

        </div>
    );
}


function StatCard({
    label,
    value
}: {
    label:
        string;

    value:
        number | string;
}) {

    return (
        <div
            className="
                rounded-xl
                border
                border-white/10
                bg-[#fffdf8]/95
                p-5
                shadow-lg
                shadow-black/10
            "
        >

            <p
                className="
                    text-xs
                    font-medium
                    text-[#667056]
                "
            >
                {label}
            </p>


            <p
                className="
                    mt-2
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-[#27301d]
                "
            >
                {value}
            </p>

        </div>
    );
}


function StateMessage({
    text,
    error = false
}: {
    text:
        string;

    error?:
        boolean;
}) {

    return (
        <p
            className={`
                mt-6
                border-t
                border-[#27301d]/10
                pt-5
                text-sm

                ${
                    error
                        ? "text-[#8b4a42]"
                        : "text-[#667056]"
                }
            `}
        >
            {text}
        </p>
    );
}


function HistoryRow({
    item,
    lang
}: {
    item:
        UserHistoryItem;

    lang:
        "en" | "mn";
}) {

    const isCreate =
        item.operation ===
        "CREATE";


    return (
        <div
            className="
                flex
                flex-col
                gap-3
                px-2
                py-4
                transition-colors
                duration-150
                hover:bg-[#f6efdf]/45

                sm:flex-row
                sm:items-start
                sm:justify-between
                sm:px-3
            "
        >

            <div
                className="
                    min-w-0
                    flex-1
                "
            >

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
                    >
                        {item.title}
                    </p>


                    <OperationBadge
                        operation={
                            item.operation
                        }
                    />

                </div>


                <p
                    className="
                        mt-1
                        text-sm
                        leading-6
                        text-[#667056]
                    "
                >
                    {item.description}
                </p>


                {!isCreate && (

                    <UpdateDetails
                        item={
                            item
                        }
                        lang={
                            lang
                        }
                    />

                )}

            </div>


            <div
                className="
                    shrink-0

                    sm:min-w-[125px]
                    sm:text-right
                "
            >

                <p
                    className="
                        text-sm
                        font-medium
                        text-[#27301d]
                    "
                >
                    {
                        formatDate(
                            item.createdAt,
                            lang
                        )
                    }
                </p>


                <p
                    className="
                        mt-0.5
                        text-xs
                        text-[#7b8372]
                    "
                >
                    {
                        formatTime(
                            item.createdAt,
                            lang
                        )
                    }
                </p>

            </div>

        </div>
    );
}


function OperationBadge({
    operation
}: {
    operation:
        string | null;
}) {

    if (
        operation === null
    ) {

        return null;

    }


    return (
        <span
            className="
                rounded-md
                bg-[#f0eadc]
                px-2
                py-0.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#7b682d]
            "
        >
            {
                formatEnum(
                    operation
                )
            }
        </span>
    );
}


function UpdateDetails({
    item,
    lang
}: {
    item:
        UserHistoryItem;

    lang:
        "en" | "mn";
}) {

    if (
        item.field === null &&
        item.oldValue === null &&
        item.newValue === null
    ) {

        return null;

    }


    return (
        <div
            className="
                mt-3
                flex
                flex-wrap
                gap-x-5
                gap-y-2
                text-xs
                text-[#7b8372]
            "
        >

            {item.field !== null && (

                <Detail
                    label={
                        lang === "mn"
                            ? "Талбар"
                            : "Field"
                    }
                    value={
                        formatEnum(
                            item.field
                        )
                    }
                />

            )}


            {item.oldValue !== null && (

                <Detail
                    label={
                        lang === "mn"
                            ? "Өмнөх"
                            : "Previous"
                    }
                    value={
                        formatHistoryValue(
                            item.oldValue
                        )
                    }
                />

            )}


            {item.newValue !== null && (

                <Detail
                    label={
                        lang === "mn"
                            ? "Шинэ"
                            : "New"
                    }
                    value={
                        formatHistoryValue(
                            item.newValue
                        )
                    }
                />

            )}

        </div>
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
        <span
            className="
                min-w-0
                break-words
            "
        >

            <span
                className="
                    font-medium
                    text-[#667056]
                "
            >
                {label}:
            </span>

            {" "}

            <span>
                {value}
            </span>

        </span>
    );
}


function formatEnum(
    value:
        string
) {

    return value
        .toLowerCase()
        .split("_")
        .map(
            part =>
                part.charAt(0)
                    .toUpperCase() +
                part.slice(1)
        )
        .join(" ");
}


function formatHistoryValue(
    value:
        string
) {

    if (
        value === "true"
    ) {

        return "Yes";

    }


    if (
        value === "false"
    ) {

        return "No";

    }


    return value;
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
            year:
                "numeric",

            month:
                "short",

            day:
                "numeric"
        }
    ).format(
        new Date(
            value
        )
    );
}


function formatTime(
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