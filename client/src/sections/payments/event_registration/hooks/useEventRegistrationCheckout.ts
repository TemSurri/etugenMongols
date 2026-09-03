import {
    useEffect,
    useMemo,
    useState
} from "react";

import axios from "axios";

import {
    useAuth
} from "../../../../context/useAuth";

import type {
    ApiEvent
} from "../../../events/types";

import type {
    ActivePayment,
    EventRegistrationCheckoutRequest,
    RegistrationPerson,
    ResumePaymentResponse
} from "../eventRegistrationTypes";

import {
    cancelEventRegistrationPayment,
    checkoutEventRegistration,
    resumeEventRegistrationPayment
} from "../api/eventRegistrationApi";


export function useEventRegistrationCheckout(
    event: ApiEvent
) {

    const {
        user
    } = useAuth();


    const loggedIn =
        user !== null;


    const [
        firstName,
        setFirstName
    ] = useState(
        user?.firstName ?? ""
    );


    const [
        lastName,
        setLastName
    ] = useState(
        user?.lastName ?? ""
    );


    const [
        email,
        setEmail
    ] = useState(
        user?.email ?? ""
    );


    const [
        confirmEmail,
        setConfirmEmail
    ] = useState(
        ""
    );


    const [
        additionalPeople,
        setAdditionalPeople
    ] = useState<
        RegistrationPerson[]
    >([]);


    const [
        submitting,
        setSubmitting
    ] = useState(
        false
    );


    const [
        error,
        setError
    ] = useState<
        string |
        null
    >(null);


    const [
        activePayment,
        setActivePayment
    ] = useState<
        ActivePayment |
        null
    >(null);


    const [
        existingPayment,
        setExistingPayment
    ] = useState<
        ResumePaymentResponse |
        null
    >(null);


    useEffect(
        () => {

            if (!user) {
                return;
            }


            setFirstName(
                user.firstName ?? ""
            );


            setLastName(
                user.lastName ?? ""
            );


            setEmail(
                user.email ?? ""
            );


            setConfirmEmail(
                ""
            );

        },
        [
            user
        ]
    );


    const createPerson =
        (): RegistrationPerson => {

            return {

                id:
                    crypto.randomUUID(),

                firstName:
                    "",

                lastName:
                    ""

            };
        };


    const addPerson =
        () => {

            setAdditionalPeople(
                current => [
                    ...current,
                    createPerson()
                ]
            );
        };


    const removePerson =
        (
            id: string
        ) => {

            setAdditionalPeople(
                current =>
                    current.filter(
                        person =>
                            person.id !== id
                    )
            );
        };


    const updatePerson =
        (
            id: string,

            field:
                | "firstName"
                | "lastName",

            value: string
        ) => {

            setAdditionalPeople(
                current =>
                    current.map(
                        person => {

                            if (
                                person.id !== id
                            ) {
                                return person;
                            }


                            return {
                                ...person,

                                [field]:
                                    value
                            };
                        }
                    )
            );
        };


    const attendeeCount =
        1 +
        additionalPeople.length;


    const registrationCost =
        event.registrationCost ??
        0;


    const totalAmount =
        registrationCost *
        attendeeCount;


    const formattedPrice =
        useMemo(
            () => {

                return new Intl.NumberFormat(
                    "en-CA",
                    {
                        style:
                            "currency",

                        currency:
                            "CAD"
                    }
                ).format(
                    registrationCost /
                    100
                );

            },
            [
                registrationCost
            ]
        );


    const formattedTotal =
        useMemo(
            () => {

                return new Intl.NumberFormat(
                    "en-CA",
                    {
                        style:
                            "currency",

                        currency:
                            "CAD"
                    }
                ).format(
                    totalAmount /
                    100
                );

            },
            [
                totalAmount
            ]
        );


    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    const normalizedConfirmEmail =
        confirmEmail
            .trim()
            .toLowerCase();


    const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                normalizedEmail
            );


    const emailsMatch =
        normalizedEmail ===
        normalizedConfirmEmail;


    const guestEmailComplete =
        loggedIn ||
        (
            normalizedConfirmEmail.length > 0 &&
            emailsMatch
        );


    const payerComplete =
        firstName
            .trim()
            .length > 0 &&

        lastName
            .trim()
            .length > 0 &&

        emailValid &&

        guestEmailComplete;


    const guestsComplete =
        additionalPeople.every(
            person =>

                person.firstName
                    .trim()
                    .length > 0 &&

                person.lastName
                    .trim()
                    .length > 0
        );


    const formComplete =
        payerComplete &&
        guestsComplete;


    const buildRequest =
        (): EventRegistrationCheckoutRequest => {

            return {

                eventId:
                    event.id,


                attendeeCount:
                    attendeeCount,


                price:
                    totalAmount,


                payer: {

                    firstName:
                        firstName.trim(),

                    lastName:
                        lastName.trim(),

                    email:
                        normalizedEmail

                },


                additionalPeople:
                    additionalPeople.map(
                        person => ({

                            firstName:
                                person.firstName
                                    .trim(),

                            lastName:
                                person.lastName
                                    .trim()

                        })
                    )

            };
        };


    const loadExistingPayment =
        async () => {

            const resumedPayment =
                await resumeEventRegistrationPayment();


            if (
                !resumedPayment.client_secret
            ) {

                throw new Error(
                    "Existing payment has no client secret."
                );
            }


            setExistingPayment(
                resumedPayment
            );
        };


    const handleSubmit =
        async () => {

            if (
                submitting ||
                !formComplete
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
                    await checkoutEventRegistration(
                        buildRequest()
                    );


                if (
                    result.result ===
                    "CONFIRM_EXISTING"
                ) {

                    await loadExistingPayment();

                    return;
                }


                if (
                    result.clientSecret
                ) {

                    setActivePayment({

                        jobId:
                            result.jobId,

                        result:
                            result.result,

                        clientSecret:
                            result.clientSecret,

                        amount:
                            result.amount,

                        currency:
                            result.currency,

                        email:
                            result.email,

                        action:
                            "EVENT_REGISTRATION",

                        actionPayload:
                            null

                    });

                    return;
                }


                const resumedPayment =
                    await resumeEventRegistrationPayment();


                if (
                    !resumedPayment.client_secret
                ) {

                    setError(
                        "This payment is no longer available."
                    );

                    return;
                }


                setActivePayment({

                    jobId:
                        resumedPayment.jobId,

                    result:
                        result.result,

                    clientSecret:
                        resumedPayment.client_secret,

                    amount:
                        resumedPayment.amount,

                    currency:
                        resumedPayment.currency,

                    email:
                        resumedPayment.email,

                    action:
                        resumedPayment.action,

                    actionPayload:
                        resumedPayment.actionPayload

                });

            } catch (
                err
            ) {

                if (
                    axios.isAxiosError(
                        err
                    )
                ) {

                    switch (
                        err.response?.status
                    ) {

                        case 400:

                            setError(
                                "Please check your registration information."
                            );

                            break;


                        case 401:

                            setError(
                                "Your session has expired. Please refresh and try again."
                            );

                            break;


                        case 404:

                            setError(
                                "This event or payment is no longer available."
                            );

                            break;


                        case 409:

                            setError(
                                "The event information changed. Please refresh and try again."
                            );

                            break;


                        default:

                            setError(
                                "We could not prepare your registration payment. Please try again."
                            );

                    }

                } else {

                    setError(
                        "We could not prepare your registration payment. Please try again."
                    );

                }

            } finally {

                setSubmitting(
                    false
                );

            }

        };


    const handleContinueExistingPayment =
        () => {

            if (
                !existingPayment ||
                submitting ||
                !existingPayment.client_secret
            ) {
                return;
            }


            setActivePayment({

                jobId:
                    existingPayment.jobId,

                result:
                    "EXISTING_DUPLICATE",

                clientSecret:
                    existingPayment.client_secret,

                amount:
                    existingPayment.amount,

                currency:
                    existingPayment.currency,

                email:
                    existingPayment.email,

                action:
                    existingPayment.action,

                actionPayload:
                    existingPayment.actionPayload

            });


            setExistingPayment(
                null
            );
        };


    const handleCancelExistingPayment =
        async () => {

            if (
                submitting
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

                await cancelEventRegistrationPayment();


                setExistingPayment(
                    null
                );

            } catch {

                setError(
                    "We could not cancel the existing payment."
                );

            } finally {

                setSubmitting(
                    false
                );

            }

        };


    const handleCancelActivePayment =
        async () => {

            try {

                await cancelEventRegistrationPayment();

            } catch {

                /*
                 * Still allow the UI to close.
                 */

            }


            setActivePayment(
                null
            );

        };


    return {

        loggedIn,


        firstName,
        lastName,
        email,
        confirmEmail,


        setFirstName,
        setLastName,
        setEmail,
        setConfirmEmail,


        additionalPeople,


        addPerson,
        removePerson,
        updatePerson,


        attendeeCount,

        registrationCost,

        totalAmount,

        formattedPrice,
        formattedTotal,


        formComplete,

        submitting,

        error,


        activePayment,

        existingPayment,


        handleSubmit,

        handleContinueExistingPayment,

        handleCancelExistingPayment,

        handleCancelActivePayment

    };
}