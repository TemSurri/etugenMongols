import {
    memo
} from "react";

import type {
    EventRegistrationCopy
} from "../eventRegistrationCopy";

import type {
    ResumePaymentResponse
} from "../eventRegistrationTypes";


type EventRegistrationExistingPaymentProps = {

    copy:
        EventRegistrationCopy;

    payment:
        ResumePaymentResponse;

    loading:
        boolean;

    onContinue:
        () => void;

    onCancel:
        () => void;
};


type EventPayer = {
    firstName?: string;
    lastName?: string;
    email?: string;
};


function EventRegistrationExistingPayment({
    copy,
    payment,
    loading,
    onContinue,
    onCancel
}: EventRegistrationExistingPaymentProps) {


    const formattedAmount =
        new Intl.NumberFormat(
            "en-CA",
            {
                style:
                    "currency",

                currency:
                    payment.currency
                        .toUpperCase()
            }
        ).format(
            payment.amount /
            100
        );


    const isEventRegistration =
        payment.action ===
        "EVENT_REGISTRATION";


    const payer =
        isEventRegistration
            ? payment.actionPayload
                ?.payer as
                EventPayer |
                undefined
            : undefined;


    const attendeeCount =
        isEventRegistration &&
        typeof payment.actionPayload
            ?.attendeeCount ===
            "number"
            ? payment.actionPayload
                .attendeeCount
            : undefined;


    const payerName =
        [
            payer?.firstName,
            payer?.lastName
        ]
            .filter(
                Boolean
            )
            .join(
                " "
            );


    const actionLabel =
        isEventRegistration
            ? copy.eventRegistration
            : copy.donation;


    const description =
        isEventRegistration
            ? copy.existingEventRegistrationDescription
            : copy.existingDonationDescription;


    return (
        <div
            className={`
                w-full
                max-w-md
                border
                border-white/20
                bg-[#f7f7f4]
                shadow-2xl
                shadow-black/30
                transition-all
                duration-300

                ${
                    loading
                        ? "scale-[0.995] opacity-90"
                        : "scale-100 opacity-100"
                }
            `}
        >

            <div
                className="
                    border-b
                    border-[#27301d]/10
                    bg-white
                    px-6
                    py-5
                "
            >

                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#9a7b26]
                    "
                >
                    {
                        copy.currentPayment
                    }
                </p>


                <h2
                    className="
                        mt-2
                        text-xl
                        font-semibold
                        text-[#27301d]
                    "
                >
                    {
                        copy.existingPaymentTitle
                    }
                </h2>

            </div>


            <div
                className="
                    px-6
                    py-6
                "
            >

                <p
                    className="
                        text-sm
                        leading-6
                        text-[#59624a]
                    "
                >
                    {
                        description
                    }
                </p>


                <div
                    className="
                        mt-6
                        border-y
                        border-[#27301d]/10
                        py-1
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                            border-b
                            border-[#27301d]/10
                            py-3
                        "
                    >

                        <span
                            className="
                                text-sm
                                text-[#69705c]
                            "
                        >
                            {
                                copy.paymentType
                            }
                        </span>


                        <span
                            className="
                                text-right
                                text-sm
                                font-medium
                                text-[#303824]
                            "
                        >
                            {
                                actionLabel
                            }
                        </span>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                            border-b
                            border-[#27301d]/10
                            py-3
                        "
                    >

                        <span
                            className="
                                text-sm
                                text-[#69705c]
                            "
                        >
                            {
                                copy.paymentAmount
                            }
                        </span>


                        <span
                            className="
                                text-right
                                text-base
                                font-semibold
                                text-[#303824]
                            "
                        >
                            {
                                formattedAmount
                            }
                        </span>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                            py-3
                        "
                    >

                        <span
                            className="
                                shrink-0
                                text-sm
                                text-[#69705c]
                            "
                        >
                            {
                                copy.paymentEmail
                            }
                        </span>


                        <span
                            className="
                                min-w-0
                                truncate
                                text-right
                                text-sm
                                font-medium
                                text-[#303824]
                            "
                        >
                            {
                                payment.email
                            }
                        </span>

                    </div>


                    {
                        isEventRegistration &&
                        payerName &&
                        (

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-5
                                    border-t
                                    border-[#27301d]/10
                                    py-3
                                "
                            >

                                <span
                                    className="
                                        text-sm
                                        text-[#69705c]
                                    "
                                >
                                    {
                                        copy.paymentPayer
                                    }
                                </span>


                                <span
                                    className="
                                        text-right
                                        text-sm
                                        font-medium
                                        text-[#303824]
                                    "
                                >
                                    {
                                        payerName
                                    }
                                </span>

                            </div>

                        )
                    }


                    {
                        isEventRegistration &&
                        attendeeCount !==
                            undefined &&
                        (

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-5
                                    border-t
                                    border-[#27301d]/10
                                    py-3
                                "
                            >

                                <span
                                    className="
                                        text-sm
                                        text-[#69705c]
                                    "
                                >
                                    {
                                        copy.paymentAttendees
                                    }
                                </span>


                                <span
                                    className="
                                        text-right
                                        text-sm
                                        font-medium
                                        text-[#303824]
                                    "
                                >
                                    {
                                        attendeeCount
                                    }
                                </span>

                            </div>

                        )
                    }

                </div>


                <div
                    className="
                        mt-6
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                    "
                >

                    <button
                        type="button"

                        onClick={
                            onContinue
                        }

                        disabled={
                            loading
                        }

                        className="
                            inline-flex
                            flex-1
                            items-center
                            justify-center
                            bg-[#303824]
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-[#fffaf0]
                            transition-all
                            duration-200
                            hover:bg-[#242a1b]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {
                            copy.continueExistingPayment
                        }
                    </button>


                    <button
                        type="button"

                        onClick={
                            onCancel
                        }

                        disabled={
                            loading
                        }

                        className="
                            inline-flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            border
                            border-[#303824]/25
                            px-5
                            py-3
                            text-sm
                            font-medium
                            text-[#303824]
                            transition-all
                            duration-200
                            hover:bg-[#303824]/5
                            disabled:cursor-wait
                            disabled:opacity-70
                        "
                    >
                        {
                            loading
                                ? (
                                    <>

                                        <span
                                            aria-hidden="true"

                                            className="
                                                h-3.5
                                                w-3.5
                                                shrink-0
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-[#303824]/20
                                                border-t-[#303824]
                                            "
                                        />


                                        <span>
                                            Cancelling payment…
                                        </span>

                                    </>
                                )
                                : copy.cancelExistingPayment
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}


export default memo(
    EventRegistrationExistingPayment
);