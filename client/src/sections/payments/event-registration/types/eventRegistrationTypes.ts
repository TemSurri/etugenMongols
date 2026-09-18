export type { PaymentAction,PaymentIntentResult,PaymentIntentResultType,ResumePaymentResponse } from "../../contracts/paymentContracts";
export type { ActivePayment } from "../../paymentSession";
export type { EventRegistrationCheckoutRequest } from "../contracts/eventRegistrationContracts";
export type Lang =
    "en" |
    "mn";


export type RegistrationPerson = {
    id: string;
    firstName: string;
    lastName: string;
};


















