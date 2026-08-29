import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  AuthContext,
} from "../../../context/AuthContext";

import {
  cancelDonationPayment,
  checkoutDonation,
  continueDonationPayment,
  verifyDonationSession,
} from "./donateApi";

import type {
  DonationCheckoutRequest,
  DonationCopy,
  PaymentIntentResult,
} from "./donateTypes";


export function useDonationCheckout(
  copy: DonationCopy
) {

  const auth =
    useContext(
      AuthContext
    );


  if (!auth) {

    throw new Error(
      "useDonationCheckout must be used inside AuthProvider."
    );
  }


  const {
    user,
    loading: authLoading,
    isLoggedIn,
    clearAuth,
  } = auth;


  const amountSectionRef =
    useRef<HTMLDivElement>(
      null
    );


  /* ------------------------------------------------------------------ */
  /* Form state                                                         */
  /* ------------------------------------------------------------------ */

  const [
    amount,
    setAmount,
  ] = useState("50");


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    firstName,
    setFirstName,
  ] = useState("");


  const [
    lastName,
    setLastName,
  ] = useState("");


  const [
    anonymous,
    setAnonymous,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);


  const [
    amountError,
    setAmountError,
  ] = useState<
    string | null
  >(null);


  /* ------------------------------------------------------------------ */
  /* Payment state                                                      */
  /* ------------------------------------------------------------------ */

  const [
    existingPayment,
    setExistingPayment,
  ] = useState<
    PaymentIntentResult | null
  >(null);


  const [
    activePayment,
    setActivePayment,
  ] = useState<
    PaymentIntentResult | null
  >(null);


  /* ------------------------------------------------------------------ */
  /* Auth autofill                                                      */
  /* ------------------------------------------------------------------ */

  useEffect(() => {

    if (!user) {
      return;
    }


    setEmail(
      user.email
    );

    setFirstName(
      user.firstName
    );

    setLastName(
      user.lastName
    );

  }, [user]);


  /* ------------------------------------------------------------------ */
  /* Amount                                                             */
  /* ------------------------------------------------------------------ */

  const numericAmount =
    useMemo(() => {

      const value =
        Number(amount);


      if (
        !Number.isFinite(value)
      ) {

        return 0;
      }


      return value;

    }, [amount]);


  const formattedAmount =
    useMemo(() => {

      return numericAmount
        .toLocaleString(
          "en-CA",
          {
            style:
              "currency",

            currency:
              "CAD",

            minimumFractionDigits:
              2,

            maximumFractionDigits:
              2,
          }
        );

    }, [numericAmount]);


  const handleAmountChange =
    useCallback(
      (
        value: string
      ) => {

        setAmount(
          value
        );

        setAmountError(
          null
        );

        setError(
          null
        );

      },
      []
    );


  const handleQuickAmountSelect =
    useCallback(
      (
        value: number
      ) => {

        setAmount(
          String(value)
        );

        setAmountError(
          null
        );

        setError(
          null
        );

      },
      []
    );


  /* ------------------------------------------------------------------ */
  /* Stripe transition                                                  */
  /* ------------------------------------------------------------------ */

  const continueToStripe =
    useCallback(
      (
        payment:
          PaymentIntentResult
      ) => {

        if (
          !payment.clientSecret
        ) {

          setError(
            copy.error
          );

          return;
        }


        setExistingPayment(
          null
        );


        setActivePayment(
          payment
        );

      },
      [
        copy.error,
      ]
    );

  /* ------------------------------------------------------------------ */
  /* Existing payment                                                   */
  /* ------------------------------------------------------------------ */

  const handleContinueExistingPayment =
  useCallback(
    async () => {

      if (
        !existingPayment ||
        submitting
      ) {
        return;
      }


      try {

        setSubmitting(true);

        setError(null);


        const clientSecret =
          await continueDonationPayment();


        // The backend reconciled the existing payment.
        // It is no longer ACTIVE, so there is nothing to resume.
        if (!clientSecret) {

          setExistingPayment(
            null
          );

          return;
        }


        // Resume using the server-validated Stripe client secret.
        continueToStripe({
          ...existingPayment,
          clientSecret,
        });


      } catch (error) {

        console.error(
          "Could not continue donation payment:",
          error
        );


        setError(
          copy.error
        );


      } finally {

        setSubmitting(
          false
        );
      }

    },
    [
      copy.error,
      continueToStripe,
      existingPayment,
      submitting,
    ]
  );


