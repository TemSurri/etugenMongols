import axios from "axios";

import {
  api,
} from "../../../api/client";

import type {
  DonationCheckoutRequest,
} from "./donateTypes";


export async function checkoutDonation(
  request: DonationCheckoutRequest
): Promise<void> {

  await api.post(
    "/payment/checkout-donate",
    request
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