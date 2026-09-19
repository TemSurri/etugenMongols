import { buildRegistrationRequest } from "../utils/buildRegistrationRequest";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../../auth/hooks/useAuth";

import type { ApiEvent } from "../../../events/types";

import type { RegistrationPerson } from "../types/eventRegistrationTypes";

export function useRegistrationDetails(event: ApiEvent) {
  const { user } = useAuth();

  const loggedIn = user !== null;

  const [firstName, setFirstName] = useState(user?.firstName ?? "");

  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const [email, setEmail] = useState(user?.email ?? "");

  const [confirmEmail, setConfirmEmail] = useState("");

  const [additionalPeople, setAdditionalPeople] = useState<
    RegistrationPerson[]
  >([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    // Preserve profile prefill on auth refresh without changing user edits otherwise.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstName(user.firstName ?? "");

    setLastName(user.lastName ?? "");

    setEmail(user.email ?? "");

    setConfirmEmail("");
  }, [user]);

  const createPerson = (): RegistrationPerson => {
    return {
      id: crypto.randomUUID(),

      firstName: "",

      lastName: "",
    };
  };

  const addPerson = () => {
    setAdditionalPeople((current) => [...current, createPerson()]);
  };

  const removePerson = (id: string) => {
    setAdditionalPeople((current) =>
      current.filter((person) => person.id !== id),
    );
  };

  const updatePerson = (
    id: string,

    field: "firstName" | "lastName",

    value: string,
  ) => {
    setAdditionalPeople((current) =>
      current.map((person) => {
        if (person.id !== id) {
          return person;
        }

        return {
          ...person,

          [field]: value,
        };
      }),
    );
  };

  const attendeeCount = 1 + additionalPeople.length;

  const registrationCost = event.registrationCost ?? 0;

  const totalAmount = registrationCost * attendeeCount;

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",

      currency: "CAD",
    }).format(registrationCost / 100);
  }, [registrationCost]);

  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",

      currency: "CAD",
    }).format(totalAmount / 100);
  }, [totalAmount]);

  const normalizedEmail = email.trim().toLowerCase();

  const normalizedConfirmEmail = confirmEmail.trim().toLowerCase();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  const emailsMatch = normalizedEmail === normalizedConfirmEmail;

  const guestEmailComplete =
    loggedIn || (normalizedConfirmEmail.length > 0 && emailsMatch);

  const payerComplete =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    guestEmailComplete;

  const guestsComplete = additionalPeople.every(
    (person) =>
      person.firstName.trim().length > 0 && person.lastName.trim().length > 0,
  );

  const formComplete = payerComplete && guestsComplete;

  const buildRequest = () =>
    buildRegistrationRequest({
      eventId: event.id,
      attendeeCount,
      totalAmount,
      firstName,
      lastName,
      normalizedEmail,
      additionalPeople,
    });
  return {
    loggedIn,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    additionalPeople,
    setAdditionalPeople,
    createPerson,
    addPerson,
    removePerson,
    updatePerson,
    attendeeCount,
    registrationCost,
    totalAmount,
    formattedPrice,
    formattedTotal,
    normalizedEmail,
    normalizedConfirmEmail,
    emailValid,
    emailsMatch,
    guestEmailComplete,
    payerComplete,
    guestsComplete,
    formComplete,
    buildRequest,
  };
}
