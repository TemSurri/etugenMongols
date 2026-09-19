import axios from "axios";
import { useState } from "react";
import { signup } from "../api/authApi";
import { useSignupFormMessages } from "../content/useSignupFormMessages";
export function useSignupForm(
  language: "en" | "mn",
  onAccountCreated: () => void,
) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const mn = language === "mn";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (password !== confirmPassword) {
      setError(useSignupFormMessages[mn ? "mn" : "en"].passwordsDoNotMatch);

      return;
    }

    if (password.length < 8) {
      setError(
        useSignupFormMessages[mn ? "mn" : "en"].passwordMustBeAtLeastCharacters,
      );

      return;
    }

    setLoading(true);

    /*
     * BACKEND SIGNUP REQUEST
     */
    try {
      await signup({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      onAccountCreated();
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        setError(
          useSignupFormMessages[mn ? "mn" : "en"]
            .somethingWentWrongPleaseTryAgain,
        );

        return;
      }

      if (!error.response) {
        setError(
          useSignupFormMessages[mn ? "mn" : "en"]
            .unableToReachTheServicePleaseTry,
        );

        return;
      }

      const status = error.response.status;

      switch (status) {
        case 400:
          setError(
            useSignupFormMessages[mn ? "mn" : "en"]
              .pleaseCheckTheInformationYouEntered,
          );

          break;

        case 403:
          setError(
            useSignupFormMessages[mn ? "mn" : "en"].youAreAlreadySignedIn,
          );

          break;

        case 409:
          setError(
            useSignupFormMessages[mn ? "mn" : "en"]
              .anAccountWithThisEmailAlreadyExists,
          );

          break;

        case 429:
          setError(
            useSignupFormMessages[mn ? "mn" : "en"]
              .tooManyRequestsPleaseTryAgainLater,
          );

          break;

        default:
          if (status >= 500) {
            setError(
              useSignupFormMessages[mn ? "mn" : "en"]
                .theServerIsTemporarilyUnavailablePleaseTry,
            );
          } else {
            setError(
              useSignupFormMessages[mn ? "mn" : "en"]
                .unableToCreateYourAccountPleaseTry,
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
    firstName,
    loading,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    showConfirmPassword,
    confirmPassword,
    setConfirmPassword,
    setShowConfirmPassword,
    error,
  };
}
