import {
    api
} from "../../../../api/client";

import type {
    EventRegistrationCheckoutRequest,
    PaymentIntentResult,
    ResumePaymentResponse
} from "../eventRegistrationTypes";


export async function checkoutEventRegistration(
    request:
        EventRegistrationCheckoutRequest
): Promise<PaymentIntentResult> {

    const response =
        await api.post<
            PaymentIntentResult
        >(
            "/payment/checkout-event",
            request
        );


    return response.data;
}


export async function cancelEventRegistrationPayment():
Promise<void> {

    await api.post(
        "/payment/cancel-event-registration"
    );
}


export async function resumeEventRegistrationPayment():
Promise<ResumePaymentResponse> {

    const response =
        await api.post<
            ResumePaymentResponse
        >(
            "/payment/resume-event-registration"
        );


    return response.data;
}