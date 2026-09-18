export type DonationCheckoutRequest = {

  amount: number;

  email: string;

  firstName: string;

  lastName: string;

  anonymous: boolean;

  message?: string;
};
