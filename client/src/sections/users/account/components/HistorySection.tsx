import {
    useState
} from "react";

import {
    motion,
    AnimatePresence
} from "framer-motion";

import {
    useUserHistory
} from "../hooks/useUserHistory";

import type {
    UserHistoryItem
} from "../types/accountTypes";


interface HistoryCopy {
    title: string;
    emptyTitle: string;
    emptyBody: string;
}


interface HistorySectionProps {
    copy: HistoryCopy;
}


function getStatusLabel(
    status: string | null
): string {

    if (!status) {
        return "";
    }


    switch (status) {

        case "SUCCESSFUL":
            return "Successful";

        case "CANCELLED":
            return "Cancelled";

        case "FAILED":
            return "Failed";

        case "INIT":
            return "In progress";

        default:
            return status;
    }
}


function getStatusClasses(
    status: string | null
): string {

    if (!status) {
        return "";
    }


    switch (status) {

        case "SUCCESSFUL":
            return "text-[#9a7b26]";

        case "CANCELLED":
            return "text-[#8a8a82]";

        case "FAILED":
            return "text-[#8b4a42]";

        case "INIT":
            return "text-[#667056]";

        default:
            return "text-[#667056]";
    }
}


function formatDate(
    createdAt: string
): string {

    return new Date(
        createdAt
    ).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


function formatTime(
    createdAt: string
): string {

    return new Date(
        createdAt
    ).toLocaleTimeString(
        undefined,
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


function formatField(
    field: string
): string {

    switch (field) {

        case "TITLE_EN":
            return "English title";

        case "TITLE_MN":
            return "Mongolian title";

        case "DESCRIPTION_EN":
            return "English description";

        case "DESCRIPTION_MN":
            return "Mongolian description";

        case "STARTS_AT":
            return "Start time";

        case "ENDS_AT":
            return "End time";

        case "LOCATION":
            return "Location";

        case "PUBLISHED":
            return "Published status";

        case "REGISTERABLE":
            return "Registration status";

        case "REGISTRATION_COST":
            return "Registration cost";

        case "COVER_IMAGE":
            return "Cover image";

        case "COVER_IMAGE_ALT_EN":
            return "English image alt text";

        case "COVER_IMAGE_ALT_MN":
            return "Mongolian image alt text";

        case "CONTACT_EMAIL":
            return "Contact email";

        case "CONTACT_PHONE":
            return "Contact phone";

        default:
            return field
                .toLowerCase()
                .replaceAll(
                    "_",
                    " "
                )
                .replace(
                    /^./,
                    char =>
                        char.toUpperCase()
                );
    }
}


function formatOperation(
    operation: string
): string {

    switch (operation) {

        case "CREATE":
            return "Create";

        case "UPDATE":
            return "Update";

        case "DELETE":
            return "Delete";

        default:
            return operation;
    }
}


function formatResource(
    resource: string
): string {

    switch (resource) {

        case "EVENT":
            return "Event";

        case "USER":
            return "User";

        default:
            return resource
                .toLowerCase()
                .replace(
                    /^./,
                    char =>
                        char.toUpperCase()
                );
    }
}


function DetailRow({
    label,
    value
}: {
    label: string;
    value: string;
}) {

    return (
        <div
            className="
                grid
                gap-1
                sm:grid-cols-[140px_1fr]
                sm:gap-4
            "
        >

            <p
                className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-[#667056]
                "
            >
                {label}
            </p>


            <p
                className="
                    break-words
                    text-sm
                    text-[#27301d]
                "
            >
                {value}
            </p>

        </div>
    );
}


function HistoryItem({
    item
}: {
    item: UserHistoryItem;
}) {

    const [
        detailsOpen,
        setDetailsOpen
    ] = useState(false);


    const hasDetails =
        item.resource != null ||
        item.operation != null ||
        item.field != null ||
        item.oldValue != null ||
        item.newValue != null;


    return (
        <div
            className="
                py-5
                first:pt-2
                last:pb-2
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-3

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

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >

                        <h3
                            className="
                                text-base
                                font-semibold
                                text-[#27301d]
                            "
                        >
                            {item.title}
                        </h3>


                        {item.status && (
                            <>

                                <span
                                    className="
                                        text-[#9a7b26]/50
                                    "
                                >
                                    ·
                                </span>


                                <span
                                    className={`
                                        text-sm
                                        font-medium
                                        ${getStatusClasses(
                                            item.status
                                        )}
                                    `}
                                >
                                    {getStatusLabel(
                                        item.status
                                    )}
                                </span>

                            </>
                        )}

                    </div>


                    <p
                        className="
                            mt-2
                            text-lg
                            font-semibold
                            text-[#27301d]
                        "
                    >
                        {item.description}
                    </p>


                    {hasDetails && (

                        <button
                            type="button"
                            onClick={() =>
                                setDetailsOpen(
                                    current =>
                                        !current
                                )
                            }
                            aria-expanded={
                                detailsOpen
                            }
                            className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-[#9a7b26]
                                transition
                                hover:text-[#27301d]
                            "
                        >

                            {detailsOpen
                                ? "Hide details"
                                : "View details"}


                            <span
                                className={`
                                    inline-block
                                    transition-transform
                                    duration-200
                                    ${
                                        detailsOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            >
                                ↓
                            </span>

                        </button>

                    )}

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
                        {formatDate(
                            item.createdAt
                        )}
                    </p>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-[#667056]
                        "
                    >
                        {formatTime(
                            item.createdAt
                        )}
                    </p>

                </div>

            </div>


            <AnimatePresence
                initial={false}
            >

                {hasDetails &&
                    detailsOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        className="
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                mt-4
                                space-y-3
                                rounded-xl
                                border
                                border-[#27301d]/10
                                bg-[#f6efdf]/60
                                p-4
                            "
                        >

                            {item.operation && (

                                <DetailRow
                                    label="Action"
                                    value={
                                        formatOperation(
                                            item.operation
                                        )
                                    }
                                />

                            )}


                            {item.resource && (

                                <DetailRow
                                    label="Resource"
                                    value={
                                        formatResource(
                                            item.resource
                                        )
                                    }
                                />

                            )}


                            {item.field && (

                                <DetailRow
                                    label="Field"
                                    value={
                                        formatField(
                                            item.field
                                        )
                                    }
                                />

                            )}


                            {item.oldValue != null && (

                                <DetailRow
                                    label="Previous value"
                                    value={
                                        item.oldValue
                                    }
                                />

                            )}


                            {item.newValue != null && (

                                <DetailRow
                                    label="New value"
                                    value={
                                        item.newValue
                                    }
                                />

                            )}

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
}


export function HistorySection({
    copy
}: HistorySectionProps) {

    const {
        history,
        page,
        loading,
        error,
        nextPage,
        previousPage,
        reload
    } = useUserHistory();


    const paymentCount =
        history
            ? history.content.filter(
                item =>
                    item.type === "PAYMENT"
            ).length
            : 0;


    const activityCount =
        history
            ? history.content.filter(
                item =>
                    item.type === "ACTIVITY"
            ).length
            : 0;


    return (
        <section
            className="
                rounded-2xl
                border
                border-[#27301d]/10
                bg-white
                p-6
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
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


                {history &&
                    history.totalElements > 0 && (

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-1

                            text-sm
                            text-[#667056]
                        "
                    >

                        <span>

                            <span
                                className="
                                    font-semibold
                                    text-[#27301d]
                                "
                            >
                                {history.totalElements}
                            </span>

                            {" "}
                            total

                        </span>


                        <span>

                            <span
                                className="
                                    font-semibold
                                    text-[#27301d]
                                "
                            >
                                {paymentCount}
                            </span>

                            {" "}

                            {paymentCount === 1
                                ? "payment"
                                : "payments"}

                        </span>


                        <span>

                            <span
                                className="
                                    font-semibold
                                    text-[#27301d]
                                "
                            >
                                {activityCount}
                            </span>

                            {" "}
                            account{" "}

                            {activityCount === 1
                                ? "activity"
                                : "activities"}

                        </span>

                    </div>

                )}

            </div>


            {loading &&
                !history && (

                <div
                    className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
                >

                    <p
                        className="
                            text-sm
                            text-[#667056]
                        "
                    >
                        Loading history...
                    </p>

                </div>

            )}


            {error &&
                !history && (

                <div
                    className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
                >

                    <p
                        className="
                            text-sm
                            text-[#667056]
                        "
                    >
                        Unable to load your history.
                    </p>


                    <button
                        type="button"
                        onClick={
                            reload
                        }
                        className="
                            mt-4
                            text-sm
                            font-medium
                            text-[#9a7b26]
                            transition
                            hover:text-[#27301d]
                        "
                    >
                        Try again
                    </button>

                </div>

            )}


            {!loading &&
                !error &&
                history &&
                history.content.length === 0 && (

                <div
                    className="
                        mt-6
                        border-t
                        border-[#27301d]/10
                        pt-5
                    "
                >

                    <p
                        className="
                            text-sm
                            font-semibold
                            text-[#27301d]
                        "
                    >
                        {copy.emptyTitle}
                    </p>


                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-[#667056]
                        "
                    >
                        {copy.emptyBody}
                    </p>

                </div>

            )}


            {history &&
                history.content.length > 0 && (

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

                        <AnimatePresence
                            mode="wait"
                        >

                            <motion.div
                                key={
                                    page
                                }
                                initial={{
                                    opacity: 0,
                                    y: 6
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 0.18
                                }}
                            >

                                {history.content.map(
                                    item => (

                                        <HistoryItem
                                            key={`${item.type}-${item.createdAt}-${item.title}`}
                                            item={
                                                item
                                            }
                                        />

                                    )
                                )}

                            </motion.div>

                        </AnimatePresence>

                    </div>


                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <button
                            type="button"
                            onClick={
                                previousPage
                            }
                            disabled={
                                history.first ||
                                loading
                            }
                            className="
                                text-sm
                                font-medium
                                text-[#27301d]
                                transition
                                hover:text-[#9a7b26]
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            ← Previous
                        </button>


                        <p
                            className="
                                text-sm
                                text-[#667056]
                            "
                        >
                            {history.number + 1}
                            {" / "}
                            {history.totalPages}
                        </p>


                        <button
                            type="button"
                            onClick={
                                nextPage
                            }
                            disabled={
                                history.last ||
                                loading
                            }
                            className="
                                text-sm
                                font-medium
                                text-[#27301d]
                                transition
                                hover:text-[#9a7b26]
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >

                            {loading
                                ? "Loading..."
                                : "Next →"}

                        </button>

                    </div>

                </>

            )}

        </section>
    );
}