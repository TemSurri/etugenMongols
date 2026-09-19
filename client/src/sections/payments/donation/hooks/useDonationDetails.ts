import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { AuthUser } from "../../../auth/contracts/authContracts";
export function useDonationDetails(user: AuthUser | null) {
  const amountSectionRef = useRef<HTMLDivElement>(null);

  const [amount, setAmount] = useState("50");

  const [email, setEmail] = useState("");

  const [confirmEmail, setConfirmEmail] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [anonymous, setAnonymous] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [amountError, setAmountError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    // A refreshed auth profile deliberately repopulates these editable fields.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(user.email);

    setFirstName(user.firstName);

    setLastName(user.lastName);

    setConfirmEmail("");
  }, [user]);

  const numericAmount = useMemo(() => {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
      return 0;
    }

    return value;
  }, [amount]);

  const formattedAmount = useMemo(() => {
    return numericAmount.toLocaleString("en-CA", {
      style: "currency",

      currency: "CAD",

      minimumFractionDigits: 2,

      maximumFractionDigits: 2,
    });
  }, [numericAmount]);

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);

    setAmountError(null);

    setError(null);
  }, []);

  const handleQuickAmountSelect = useCallback((value: number) => {
    setAmount(String(value));

    setAmountError(null);

    setError(null);
  }, []);

  const scrollToField = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior: "smooth",

        block: "center",
      });

      window.setTimeout(() => {
        if (element instanceof HTMLElement) {
          element.focus({
            preventScroll: true,
          });
        }
      }, 350);
    });
  }, []);

  const scrollToAmount = useCallback(() => {
    requestAnimationFrame(() => {
      amountSectionRef.current?.scrollIntoView({
        behavior: "smooth",

        block: "center",
      });

      window.setTimeout(() => {
        document.getElementById("donation-amount")?.focus();
      }, 350);
    });
  }, []);
  return {
    amountSectionRef,
    amount,
    setAmount,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    anonymous,
    setAnonymous,
    message,
    setMessage,
    error,
    setError,
    amountError,
    setAmountError,
    numericAmount,
    formattedAmount,
    handleAmountChange,
    handleQuickAmountSelect,
    scrollToField,
    scrollToAmount,
  };
}
