export type PaymentIntentResultType =
  | "CREATED"
  | "EXISTING_DUPLICATE"
  | "CONFIRM_EXISTING";

export type PaymentAction = "DONATION" | "EVENT_REGISTRATION";

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

  actionPayload: Record<string, unknown>;
};
