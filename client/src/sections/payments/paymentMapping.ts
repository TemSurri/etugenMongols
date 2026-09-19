import type {
  PaymentAction,
  PaymentIntentResult,
  PaymentIntentResultType,
  ResumePaymentResponse,
} from "./contracts/paymentContracts";
import type { ActivePayment } from "./paymentSession";

export function paymentFromCheckout(
  payment: PaymentIntentResult,
  action: PaymentAction,
): ActivePayment {
  return {
    jobId: payment.jobId,
    result: payment.result,
    clientSecret: payment.clientSecret,
    action,
    amount: payment.amount,
    currency: payment.currency,
    email: payment.email,
    actionPayload: null,
  };
}

export function paymentFromResume(
  payment: ResumePaymentResponse,
  result: PaymentIntentResultType,
): ActivePayment {
  return {
    jobId: payment.jobId,
    result,
    clientSecret: payment.client_secret,
    action: payment.action,
    amount: payment.amount,
    currency: payment.currency,
    email: payment.email,
    actionPayload: payment.actionPayload,
  };
}
