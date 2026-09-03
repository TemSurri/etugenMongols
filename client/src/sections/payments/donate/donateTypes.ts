export type Lang =
  | "en"
  | "mn";


export type DonationCheckoutRequest = {

  amount: number;

  email: string;

  firstName: string;

  lastName: string;

  anonymous: boolean;

  message?: string;
};


export type PaymentIntentResultType =
  | "CREATED"
  | "EXISTING_DUPLICATE"
  | "CONFIRM_EXISTING";


export type PaymentAction =
  | "DONATION"
  | "EVENT_REGISTRATION";


export type PaymentIntentResult = {

  jobId: string;

  result: PaymentIntentResultType;

  clientSecret: string | null;

  amount: number;

  currency: string;

  email: string;
};


export type ResumePaymentResponse = {

  jobId: string;

  client_secret: string | null;

  action: PaymentAction;

  amount: number;

  currency: string;

  email: string;

  actionPayload:
    Record<string, unknown>;
};


export type ActivePayment = {

  jobId: string;

  result: PaymentIntentResultType;

  clientSecret: string | null;

  action: PaymentAction;

  amount: number;

  currency: string;

  email: string;

  actionPayload:
    Record<string, unknown> | null;
};


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