import {
    memo,
    useEffect,
    useState
} from "react";

import {
    createPortal
} from "react-dom";

import {
    Link
} from "react-router-dom";

import {
    Elements
} from "@stripe/react-stripe-js";

import {
    cubicBezier,
    motion,
    type Variants
} from "framer-motion";

import type {
    ApiEvent
} from "../../events/types";

import type {
    Lang
} from "./eventRegistrationTypes";

import {
    EVENT_REGISTRATION_COPY
} from "./eventRegistrationCopy";

import {
    useEventRegistrationCheckout
} from "./hooks/useEventRegistrationCheckout";

import EventRegistrationPayee
    from "./components/EventRegistrationPayee";

import EventRegistrationPeople
    from "./components/EventRegistrationPeople";

import EventRegistrationSummary
    from "./components/EventRegistrationSummary";

import EventRegistrationExistingPayment
    from "./components/EventRegistrationExistingPayment";

import EventRegistrationPayment
    from "./components/EventRegistrationPayment";

import {
    stripePromise
} from "../donate/stripe";


type EventRegistrationCheckoutProps = {

    event:
        ApiEvent;

    lang:
        Lang;
};


const REGISTRATION_BACKGROUNDS = [

    "/home/slideshow/1.webp",

    "/home/slideshow/2.webp",

    "/home/slideshow/3.webp",

    "/home/slideshow/4.webp",

    "/impact/culture/4.webp",

    "/impact/archery/3.webp"

] as const;


const easeOut =
    cubicBezier(
        0.22,
        1,
        0.36,
        1
    );


const entranceMotion: Variants = {

    hidden: {
        opacity: 0,
        y: 14
    },

    show: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.5,
            ease: easeOut
        }
    }

};


