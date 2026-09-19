import { paymentFromCheckout, paymentFromResume } from "../../paymentMapping";

import { useCallback, useState, type FormEvent } from "react";

import {
  cancelDonationPayment,
  checkoutDonation,
  continueDonationPayment,
  verifyDonationSession,
} from "../api/donationApi";

import type {
  ActivePayment,
  DonationCheckoutRequest,
  DonationCopy,
  PaymentIntentResult,
  ResumePaymentResponse,
} from "../types/donationTypes";
import type { useDonationDetails } from "./useDonationDetails";
type Options = ReturnType<typeof useDonationDetails> & {
  copy: DonationCopy;
  isLoggedIn: boolean;
  clearAuth: () => void;
};
export function useDonationPayment({
  copy,
  isLoggedIn,
  clearAuth,
  amount,
  email,
  confirmEmail,
  firstName,
  lastName,
  anonymous,
  message,
  setError,
  setAmountError,
  numericAmount,
  scrollToField,
  scrollToAmount,
}: Options) {
  const [submitting, setSubmitting] = useState(false);

  const [existingPayment, setExistingPayment] =
    useState<ResumePaymentResponse | null>(null);

  const [activePayment, setActivePayment] = useState<ActivePayment | null>(
    null,
  );

  const continueDonationToStripe = useCallback(
    (payment: PaymentIntentResult) => {
      if (!payment.clientSecret) {
        setError(copy.error);

        return;
      }

      const active: ActivePayment = paymentFromCheckout(payment, "DONATION");

      setExistingPayment(null);

      setActivePayment(active);
    },
    [copy.error, setError],
  );

  const continueResumedToStripe = useCallback(
    (payment: ResumePaymentResponse) => {
      if (!payment.client_secret) {
        setError(copy.error);

        return;
      }

      const active: ActivePayment = paymentFromResume(
        payment,
        "EXISTING_DUPLICATE",
      );

      setExistingPayment(null);

      setActivePayment(active);
    },
    [copy.error, setError],
  );

  const handleContinueExistingPayment = useCallback(() => {
    if (!existingPayment || submitting) {
      return;
    }

    continueResumedToStripe(existingPayment);
  }, [continueResumedToStripe, existingPayment, submitting]);

  const handleCancelExistingPayment = useCallback(async () => {
    if (!existingPayment || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      setError(null);

      await cancelDonationPayment();

      setExistingPayment(null);
    } catch (requestError) {
      console.error("Could not cancel payment:", requestError);

      setError(copy.paymentCancelError);
    } finally {
      setSubmitting(false);
    }
  }, [copy.paymentCancelError, existingPayment, submitting, setError]);

  const handleCancelActivePayment = useCallback(async () => {
    if (!activePayment) {
      return;
    }

    await cancelDonationPayment();

    setActivePayment(null);
  }, [activePayment]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (submitting) {
        return;
      }

      setError(null);

      setAmountError(null);

      const cleanAmount = amount.trim();

      const cleanEmail = email.trim().toLowerCase();

      const cleanConfirmEmail = confirmEmail.trim().toLowerCase();

      const cleanFirstName = firstName.trim();

      const cleanLastName = lastName.trim();

      const cleanMessage = message.trim();

      const amountFormatValid = /^\d+(?:\.\d{1,2})?$/.test(cleanAmount);

      if (!amountFormatValid) {
        setAmountError(copy.amountDecimalPlaces);

        scrollToAmount();

        return;
      }

      if (!Number.isFinite(numericAmount) || numericAmount < 1) {
        setAmountError(copy.amountMinimum);

        scrollToAmount();

        return;
      }

      if (!cleanEmail) {
        setError(copy.required);

        scrollToField("donation-email");

        return;
      }

      if (!cleanFirstName) {
        setError(copy.required);

        scrollToField("donation-first-name");

        return;
      }

      if (!cleanLastName) {
        setError(copy.required);

        scrollToField("donation-last-name");

        return;
      }

      if (
        !isLoggedIn &&
        (!cleanConfirmEmail || cleanEmail !== cleanConfirmEmail)
      ) {
        setError(copy.emailsDoNotMatch);

        scrollToField("donation-confirm-email");

        return;
      }

      const request: DonationCheckoutRequest = {
        amount: numericAmount,

        email: cleanEmail,

        firstName: cleanFirstName,

        lastName: cleanLastName,

        anonymous,
      };

      if (cleanMessage) {
        request.message = cleanMessage;
      }

      const wasLoggedIn = localStorage.getItem("wasLoggedIn") === "true";

      if (wasLoggedIn) {
        const sessionValid = await verifyDonationSession();

        if (!sessionValid) {
          alert(
            "Sorry, your session has timed out. Please log in again before continuing.",
          );

          clearAuth();

          return;
        }
      }

      try {
        setSubmitting(true);

        const result = await checkoutDonation(request);

        switch (result.result) {
          case "CREATED":
            continueDonationToStripe(result);

            return;

          case "EXISTING_DUPLICATE":
            continueDonationToStripe(result);

            return;

          case "CONFIRM_EXISTING": {
            const resumedPayment = await continueDonationPayment();

            if (!resumedPayment) {
              setExistingPayment(null);

              return;
            }

            setExistingPayment(resumedPayment);

            return;
          }

          default:
            setError(copy.error);
        }
      } catch (requestError) {
        console.error("Donation checkout failed:", requestError);

        setError(copy.error);
      } finally {
        setSubmitting(false);
      }
    },
    [
      amount,
      anonymous,
      clearAuth,
      confirmEmail,
      continueDonationToStripe,
      copy.amountDecimalPlaces,
      copy.amountMinimum,
      copy.emailsDoNotMatch,
      copy.error,
      copy.required,
      email,
      firstName,
      isLoggedIn,
      lastName,
      message,
      numericAmount,
      scrollToAmount,
      scrollToField,
      submitting,
      setError,
      setAmountError,
    ],
  );
  return {
    submitting,
    setSubmitting,
    existingPayment,
    setExistingPayment,
    activePayment,
    setActivePayment,
    continueDonationToStripe,
    continueResumedToStripe,
    handleContinueExistingPayment,
    handleCancelExistingPayment,
    handleCancelActivePayment,
    handleSubmit,
  };
}
