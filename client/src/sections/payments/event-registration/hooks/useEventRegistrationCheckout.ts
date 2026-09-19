import type { ApiEvent } from "../../../events/types";
import { useRegistrationDetails } from "./useRegistrationDetails";
import { useRegistrationPayment } from "./useRegistrationPayment";
export function useEventRegistrationCheckout(event: ApiEvent) {
  const details = useRegistrationDetails(event);
  const payment = useRegistrationPayment(details);
  const {
    loggedIn,
    firstName,
    lastName,
    email,
    confirmEmail,
    setFirstName,
    setLastName,
    setEmail,
    setConfirmEmail,
    additionalPeople,
    addPerson,
    removePerson,
    updatePerson,
    attendeeCount,
    registrationCost,
    totalAmount,
    formattedPrice,
    formattedTotal,
    formComplete,
  } = details;
  const {
    submitting,
    error,
    activePayment,
    existingPayment,
    handleSubmit,
    handleContinueExistingPayment,
    handleCancelExistingPayment,
    handleCancelActivePayment,
  } = payment;
  return {
    loggedIn,

    firstName,
    lastName,
    email,
    confirmEmail,

    setFirstName,
    setLastName,
    setEmail,
    setConfirmEmail,

    additionalPeople,

    addPerson,
    removePerson,
    updatePerson,

    attendeeCount,

    registrationCost,

    totalAmount,

    formattedPrice,
    formattedTotal,

    formComplete,

    submitting,

    error,

    activePayment,

    existingPayment,

    handleSubmit,

    handleContinueExistingPayment,

    handleCancelExistingPayment,

    handleCancelActivePayment,
  };
}
