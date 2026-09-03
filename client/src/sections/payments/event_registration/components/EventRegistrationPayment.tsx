import {
    memo,
    useState
} from "react";

import {
    PaymentElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";

import type {
    EventRegistrationCopy
} from "../eventRegistrationCopy";

import type {
    PaymentAction
} from "../eventRegistrationTypes";


type Props = {

    action:
        PaymentAction;

    amount:
        number;

    currency:
        string;

    copy:
        EventRegistrationCopy;

    onCancel:
        () =>
            Promise<void> |
            void;

    onComplete:
        () => void;
};


function EventRegistrationPayment({
    action,
    amount,
    currency,
    copy,
    onCancel,
    onComplete
}: Props) {

    const stripe =
        useStripe();


    const elements =
        useElements();


    const [
        submitting,
        setSubmitting
    ] =
        useState(
            false
        );


    const [
        cancelling,
        setCancelling
    ] =
        useState(
            false
        );


    const [
        successful,
        setSuccessful
    ] =
        useState(
            false
        );


    const [
        error,
        setError
    ] =
        useState<
            string |
            null
        >(
            null
        );


    const formattedAmount =
        (
            amount /
            100
        ).toLocaleString(
            "en-CA",
            {
                style:
                    "currency",

                currency:
                    currency.toUpperCase()
            }
        );


    const isDonation =
        action ===
        "DONATION";


    const actionLabel =
        isDonation
            ? copy.donation
            : copy.eventRegistration;


    const title =
        isDonation
            ? copy.donationPaymentTitle
            : copy.paymentTitle;


    const description =
        isDonation
            ? copy.donationPaymentDescription
            : copy.paymentDescription;


    const submitLabel =
        isDonation
            ? copy.completeDonation
            : copy.continueToPayment;


    const busy =
        submitting ||
        cancelling ||
        successful;


    async function handleSubmit(
        event:
            React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        if (
            !stripe ||
            !elements ||
            busy
        ) {
            return;
        }


        setSubmitting(
            true
        );


        setError(
            null
        );


        try {

            const result =
                await stripe.confirmPayment({
                    elements,

                    redirect:
                        "if_required"
                });


            if (
                result.error
            ) {

                setError(
                    result.error.message ??
                    "Payment could not be completed."
                );

                return;
            }


            setSuccessful(
                true
            );

        } catch (
            requestError
        ) {

            console.error(
                "Payment failed:",
                requestError
            );


            setError(
                "Payment could not be completed."
            );

        } finally {

            setSubmitting(
                false
            );
        }
    }


    async function handleCancel() {

        if (
            busy
        ) {
            return;
        }


        setCancelling(
            true
        );


        setError(
            null
        );


        try {

            await onCancel();

        } catch (
            requestError
        ) {

            console.error(
                "Payment cancellation failed:",
                requestError
            );


            setError(
                "Payment could not be cancelled. Please try again."
            );


            setCancelling(
                false
            );
        }
    }


    /*
     * Success state.
     *
     * We intentionally do not redirect automatically.
     * The user reads the confirmation and leaves by
     * clicking the button.
     */
    if (
        successful
    ) {

        return (
            <section
                className="
                    flex
                    w-full
                    max-w-xl
                    flex-col
                    items-center
                    justify-center
                    bg-[#fffaf0]
                    px-6
                    py-14
                    text-center
                    text-[#303824]
                    shadow-2xl
                    sm:px-8
                    sm:py-16
                "
            >

                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-[#303824]
                        text-[#fffaf0]
                    "
                >

                    <svg
                        viewBox="0 0 24 24"

                        fill="none"

                        stroke="currentColor"

                        strokeWidth="2.2"

                        strokeLinecap="round"

                        strokeLinejoin="round"

                        className="
                            h-8
                            w-8
                        "
                    >

                        <path
                            d="M5 12.5l4 4L19 7"
                        />

                    </svg>

                </div>


                <p
                    className="
                        mt-6
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#9a7b26]
                    "
                >
                    {
                        actionLabel
                    }
                </p>


                <h2
                    className="
                        mt-3
                        text-2xl
                        font-semibold
                        tracking-tight
                    "
                >
                    {
                        isDonation
                            ? "Payment successful"
                            : copy.paymentComplete
                    }
                </h2>


                <p
                    className="
                        mt-3
                        max-w-sm
                        text-sm
                        leading-6
                        text-[#69705c]
                    "
                >
                    {
                        isDonation
                            ? (
                                <>
                                    Your payment was successful.
                                    Your donation is now queued
                                    for processing and you will
                                    receive a confirmation email
                                    shortly.
                                </>
                            )
                            : (
                                <>
                                    Your payment was successful.
                                    Your registration is now
                                    queued for processing and you
                                    will receive a confirmation
                                    email shortly.
                                </>
                            )
                    }
                </p>


                <div
                    className="
                        mt-7
                        w-full
                        max-w-sm
                        border-y
                        border-[#303824]/10
                        py-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                        "
                    >

                        <span
                            className="
                                text-sm
                                text-[#69705c]
                            "
                        >
                            {
                                copy.total
                            }
                        </span>


                        <span
                            className="
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

                </div>


                <p
                    className="
                        mt-5
                        max-w-sm
                        text-xs
                        leading-5
                        text-[#7b826f]
                    "
                >
                    You may safely leave this page.
                    Processing will continue in the
                    background.
                </p>


                <button
                    type="button"

                    onClick={
                        onComplete
                    }

                    className="
                        mt-7
                        inline-flex
                        w-full
                        max-w-sm
                        items-center
                        justify-center
                        bg-[#303824]
                        px-5
                        py-3.5
                        text-sm
                        font-medium
                        text-[#fffaf0]
                        transition-colors
                        hover:bg-[#242a1b]
                    "
                >
                    {
                        isDonation
                            ? "Back to home"
                            : copy.backToEvent
                    }
                </button>

            </section>
        );
    }


    return (
        <section
            className={`
                w-full
                max-w-xl
                bg-[#fffaf0]
                p-6
                text-[#303824]
                shadow-2xl
                transition-all
                duration-300
                sm:p-8

                ${
                    cancelling
                        ? "scale-[0.995] opacity-90"
                        : "scale-100 opacity-100"
                }
            `}
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
                    actionLabel
                }
            </p>


            <h2
                className="
                    mt-3
                    text-2xl
                    font-medium
                    tracking-tight
                "
            >
                {
                    title
                }
            </h2>


            <p
                className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#69705c]
                "
            >
                {
                    description
                }
            </p>


            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-y
                    border-[#303824]/15
                    py-4
                "
            >

                <span
                    className="
                        text-sm
                        text-[#69705c]
                    "
                >
                    {
                        copy.total
                    }
                </span>


                <span
                    className="
                        text-xl
                        font-medium
                    "
                >
                    {
                        formattedAmount
                    }
                </span>

            </div>


            <form
                onSubmit={
                    handleSubmit
                }

                className="
                    mt-6
                "
            >

                <PaymentElement />


                {
                    error &&
                    (

                        <div
                            role="alert"

                            className="
                                mt-5
                                border
                                border-[#a76558]/30
                                bg-[#fff4f1]
                                px-4
                                py-3
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    text-[#8a4d42]
                                "
                            >
                                {
                                    error
                                }
                            </p>

                        </div>

                    )
                }


                <button
                    type="submit"

                    disabled={
                        busy ||
                        !stripe ||
                        !elements
                    }

                    className="
                        mt-6
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        bg-[#303824]
                        px-5
                        py-3.5
                        text-sm
                        font-medium
                        text-[#fffaf0]
                        transition-colors
                        hover:bg-[#242a1b]
                        disabled:cursor-wait
                        disabled:opacity-60
                    "
                >
                    {
                        submitting
                            ? copy.preparingPayment
                            : `${submitLabel} · ${formattedAmount}`
                    }
                </button>


                <button
                    type="button"

                    disabled={
                        busy
                    }

                    onClick={
                        handleCancel
                    }

                    className="
                        mt-3
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        border
                        border-[#303824]/20
                        px-5
                        py-3.5
                        text-sm
                        font-medium
                        text-[#303824]
                        transition-all
                        duration-200
                        hover:bg-[#303824]/[0.035]
                        disabled:cursor-wait
                        disabled:opacity-70
                    "
                >
                    {
                        cancelling
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
                            : copy.cancel
                    }
                </button>

            </form>

        </section>
    );
}


export default memo(
    EventRegistrationPayment
);