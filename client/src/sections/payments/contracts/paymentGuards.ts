import type {
  PaymentIntentResult,
  ResumePaymentResponse,
} from "./paymentContracts";

function isPaymentBase(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  return (
    "jobId" in value &&
    typeof value.jobId === "string" &&
    "amount" in value &&
    typeof value.amount === "number" &&
    "currency" in value &&
    typeof value.currency === "string" &&
    "email" in value &&
    typeof value.email === "string"
  );
}

export function isPaymentIntentResult(
  value: unknown,
): value is PaymentIntentResult {
  return (
    isPaymentBase(value) &&
    (value.result === "CREATED" ||
      value.result === "EXISTING_DUPLICATE" ||
      value.result === "CONFIRM_EXISTING") &&
    (value.clientSecret === null || typeof value.clientSecret === "string")
  );
}

export function isResumePaymentResponse(
  value: unknown,
): value is ResumePaymentResponse {
  return (
    isPaymentBase(value) &&
    (value.action === "DONATION" || value.action === "EVENT_REGISTRATION") &&
    (value.client_secret === null || typeof value.client_secret === "string") &&
    value.actionPayload !== null &&
    typeof value.actionPayload === "object" &&
    !Array.isArray(value.actionPayload)
  );
}

export function requireCheckoutPayment(value: unknown): PaymentIntentResult {
  if (!isPaymentIntentResult(value))
    throw new Error("Invalid checkout response");
  return value;
}

export function requireResumedPayment(value: unknown): ResumePaymentResponse {
  if (!isResumePaymentResponse(value))
    throw new Error("Invalid resume response");
  return value;
}
