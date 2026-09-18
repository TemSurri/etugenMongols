import type { PaymentAction,PaymentIntentResultType } from "./contracts/paymentContracts";
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
