export type Lang =
    "en" |
    "mn";


export type RegistrationPerson = {
    id: string;
    firstName: string;
    lastName: string;
};


export type EventRegistrationCheckoutRequest = {
    eventId: string;

    attendeeCount: number;

    price: number;

    payer: {
        firstName: string;
        lastName: string;
        email: string;
    };

    additionalPeople: {
        firstName: string;
        lastName: string;
    }[];
};


export type PaymentIntentResultType =
    "CREATED" |
    "EXISTING_DUPLICATE" |
    "CONFIRM_EXISTING";


export type PaymentAction =
    "DONATION" |
    "EVENT_REGISTRATION";


export type PaymentIntentResult = {
    jobId: string;

    result:
        PaymentIntentResultType;

    clientSecret:
        string |
        null;

    amount:
        number;

    currency:
        string;

    email:
        string;
};


export type ResumePaymentResponse = {
    jobId:
        string;

    client_secret:
        string |
        null;

    action:
        PaymentAction;

    amount:
        number;

    currency:
        string;

    email:
        string;

    actionPayload:
        Record<
            string,
            unknown
        >;
};


export type ActivePayment = {
    jobId:
        string;

    result:
        PaymentIntentResultType;

    clientSecret:
        string |
        null;

    amount:
        number;

    currency:
        string;

    email:
        string;

    action:
        PaymentAction;

    actionPayload:
        Record<
            string,
            unknown
        > |
        null;
};