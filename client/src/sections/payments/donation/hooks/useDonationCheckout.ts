import { useContext } from "react";

import { AuthContext } from "../../../auth/context/authContext";

import type { DonationCopy } from "../types/donationTypes";
import { useDonationDetails } from "./useDonationDetails";
import { useDonationPayment } from "./useDonationPayment";
export function useDonationCheckout(copy: DonationCopy) {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useDonationCheckout must be used inside AuthProvider.");
  }

  const { user, loading: authLoading, isLoggedIn, clearAuth } = auth;
  const details = useDonationDetails(user);
  const payment = useDonationPayment({
    ...details,
    copy,
    isLoggedIn,
    clearAuth,
  });
  const {
    amount,
    email,
    confirmEmail,
    firstName,
    lastName,
    anonymous,
    message,
    setEmail,
    setConfirmEmail,
    setFirstName,
    setLastName,
    setAnonymous,
    setMessage,
    numericAmount,
    formattedAmount,
    amountError,
    error,
    amountSectionRef,
    handleAmountChange,
    handleQuickAmountSelect,
  } = details;
  const {
    submitting,
    activePayment,
    existingPayment,
    handleSubmit,
    handleContinueExistingPayment,
    handleCancelExistingPayment,
    handleCancelActivePayment,
  } = payment;
  return {
    user,
    authLoading,
    isLoggedIn,

    amount,
    email,
    confirmEmail,
    firstName,
    lastName,
    anonymous,
    message,

    setEmail,
    setConfirmEmail,
    setFirstName,
    setLastName,
    setAnonymous,
    setMessage,

    numericAmount,
    formattedAmount,

    amountError,
    error,
    submitting,

    activePayment,
    existingPayment,

    amountSectionRef,

    handleAmountChange,
    handleQuickAmountSelect,

    handleSubmit,

    handleContinueExistingPayment,
    handleCancelExistingPayment,
    handleCancelActivePayment,
  };
}
