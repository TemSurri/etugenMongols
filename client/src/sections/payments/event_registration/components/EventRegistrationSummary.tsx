import {
    memo
} from "react";

import type {
    EventRegistrationCopy
} from "../eventRegistrationCopy";


type EventRegistrationSummaryProps = {

    attendeeCount: number;

    formattedPrice: string;

    formattedTotal: string;

    submitting: boolean;

    formComplete: boolean;

    error: string | null;

    onSubmit: () => void;

    copy: EventRegistrationCopy;
};


function EventRegistrationSummary({
    attendeeCount,
    formattedPrice,
    formattedTotal,
    submitting,
    formComplete,
    error,
    onSubmit,
    copy
}: EventRegistrationSummaryProps) {

    return (
        <section
            className="
                border-t
                border-[#27301d]/10
                pt-7
            "
        >

            <h2
                className="
                    text-lg
                    font-semibold
                    text-[#27301d]
                "
            >
                {
                    copy.registrationSummary
                }
            </h2>


            <div
                className="
                    mt-5
                    space-y-3
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-5
                        text-sm
                    "
                >

                    <span
                        className="
                            text-[#59624a]
                        "
                    >
                        {
                            attendeeCount
                        }{" "}
                        {
                            attendeeCount === 1
                                ? copy.person
                                : copy.people
                        }
                    </span>


                    <span
                        className="
                            font-medium
                            text-[#27301d]
                        "
                    >
                        {
                            attendeeCount
                        }
                    </span>

                </div>


                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-5
                        text-sm
                    "
                >

                    <span
                        className="
                            text-[#59624a]
                        "
                    >
                        {
                            copy.pricePerGuest
                        }
                    </span>


                    <span
                        className="
                            font-medium
                            text-[#27301d]
                        "
                    >
                        {
                            formattedPrice
                        }
                    </span>

                </div>


                <div
                    className="
                        mt-4
                        flex
                        items-end
                        justify-between
                        gap-5
                        border-t
                        border-[#27301d]/10
                        pt-4
                    "
                >

                    <span
                        className="
                            text-sm
                            font-medium
                            text-[#59624a]
                        "
                    >
                        {
                            copy.total
                        }
                    </span>


                    <span
                        className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-[#27301d]
                        "
                    >
                        {
                            formattedTotal
                        }
                    </span>

                </div>

            </div>


            {
                error && (

                    <p
                        className="
                            mt-5
                            border-l-2
                            border-red-700/60
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            leading-6
                            text-red-800
                        "
                    >
                        {
                            error
                        }
                    </p>

                )
            }


            <button
                type="button"

                onClick={
                    onSubmit
                }

                disabled={
                    submitting ||
                    !formComplete
                }

                className="
                    mt-6
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    bg-[#303824]
                    px-6
                    py-3.5
                    text-sm
                    font-medium
                    text-[#fffaf0]
                    transition-colors
                    duration-150
                    hover:bg-[#242a1b]
                    disabled:cursor-not-allowed
                    disabled:opacity-45
                "
            >
                {
                    submitting
                        ? copy.preparingPayment
                        : copy.continueToPayment
                }
            </button>

        </section>
    );
}


export default memo(
    EventRegistrationSummary
);