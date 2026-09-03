import type {
    AdminActivityEvent,
    ApiEvent
} from "../types";


type Props = {

    events:
        ApiEvent[];

    publishedCount:
        number;

    draftCount:
        number;

    activity:
        AdminActivityEvent[];

    loading:
        boolean;

    lang:
        "en" | "mn";
};


export default function AdminOverview({
    events,
    publishedCount,
    draftCount,
    activity,
    loading,
    lang
}: Props) {

    const recentUpdates =
        activity
            .filter(
                item =>
                    item.type ===
                    "ADMIN_UPDATE"
            )
            .slice(
                0,
                10
            );


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
                        loading
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
                        loading
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
                        loading
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
                        ? "Системд хийгдсэн сүүлийн админ өөрчлөлтүүд."
                        : "The latest administrative changes made in the system."}
                </p>


                {loading ? (

                    <p
                        className="
                            mt-6
                            border-t
                            border-[#27301d]/10
                            pt-5
                            text-sm
                            text-[#667056]
                        "
                    >
                        {lang === "mn"
                            ? "Ачаалж байна..."
                            : "Loading updates..."}
                    </p>

                ) : recentUpdates.length === 0 ? (

                    <p
                        className="
                            mt-6
                            border-t
                            border-[#27301d]/10
                            pt-5
                            text-sm
                            text-[#667056]
                        "
                    >
                        {lang === "mn"
                            ? "Одоогоор өөрчлөлт алга."
                            : "No recent updates."}
                    </p>

                ) : (

                    <div
                        className="
                            mt-5
                            divide-y
                            divide-[#27301d]/10
                            border-y
                            border-[#27301d]/10
                        "
                    >

                        {recentUpdates.map(
                            item => (

                                <div
                                    key={
                                        item.id
                                    }
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

                                        <p
                                            className="
                                                text-sm
                                                font-semibold
                                                text-[#27301d]
                                            "
                                        >
                                            {
                                                getActivityTitle(
                                                    item,
                                                    lang
                                                )
                                            }
                                        </p>


                                        <p
                                            className="
                                                mt-1
                                                text-sm
                                                leading-6
                                                text-[#667056]
                                            "
                                        >
                                            {
                                                getActivityDescription(
                                                    item,
                                                    lang
                                                )
                                            }
                                        </p>

                                    </div>


                                    <div
                                        className="
                                            shrink-0

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

                            )
                        )}

                    </div>

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


function getActivityTitle(
    activity:
        AdminActivityEvent,
    lang:
        "en" | "mn"
) {

    if (
        activity.payload.resource ===
        "EVENT"
    ) {

        return lang === "mn"
            ? "Арга хэмжээ шинэчлэгдсэн"
            : "Event updated";
    }


    return lang === "mn"
        ? "Админ өөрчлөлт"
        : "Administrative update";
}


function getActivityDescription(
    activity:
        AdminActivityEvent,
    lang:
        "en" | "mn"
) {

    const field =
        activity.payload.field;


    if (
        typeof field === "string"
    ) {

        return formatField(
            field,
            lang
        );
    }


    const message =
        activity.payload.message;


    if (
        typeof message === "string"
    ) {
        return message;
    }


    return lang === "mn"
        ? "Системийн мэдээлэл шинэчлэгдсэн."
        : "System information was updated.";
}


function formatField(
    field:
        string,
    lang:
        "en" | "mn"
) {

    const values:
        Record<
            string,
            {
                en: string;
                mn: string;
            }
        > = {

        TITLE_EN: {
            en: "English title changed",
            mn: "Англи гарчиг өөрчлөгдсөн"
        },

        TITLE_MN: {
            en: "Mongolian title changed",
            mn: "Монгол гарчиг өөрчлөгдсөн"
        },

        DESCRIPTION_EN: {
            en: "English description changed",
            mn: "Англи тайлбар өөрчлөгдсөн"
        },

        DESCRIPTION_MN: {
            en: "Mongolian description changed",
            mn: "Монгол тайлбар өөрчлөгдсөн"
        },

        STARTS_AT: {
            en: "Start time changed",
            mn: "Эхлэх цаг өөрчлөгдсөн"
        },

        ENDS_AT: {
            en: "End time changed",
            mn: "Дуусах цаг өөрчлөгдсөн"
        },

        LOCATION: {
            en: "Location changed",
            mn: "Байршил өөрчлөгдсөн"
        },

        PUBLISHED: {
            en: "Publication status changed",
            mn: "Нийтлэх төлөв өөрчлөгдсөн"
        },

        REGISTERABLE: {
            en: "Registration availability changed",
            mn: "Бүртгэлийн төлөв өөрчлөгдсөн"
        },

        REGISTRATION_COST: {
            en: "Registration cost changed",
            mn: "Бүртгэлийн үнэ өөрчлөгдсөн"
        },

        COVER_IMAGE: {
            en: "Cover image changed",
            mn: "Нүүр зураг өөрчлөгдсөн"
        },

        COVER_IMAGE_ALT_EN: {
            en: "English image description changed",
            mn: "Зургийн англи тайлбар өөрчлөгдсөн"
        },

        COVER_IMAGE_ALT_MN: {
            en: "Mongolian image description changed",
            mn: "Зургийн монгол тайлбар өөрчлөгдсөн"
        },

        CONTACT_EMAIL: {
            en: "Contact email changed",
            mn: "Холбоо барих имэйл өөрчлөгдсөн"
        },

        CONTACT_PHONE: {
            en: "Contact phone changed",
            mn: "Холбоо барих утас өөрчлөгдсөн"
        }
    };


    return values[field]?.[lang] ??
        (
            lang === "mn"
                ? "Арга хэмжээ шинэчлэгдсэн"
                : "Event updated"
        );
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
            hour: "numeric",
            minute: "2-digit"
        }
    ).format(
        new Date(
            value
        )
    );
}