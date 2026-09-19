import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { useResetPasswordFormMessages } from "../content/useResetPasswordFormMessages";
export function useResetPasswordForm(language: "en" | "mn", token: string) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [invalidToken, setInvalidToken] = useState(false);

  const mn = language === "mn";

  function validatePassword(value: string) {
    if (value.length < 8) {
      return useResetPasswordFormMessages[mn ? "mn" : "en"]
        .passwordMustBeAtLeastCharacters;
    }

    if (!/[A-Z]/.test(value)) {
      return useResetPasswordFormMessages[mn ? "mn" : "en"]
        .passwordMustContainAtLeastOneUppercase;
    }

    if (!/[a-z]/.test(value)) {
      return useResetPasswordFormMessages[mn ? "mn" : "en"]
        .passwordMustContainAtLeastOneLowercase;
    }

    if (!/[0-9]/.test(value)) {
      return useResetPasswordFormMessages[mn ? "mn" : "en"]
        .passwordMustContainAtLeastOneNumber;
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);

      return;
    }

    if (password !== confirmPassword) {
      setError(
        useResetPasswordFormMessages[mn ? "mn" : "en"].passwordsDoNotMatch,
      );

      return;
    }

    setLoading(true);

    setError("");

    /*
     * =====================================================
     * PASSWORD RESET
     * =====================================================
     *
     * Uses the SAME endpoint as requesting the reset email.
     *
     * POST /auth/forgot-password
     *
     * {
     *     token,
     *     password
     * }
     */
    try {
      await resetPassword({
        token,
        password,
      });

      setSuccess(true);

      /*
       * Give the user enough time to see
       * the success state, then return to login.
       */
      window.setTimeout(() => {
        navigate("/auth/login", {
          replace: true,
        });
      }, 1800);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        setError(
          useResetPasswordFormMessages[mn ? "mn" : "en"]
            .somethingWentWrongPleaseTryAgain,
        );

        return;
      }

      /*
       * Backend could not be reached.
       */
      if (!error.response) {
        setError(
          useResetPasswordFormMessages[mn ? "mn" : "en"]
            .unableToConnectToTheServerPlease,
        );

        return;
      }

      const status = error.response.status;

      switch (status) {
        /*
         * Password rejected by backend validation.
         */
        case 400:
          setError(
            useResetPasswordFormMessages[mn ? "mn" : "en"]
              .thatPasswordDoesNotMeetThePassword,
          );

          break;

        /*
         * Reset token invalid / expired / already used.
         *
         * Adjust this status if your backend uses
         * a different one for invalid tokens.
         */
        case 404:
          setInvalidToken(true);

          setError(
            useResetPasswordFormMessages[mn ? "mn" : "en"]
              .thisPasswordResetLinkIsInvalidOr,
          );

          break;

        /*
         * Too many requests.
         */
        case 429:
          setError(
            useResetPasswordFormMessages[mn ? "mn" : "en"]
              .tooManyPasswordResetAttemptsPleaseWait,
          );

          break;

        default:
          if (status >= 500) {
            setError(
              useResetPasswordFormMessages[mn ? "mn" : "en"]
                .theServerIsTemporarilyUnavailablePleaseTry,
            );
          } else {
            setError(
              useResetPasswordFormMessages[mn ? "mn" : "en"]
                .unableToResetYourPasswordPleaseTry,
            );
          }
      }
    } finally {
      setLoading(false);
    }
  }
  return {
    success,
    mn,
    invalidToken,
    error,
    handleSubmit,
    showPassword,
    password,
    setPassword,
    setError,
    loading,
    setShowPassword,
    showConfirmPassword,
    confirmPassword,
    setConfirmPassword,
    setShowConfirmPassword,
  };
}
