import axios from "axios";

import {
  api,
} from "../../../api/client";

import type {
  DonationCheckoutRequest,
  PaymentIntentResult,
} from "./donateTypes";


/*
 * Starts or seeks an existing donation payment.
 *
 * Backend may return:
 *
 * CREATED
 *      new PaymentJob + Stripe PaymentIntent
 *
 * EXISTING_DUPLICATE
 *      same payment request was recently made
 *
 * CONFIRM_EXISTING
 *      another INIT payment already exists
 */
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
 * Used before checkout when the browser remembers
 * that this user was previously authenticated.
 *
 * Prevents silently falling back to a guest payment
 * after an authenticated session expires.
 */
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