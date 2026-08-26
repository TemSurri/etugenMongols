export type Lang = "en" | "mn";

export type DonationCheckoutRequest = {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  message?: string;
};

export type DonationCopy = {
  donationTitle: string;

  amountLabel: string;
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
};