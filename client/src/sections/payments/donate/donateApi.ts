import axios from "axios";

import {
  api,
} from "../../../api/client";

import type {
  DonationCheckoutRequest,
  PaymentIntentResult,
} from "./donateTypes";


export async function checkoutDonation(
  request: DonationCheckoutRequest
): Promise<PaymentIntentResult> {

  const response =
    await api.post<PaymentIntentResult>(
      "/payment/checkout-donate",
      request
    );

  return response.data;
}


/*
 * Continue an existing INIT donation payment.
 *
 * Expected backend behavior:
 * - verify ownership/session
 * - verify payment is still continuable
 * - retrieve/reuse Stripe PaymentIntent
 * - return client secret
 */
export async function continueDonationPayment():
  Promise<string | null> {

  const response =
    await api.post<string>(
      "/payment/continue-donation",
      undefined,
      {
        validateStatus: (status) =>
          status === 200 ||
          status === 204 ||
          status === 205,
      }
    );


  // Backend reconciled the payment and determined
  // that there is nothing left to resume.
  if (
    response.status === 204 ||
    response.status === 205
  ) {

    return null;
  }


  return response.data;
}


/*
 * Cancel an existing donation payment.
 *
 * Expected backend behavior:
 * - find job ownership from session
 * - cancel PaymentIntent when appropriate
 * - mark PaymentJob cancelled
 */
export async function cancelDonationPayment():
  Promise<void> {

  await api.post(
    "/payment/cancel-donation"
  );
}


export async function verifyDonationSession():
  Promise<boolean> {

  try {

    await api.get(
      "/auth/me"
    );

    return true;

  } catch (error) {

    if (
      axios.isAxiosError(error) &&
      (
        error.response?.status === 401 ||
        error.response?.status === 403
      )
    ) {

      return false;
    }

    throw error;
  }
}