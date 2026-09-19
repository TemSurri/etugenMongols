import {
  requireCheckoutPayment,
  requireResumedPayment,
} from "../../contracts/paymentGuards";
import axios from "axios";
import { getCurrentUser } from "../../../auth/api/authApi";

import { api } from "../../../../api/client";

import type {
  DonationCheckoutRequest,
  PaymentIntentResult,
  ResumePaymentResponse,
} from "../types/donationTypes";

export async function checkoutDonation(
  request: DonationCheckoutRequest,
): Promise<PaymentIntentResult> {
  const response = await api.post<PaymentIntentResult>(
    "/payment/checkout-donate",
    request,
  );

  return requireCheckoutPayment(response.data);
}

export async function continueDonationPayment(): Promise<ResumePaymentResponse | null> {
  const response = await api.post<ResumePaymentResponse>(
    "/payment/resume-donation",
    undefined,
    {
      validateStatus: (status) =>
        status === 200 || status === 204 || status === 205,
    },
  );

  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return requireResumedPayment(response.data);
}

export async function cancelDonationPayment(): Promise<void> {
  await api.post("/payment/cancel-donation");
}

export async function verifyDonationSession(): Promise<boolean> {
  try {
    await getCurrentUser();

    return true;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      return false;
    }

    throw error;
  }
}
