import { paymentFromCheckout, paymentFromResume } from "../../paymentMapping";

import { useState } from "react";

import axios from "axios";

import type {
  ActivePayment,
  ResumePaymentResponse,
} from "../types/eventRegistrationTypes";

import {
  cancelEventRegistrationPayment,
  checkoutEventRegistration,
  resumeEventRegistrationPayment,
} from "../api/eventRegistrationApi";
import type { useRegistrationDetails } from "./useRegistrationDetails";
type Options = Pick<
  ReturnType<typeof useRegistrationDetails>,
  "formComplete" | "buildRequest"
>;
export function useRegistrationPayment({
  formComplete,
  buildRequest,
}: Options) {
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [activePayment, setActivePayment] = useState<ActivePayment | null>(
    null,
  );

  const [existingPayment, setExistingPayment] =
    useState<ResumePaymentResponse | null>(null);

  const loadExistingPayment = async () => {
    const resumedPayment = await resumeEventRegistrationPayment();

    if (!resumedPayment.client_secret) {
      throw new Error("Existing payment has no client secret.");
    }

    setExistingPayment(resumedPayment);
  };

  const handleSubmit = async () => {
    if (submitting || !formComplete) {
      return;
    }

    setSubmitting(true);

    setError(null);

    try {
      const result = await checkoutEventRegistration(buildRequest());

      if (result.result === "CONFIRM_EXISTING") {
        await loadExistingPayment();

        return;
      }

      if (result.clientSecret) {
        setActivePayment(paymentFromCheckout(result, "EVENT_REGISTRATION"));

        return;
      }

      const resumedPayment = await resumeEventRegistrationPayment();

      if (!resumedPayment.client_secret) {
        setError("This payment is no longer available.");

        return;
      }

      setActivePayment(paymentFromResume(resumedPayment, result.result));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 400:
            setError("Please check your registration information.");

            break;

          case 401:
            setError("Your session has expired. Please refresh and try again.");

            break;

          case 404:
            setError("This event or payment is no longer available.");

            break;

          case 409:
            setError(
              "The event information changed. Please refresh and try again.",
            );

            break;

          default:
            setError(
              "We could not prepare your registration payment. Please try again.",
            );
        }
      } else {
        setError(
          "We could not prepare your registration payment. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinueExistingPayment = () => {
    if (!existingPayment || submitting || !existingPayment.client_secret) {
      return;
    }

    setActivePayment(paymentFromResume(existingPayment, "EXISTING_DUPLICATE"));

    setExistingPayment(null);
  };

  const handleCancelExistingPayment = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);

    setError(null);

    try {
      await cancelEventRegistrationPayment();

      setExistingPayment(null);
    } catch {
      setError("We could not cancel the existing payment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelActivePayment = async () => {
    try {
      await cancelEventRegistrationPayment();
    } catch {
      /*
       * Still allow the UI to close.
       */
    }

    setActivePayment(null);
  };
  return {
    submitting,
    setSubmitting,
    error,
    setError,
    activePayment,
    setActivePayment,
    existingPayment,
    setExistingPayment,
    loadExistingPayment,
    handleSubmit,
    handleContinueExistingPayment,
    handleCancelExistingPayment,
    handleCancelActivePayment,
  };
}
