import { useVerifyAccountFormMessages } from "../content/useVerifyAccountFormMessages";
import axios from "axios";
import { useState } from "react";
import { requestAccountVerification } from "../api/authApi";
import { useVerificationCountdown } from "./useVerificationCountdown";
export function useVerifyAccountForm(language: "en" | "mn") {
  const [email, setEmail] = useState("");

  const [sentEmail, setSentEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const [alreadyVerified, setAlreadyVerified] = useState(false);

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
        useVerifyAccountFormMessages[mn ? "mn" : "en"]
          .pleaseEnterYourEmailAddress,
      );

      return;
    }

    setLoading(true);

    setError("");

    setSuccess(false);

    setAlreadyVerified(false);

    /*
     * =====================================================
     * BACKEND ACCOUNT VERIFICATION REQUEST
     * =====================================================
     *
     * POST /auth/verify-account
     *
     * {
     *     email
     * }
     */
    try {
      await requestAccountVerification({
        email: normalizedEmail,
      });

      /*
       * Request succeeded.
       *
       * Keep a separate copy so that the success
       * message clearly shows where the email was sent.
       */
      setSentEmail(normalizedEmail);

      setSuccess(true);

      setCooldown(60);
    } catch (error) {
      /*
       * Unexpected non-Axios failure.
       */
      if (!axios.isAxiosError(error)) {
        setError(
          useVerifyAccountFormMessages[mn ? "mn" : "en"]
            .somethingWentWrongPleaseTryAgain,
        );

        return;
      }

      /*
       * No HTTP response.
       */
      if (!error.response) {
        setError(
          useVerifyAccountFormMessages[mn ? "mn" : "en"]
            .unableToConnectToTheServerPlease,
        );

        return;
      }

      const status = error.response.status;

      switch (status) {
        /*
         * Email does not belong to an account.
         */
        case 400:
          setError(
            useVerifyAccountFormMessages[mn ? "mn" : "en"]
              .weCouldnTFindAnAccountWith,
          );

          break;

        /*
         * Account has already been verified.
         */
        case 409:
          setError(
            useVerifyAccountFormMessages[mn ? "mn" : "en"]
              .thisAccountHasAlreadyBeenVerified,
          );

          setAlreadyVerified(true);

          break;

        /*
         * Rate limit / too many requests.
         */
        case 429:
          setError(
            useVerifyAccountFormMessages[mn ? "mn" : "en"]
              .tooManyVerificationRequestsPleaseWaitBefore,
          );

          break;

        default:
          if (status >= 500) {
            setError(
              useVerifyAccountFormMessages[mn ? "mn" : "en"]
                .theServerIsTemporarilyUnavailablePleaseTry,
            );
          } else {
            setError(
              useVerifyAccountFormMessages[mn ? "mn" : "en"]
                .unableToSendTheVerificationEmailPlease,
            );
          }
      }
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
    alreadyVerified,
    setAlreadyVerified,
    loading,
    success,
    sentEmail,
    cooldown,
  };
}
