export type { Lang } from "../../../../context/language";
export type {
  PaymentAction,
  PaymentIntentResult,
  PaymentIntentResultType,
  ResumePaymentResponse,
} from "../../contracts/paymentContracts";
export type { ActivePayment } from "../../paymentSession";
export type { EventRegistrationCheckoutRequest } from "../contracts/eventRegistrationContracts";

export type RegistrationPerson = {
  id: string;
  firstName: string;
  lastName: string;
};
