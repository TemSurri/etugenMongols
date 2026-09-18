import { AnimatePresence,motion } from "framer-motion";
import { useState } from "react";
import type { UserHistoryItem } from "../contracts/accountContracts";
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

export function HistoryItem({
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
