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


/*
 * These values directly match
 * PaymentIntentResultType on the backend.
 */
export type PaymentIntentResultType =
  | "CREATED"
  | "EXISTING_DUPLICATE"
  | "CONFIRM_EXISTING";


/*
 * Response returned by:
 *
 * POST /payment/checkout-donate
 *
 * CREATED:
 *      brand new payment was created
 *
 * EXISTING_DUPLICATE:
 *      same request was already made recently
 *      so frontend should continue using that payment
 *
 * CONFIRM_EXISTING:
 *      an older/different INIT payment already exists
 *      frontend should ask what the user wants to do
 */
export type PaymentIntentResult = {

  jobId: string;

  result: PaymentIntentResultType;

  /*
   * Present when frontend can proceed to Stripe.
   *
   * Null for CONFIRM_EXISTING because we don't
   * want to continue the payment until the user
   * has made a choice.
   */
  clientSecret: string | null;

  /*
   * Amount is returned from backend in cents.
   *
   * Example:
   * 5000 = $50.00 CAD
   */
  amount: number;

  currency: string;

  email: string;
};


export type DonationCopy = {

  donationTitle: string;

  amountLabel: string;

  amountMinimum: string;

  amountPlaceholder: string;

  detailsTitle: string;

  emailLabel: string;

  emailPlaceholder: string;

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
   * Existing payment UI
   */
  existingPaymentTitle: string;

  existingPaymentDescription: string;

  existingPaymentAmount: string;

  existingPaymentEmail: string;

  continueExisting: string;

  cancelExisting: string;
};