function EventRegistrationCheckout({
    event,
    lang
}: EventRegistrationCheckoutProps) {

    const [
        localLang,
        setLocalLang
    ] = useState<
        Lang
    >(
        lang
    );


    const [
        background
    ] = useState(
        () => {

            const index =
                Math.floor(
                    Math.random() *
                    REGISTRATION_BACKGROUNDS.length
                );


            return REGISTRATION_BACKGROUNDS[
                index
            ];
        }
    );


    const copy =
        EVENT_REGISTRATION_COPY[
            localLang
        ];


    const checkout =
        useEventRegistrationCheckout(
            event
        );


    const eventTitle =
        localLang === "mn"
            ? event.titleMn
            : event.titleEn;


    const modalOpen =
        checkout.activePayment !== null ||
        checkout.existingPayment !== null ||
        checkout.submitting;


    useEffect(
        () => {

            if (
                !modalOpen
            ) {
                return;
            }


            const previous =
                document.body.style.overflow;


            document.body.style.overflow =
                "hidden";


            return () => {

                document.body.style.overflow =
                    previous;

            };

        },
        [
            modalOpen
        ]
    );


    return (
        <main
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#182010]
            "
        >

            <img
                src={
                    background
                }

                alt=""

                aria-hidden="true"

                draggable={
                    false
                }

                className="
                    fixed
                    inset-0
                    h-full
                    w-full
                    select-none
                    object-cover
                    object-center
                    saturate-[1.03]
                    contrast-[1.02]
                "
            />


            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    bg-[#182010]/58
                "
            />


            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    bg-linear-to-b
                    from-black/15
                    via-transparent
                    to-black/35
                "
            />


            <section
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-screen
                    w-full
                    max-w-[42rem]
                    items-start
                    px-5
                    pb-16
                    pt-28
                    sm:px-6
                    md:pt-32
                "
            >

                <motion.div
                    variants={
                        entranceMotion
                    }

                    initial="hidden"

                    animate="show"

                    className="
                        relative
                        w-full
                    "
                >

                    <div
                        className="
                            absolute
                            -top-9
                            left-0
                            right-0
                            flex
                            items-center
                            justify-between
                            gap-5
                        "
                    >

                        <Link
                            to={
                                `/events/${event.slug}`
                            }

                            className="
                                text-xs
                                font-medium
                                text-white/75
                                transition-colors
                                hover:text-white
                            "
                        >
                            ← {
                                copy.backToEvent
                            }
                        </Link>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                font-medium
                            "
                        >

                            <button
                                type="button"

                                onClick={
                                    () =>
                                        setLocalLang(
                                            "en"
                                        )
                                }

                                className={
                                    localLang === "en"
                                        ? "text-white"
                                        : "text-white/55 hover:text-white"
                                }
                            >
                                EN
                            </button>


                            <span
                                className="
                                    text-white/30
                                "
                            >
                                |
                            </span>


                            <button
                                type="button"

                                onClick={
                                    () =>
                                        setLocalLang(
                                            "mn"
                                        )
                                }

                                className={
                                    localLang === "mn"
                                        ? "text-white"
                                        : "text-white/55 hover:text-white"
                                }
                            >
                                MN
                            </button>

                        </div>

                    </div>


                    <div
                        className="
                            overflow-hidden
                            border
                            border-white/20
                            bg-[#f7f7f4]
                            shadow-2xl
                            shadow-black/25
                        "
                    >

                        <header
                            className="
                                border-b
                                border-[#27301d]/10
                                bg-white
                                px-6
                                py-7
                                sm:px-8
                            "
                        >

                            <h1
                                className="
                                    text-2xl
                                    font-semibold
                                    tracking-tight
                                    text-[#27301d]
                                    sm:text-3xl
                                "
                            >
                                {
                                    copy.registerFor
                                }
                            </h1>


                            <p
                                className="
                                    mt-1
                                    text-xl
                                    font-semibold
                                    text-[#8e742d]
                                "
                            >
                                {
                                    eventTitle
                                }
                            </p>


                            <p
                                className="
                                    mt-4
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-[#59624a]
                                "
                            >
                                {
                                    copy.registrationIntro(
                                        checkout.formattedPrice
                                    )
                                }
                            </p>

                        </header>


                        <div
                            className="
                                space-y-8
                                px-6
                                py-7
                                sm:px-8
                                sm:py-8
                            "
                        >

                            <EventRegistrationPayee
                                firstName={
                                    checkout.firstName
                                }

                                lastName={
                                    checkout.lastName
                                }

                                email={
                                    checkout.email
                                }

                                confirmEmail={
                                    checkout.confirmEmail
                                }

                                setFirstName={
                                    checkout.setFirstName
                                }

                                setLastName={
                                    checkout.setLastName
                                }

                                setEmail={
                                    checkout.setEmail
                                }

                                setConfirmEmail={
                                    checkout.setConfirmEmail
                                }

                                loggedIn={
                                    checkout.loggedIn
                                }

                                copy={
                                    copy
                                }
                            />


                            <EventRegistrationPeople
                                people={
                                    checkout.additionalPeople
                                }

                                onAdd={
                                    checkout.addPerson
                                }

                                onRemove={
                                    checkout.removePerson
                                }

                                onUpdate={
                                    checkout.updatePerson
                                }

                                copy={
                                    copy
                                }
                            />


                            <EventRegistrationSummary
                                attendeeCount={
                                    checkout.attendeeCount
                                }

                                formattedPrice={
                                    checkout.formattedPrice
                                }

                                formattedTotal={
                                    checkout.formattedTotal
                                }

                                submitting={
                                    checkout.submitting
                                }

                                formComplete={
                                    checkout.formComplete
                                }

                                error={
                                    checkout.error
                                }

                                onSubmit={
                                    checkout.handleSubmit
                                }

                                copy={
                                    copy
                                }
                            />

                        </div>

                    </div>

                </motion.div>

            </section>


            {
                typeof document !==
                    "undefined" &&
                checkout.existingPayment &&
                createPortal(

                    <div
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            flex
                            items-center
                            justify-center
                            bg-black/65
                            px-5
                            backdrop-blur-[2px]
                        "
                    >

                        <EventRegistrationExistingPayment
                            copy={
                                copy
                            }

                            payment={
                                checkout.existingPayment
                            }

                            loading={
                                checkout.submitting
                            }

                            onContinue={
                                checkout.handleContinueExistingPayment
                            }

                            onCancel={
                                checkout.handleCancelExistingPayment
                            }
                        />

                    </div>,

                    document.body

                )
            }


            {
                typeof document !==
                    "undefined" &&
                checkout.activePayment
                    ?.clientSecret &&
                createPortal(

                    <div
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            overflow-y-auto
                            bg-black/65
                            px-5
                            pb-12
                            pt-24
                            backdrop-blur-[2px]
                            sm:pt-28
                        "
                    >

                        <div
                            className="
                                mx-auto
                                w-full
                                max-w-lg
                            "
                        >

                            <Elements
                                stripe={
                                    stripePromise
                                }

                                options={{
                                    clientSecret:
                                        checkout
                                            .activePayment
                                            .clientSecret
                                }}
                            >

                                <EventRegistrationPayment
                                    action={
                                        checkout
                                            .activePayment
                                            .action
                                    }

                                    amount={
                                        checkout
                                            .activePayment
                                            .amount
                                    }

                                    currency={
                                        checkout
                                            .activePayment
                                            .currency
                                    }

                                    copy={
                                        copy
                                    }

                                    onCancel={
                                        checkout
                                            .handleCancelActivePayment
                                    }

                                    onComplete={
                                        () => {

                                            if (
                                                checkout
                                                    .activePayment
                                                    ?.action ===
                                                "DONATION"
                                            ) {

                                                window
                                                    .location
                                                    .assign(
                                                        "/"
                                                    );

                                                return;
                                            }


                                            window
                                                .location
                                                .assign(
                                                    `/events/${event.slug}`
                                                );

                                        }
                                    }
                                />

                            </Elements>

                        </div>

                    </div>,

                    document.body

                )
            }


            {
                typeof document !==
                    "undefined" &&
                checkout.submitting &&
                !checkout.existingPayment &&
                !checkout.activePayment &&
                createPortal(

                    <div
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            flex
                            items-center
                            justify-center
                            bg-black/60
                            px-5
                            backdrop-blur-[2px]
                        "
                    >

                        <div
                            className="
                                border
                                border-white/20
                                bg-[#f7f7f4]
                                px-7
                                py-6
                                shadow-2xl
                                shadow-black/25
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-[#303824]
                                "
                            >
                                {
                                    copy.preparingPayment
                                }
                            </p>

                        </div>

                    </div>,

                    document.body

                )
            }

        </main>
    );
}


export default memo(
    EventRegistrationCheckout
);