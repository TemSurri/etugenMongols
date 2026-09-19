export type { Lang } from "../../../../context/language";
export type {
  PaymentAction,
  PaymentIntentResult,
  PaymentIntentResultType,
  ResumePaymentResponse,
} from "../../contracts/paymentContracts";
export type { ActivePayment } from "../../paymentSession";
export type { DonationCheckoutRequest } from "../contracts/donationContracts";

export type DonationCopy = {
  donationTitle: string;

  amountLabel: string;

  amountMinimum: string;

  amountPlaceholder: string;

  detailsTitle: string;

  emailLabel: string;

  emailPlaceholder: string;

  confirmEmailLabel: string;

  confirmEmailPlaceholder: string;

  emailsDoNotMatch: string;

  firstNameLabel: string;

  firstNamePlaceholder: string;

  lastNameLabel: string;

  lastNamePlaceholder: string;

  anonymousLabel: string;

  messageTitle: string;

  messageDescription: string;

  messageLabel: string;

  messagePlaceholder: string;

  summaryTitle: string;

  donationSummary: string;

  total: string;

  checkout: string;

  processing: string;

  required: string;

  error: string;

  loggedInAs: string;

  accountTitle: string;

  accountDescription: string;

  login: string;

  createAccount: string;

  amountDescription: string;
  amountDecimalPlaces: string;

  /*
   * Existing payment
   */
  existingPaymentTitle: string;

  existingPaymentDescription: string;

  existingDonationDescription: string;

  existingEventDescription: string;

  existingPaymentType: string;

  existingPaymentAmount: string;

  existingPaymentEmail: string;

  existingPaymentRegistrant: string;

  existingPaymentAttendees: string;

  donation: string;

  eventRegistration: string;

  continueExisting: string;

  cancelExisting: string;

  cancellingPayment: string;

  /*
   * Stripe payment
   */
  paymentTitle: string;

  paymentDescription: string;

  eventPaymentTitle: string;

  eventPaymentDescription: string;

  paymentTotal: string;

  paymentCancel: string;

  paymentProcessing: string;

  /*
   * Success
   */
  paymentSuccessTitle: string;

  paymentSuccessDescription: string;

  paymentSuccessEmail: string;

  eventSuccessTitle: string;

  eventSuccessDescription: string;

  queuedDescription: string;

  safeToLeave: string;

  paymentDone: string;

  backToEvents: string;

  /*
   * Processing / errors
   */
  paymentProcessingTitle: string;

  paymentProcessingDescription: string;

  paymentCancelError: string;

  paymentInvalidTitle: string;

  paymentInvalidDescription: string;
};
