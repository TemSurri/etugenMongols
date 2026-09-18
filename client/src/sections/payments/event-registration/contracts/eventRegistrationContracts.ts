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
