import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useLoginFormMessages } from "../content/useLoginFormMessages";
import { useAuth } from "./useAuth";
export function useLoginForm(language: "en" | "mn") {
  const navigate = useNavigate();

  const { refreshAuth } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [needsVerification, setNeedsVerification] = useState(false);

  const [loading, setLoading] = useState(false);

  const mn = language === "mn";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    setError("");

    setNeedsVerification(false);

    /*
     * =====================================================
     * BACKEND LOGIN REQUEST
     * =====================================================
     *
     * POST /auth/login
     *
     * {
     *     email,
     *     password
     * }
     */
    try {
      await login({
        email: email,
        password: password,
      });

      /*
       * Login succeeded.
       *
       * Browser now has the SESSION cookie.
       * Refresh global auth state so the header
       * immediately knows the user is logged in.
       */
      await refreshAuth();

      navigate("/");
    } catch (error) {
      /*
       * Unexpected non-Axios failure.
       */
      if (!axios.isAxiosError(error)) {
        setError(
          useLoginFormMessages[mn ? "mn" : "en"]
            .somethingWentWrongPleaseTryAgain,
        );

        return;
      }

      /*
       * No HTTP response.
       */
      if (!error.response) {
        setError(
          useLoginFormMessages[mn ? "mn" : "en"]
            .unableToConnectToTheServerPlease,
        );

        return;
      }

      const status = error.response.status;

      switch (status) {
        case 400:
          setError(
            useLoginFormMessages[mn ? "mn" : "en"]
              .pleaseCheckTheInformationYouEntered,
          );

          break;

        case 401:
          setError(
            useLoginFormMessages[mn ? "mn" : "en"].invalidEmailOrPassword,
          );

          break;

        /*
         * Account exists but is not verified.
         */
        case 403:
          setError(
            useLoginFormMessages[mn ? "mn" : "en"]
              .yourAccountHasNotBeenVerifiedYet,
          );

          setNeedsVerification(true);

          break;

        case 429:
          setError(
            useLoginFormMessages[mn ? "mn" : "en"]
              .tooManyLoginAttemptsPleaseTryAgain,
          );

          break;

        default:
          if (status >= 500) {
            setError(
              useLoginFormMessages[mn ? "mn" : "en"]
                .theServerIsTemporarilyUnavailablePleaseTry,
            );
          } else {
            setError(
              useLoginFormMessages[mn ? "mn" : "en"]
                .unableToSignInPleaseTryAgain,
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
    loading,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    error,
    needsVerification,
  };
}