const handleCancelExistingPayment =
  useCallback(
    async () => {

      if (
        !existingPayment ||
        submitting
      ) {
        return;
      }


      try {

        setSubmitting(true);

        setError(null);


        await cancelDonationPayment();


        setExistingPayment(
          null
        );

      } catch (error) {

        console.error(
          "Could not cancel donation payment:",
          error
        );


        setError(
          copy.error
        );

      } finally {

        setSubmitting(false);
      }

    },
    [
      copy.error,
      existingPayment,
      submitting,
    ]
  );

  const handleCancelActivePayment =
  useCallback(
    async () => {

      if (!activePayment) {
        return;
      }


      await cancelDonationPayment();


      setActivePayment(
        null
      );

    },
    [
      activePayment,
    ]
  );


  /* ------------------------------------------------------------------ */
  /* Submission                                                         */
  /* ------------------------------------------------------------------ */

  const handleSubmit =
    useCallback(
      async (
        event:
          FormEvent<HTMLFormElement>
      ) => {

        event.preventDefault();


        if (submitting) {
          return;
        }


        setError(
          null
        );

        setAmountError(
          null
        );


        const cleanEmail =
          email.trim();

        const cleanFirstName =
          firstName.trim();

        const cleanLastName =
          lastName.trim();

        const cleanMessage =
          message.trim();


        /* Amount validation */

        if (
          !Number.isFinite(
            numericAmount
          ) ||
          numericAmount < 1
        ) {

          setAmountError(
            copy.amountMinimum
          );


          requestAnimationFrame(
            () => {

              amountSectionRef
                .current
                ?.scrollIntoView({
                  behavior:
                    "smooth",

                  block:
                    "center",
                });
            }
          );


          return;
        }


        /* Required information */

        if (
          !cleanEmail ||
          !cleanFirstName ||
          !cleanLastName
        ) {

          setError(
            copy.required
          );

          return;
        }


        const request:
          DonationCheckoutRequest = {

            amount:
              numericAmount,

            email:
              cleanEmail,

            firstName:
              cleanFirstName,

            lastName:
              cleanLastName,

            anonymous,
          };


        if (cleanMessage) {

          request.message =
            cleanMessage;
        }


        /*
         * Prevent an expired authenticated session
         * from silently becoming a guest.
         */
        const wasLoggedIn =
          localStorage.getItem(
            "wasLoggedIn"
          ) === "true";


        if (wasLoggedIn) {

          const sessionValid =
            await verifyDonationSession();


          if (!sessionValid) {

            alert(
              "Sorry, your session has timed out. Please log in again before continuing."
            );


            clearAuth();

            return;
          }
        }


        try {

          setSubmitting(
            true
          );


          const result =
            await checkoutDonation(
              request
            );


          switch (
            result.result
          ) {

            case "CREATED":

              continueToStripe(
                result
              );

              return;


            case "EXISTING_DUPLICATE":

              continueToStripe(
                result
              );

              return;


            case "CONFIRM_EXISTING":

              setExistingPayment(
                result
              );

              return;


            default:

              setError(
                copy.error
              );
          }

        } catch (error) {

          console.error(
            "Donation checkout failed:",
            error
          );


          setError(
            copy.error
          );

        } finally {

          setSubmitting(
            false
          );
        }

      },
      [
        anonymous,
        clearAuth,
        continueToStripe,
        copy.amountMinimum,
        copy.error,
        copy.required,
        email,
        firstName,
        lastName,
        message,
        numericAmount,
        submitting,
      ]
    );


  /* ------------------------------------------------------------------ */
  /* Public hook interface                                              */
  /* ------------------------------------------------------------------ */

  return {

  user,
  authLoading,
  isLoggedIn,

  amount,
  email,
  firstName,
  lastName,
  anonymous,
  message,

  setEmail,
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