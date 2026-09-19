import type { EventRegistrationCheckoutRequest } from "../contracts/eventRegistrationContracts";
import type { RegistrationPerson } from "../types/eventRegistrationTypes";
export function buildRegistrationRequest({
  eventId,
  attendeeCount,
  totalAmount,
  firstName,
  lastName,
  normalizedEmail,
  additionalPeople,
}: {
  eventId: string;
  attendeeCount: number;
  totalAmount: number;
  firstName: string;
  lastName: string;
  normalizedEmail: string;
  additionalPeople: RegistrationPerson[];
}): EventRegistrationCheckoutRequest {
  return {
    eventId: eventId,

    attendeeCount: attendeeCount,

    price: totalAmount,

    payer: {
      firstName: firstName.trim(),

      lastName: lastName.trim(),

      email: normalizedEmail,
    },

    additionalPeople: additionalPeople.map((person) => ({
      firstName: person.firstName.trim(),

      lastName: person.lastName.trim(),
    })),
  };
}
