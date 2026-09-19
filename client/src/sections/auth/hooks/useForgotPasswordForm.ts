import axios from "axios";
import { useState } from "react";
import { requestPasswordReset } from "../api/authApi";
import { useForgotPasswordFormMessages } from "../content/useForgotPasswordFormMessages";
import { useVerificationCountdown } from "./useVerificationCountdown";
export function useForgotPasswordForm(language: "en" | "mn") {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cooldown, setCooldown] = useVerificationCountdown();

  const mn = language === "mn";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading || cooldown > 0) {
      return;
    }

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError(
        useForgotPasswordFormMessages[mn ? "mn" : "en"]
          .pleaseEnterYourEmailAddress,
      );

      return;
    }

    setLoading(true);

    setError("");

    setSuccess(false);

    /*
     * =====================================================
     * BACKEND PASSWORD RESET REQUEST
     * =====================================================
     *
     * POST /auth/forgot-password
     *
     * {
     *     email
     * }
     */
    try {
      await requestPasswordReset({
        email: normalizedEmail,
      });

      /*
       * Only a successful HTTP response reaches here.
       *
       * Keep the message generic so we don't reveal
       * whether an account exists for the email.
       */
      setSuccess(true);

      setCooldown(60);
    } catch (error) {
      /*
       * Unexpected non-Axios failure.
       */
      if (!axios.isAxiosError(error)) {
        setError(
          useForgotPasswordFormMessages[mn ? "mn" : "en"]
            .somethingWentWrongPleaseTryAgain,
        );

        return;
      }

      /*
       * No response means the frontend could not
       * connect to the backend.
       */
      if (!error.response) {
        setError(
          useForgotPasswordFormMessages[mn ? "mn" : "en"]
            .unableToConnectToTheServerPlease,
        );

        return;
      }

      const status = error.response.status;

      /*
       * Too many password reset requests.
       */
      if (status === 429) {
        setError(
          useForgotPasswordFormMessages[mn ? "mn" : "en"]
            .tooManyPasswordResetRequestsPleaseWait,
        );

        return;
      }

      /*
       * Backend/server failure.
       */
      if (status >= 500) {
        setError(
          useForgotPasswordFormMessages[mn ? "mn" : "en"]
            .theServerIsTemporarilyUnavailablePleaseTry,
        );

        return;
      }

      /*
       * Any other HTTP error.
       *
       * 400, 401, 403, 404, 409, etc.
       */
      setError(
        useForgotPasswordFormMessages[mn ? "mn" : "en"]
          .unableToProcessThePasswordResetRequest,
      );
    } finally {
      setLoading(false);
    }
  }
  return {
    handleSubmit,
    mn,
    email,
    setEmail,
    error,
    setError,
    loading,
    success,
    cooldown,
  };
}
