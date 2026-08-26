import { api } from "../../../api/client";

export type DonationCheckoutRequest = {
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  dedication?: string;
};

export async function checkoutDonation(
  request: DonationCheckoutRequest
): Promise<void> {
  await api.post("/payment/checkout-donate", request);
}