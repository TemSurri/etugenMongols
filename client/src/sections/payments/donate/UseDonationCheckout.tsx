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
  ActivePayment,
  DonationCheckoutRequest,
  DonationCopy,
  PaymentIntentResult,
  ResumePaymentResponse,
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


  const [
    amount,
    setAmount,
  ] = useState("50");


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    confirmEmail,
    setConfirmEmail,
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


  const [
    existingPayment,
    setExistingPayment,
  ] = useState<
    ResumePaymentResponse | null
  >(null);


  const [
    activePayment,
    setActivePayment,
  ] = useState<
    ActivePayment | null
  >(null);


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


    setConfirmEmail("");

  }, [user]);


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


  const scrollToField =
    useCallback(
      (
        id: string
      ) => {

        requestAnimationFrame(
          () => {

            const element =
              document.getElementById(
                id
              );


            element
              ?.scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "center",
              });


            window.setTimeout(
              () => {

                if (
                  element instanceof
                  HTMLElement
                ) {

                  element.focus({
                    preventScroll:
                      true,
                  });
                }

              },
              350
            );
          }
        );
      },
      []
    );


  const scrollToAmount =
    useCallback(
      () => {

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


            window.setTimeout(
              () => {

                document
                  .getElementById(
                    "donation-amount"
                  )
                  ?.focus();

              },
              350
            );
          }
        );
      },
      []
    );


  const continueDonationToStripe =
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


        const active:
          ActivePayment = {

            jobId:
              payment.jobId,

            result:
              payment.result,

            clientSecret:
              payment.clientSecret,

            action:
              "DONATION",

            amount:
              payment.amount,

            currency:
              payment.currency,

            email:
              payment.email,

            actionPayload:
              null,
          };


        setExistingPayment(
          null
        );

        setActivePayment(
          active
        );
      },
      [
        copy.error,
      ]
    );


  const continueResumedToStripe =
    useCallback(
      (
        payment:
          ResumePaymentResponse
      ) => {

        if (
          !payment.client_secret
        ) {

          setError(
            copy.error
          );

          return;
        }


        const active:
          ActivePayment = {

            jobId:
              payment.jobId,

            result:
              "EXISTING_DUPLICATE",

            clientSecret:
              payment.client_secret,

            action:
              payment.action,

            amount:
              payment.amount,

            currency:
              payment.currency,

            email:
              payment.email,

            actionPayload:
              payment.actionPayload,
          };


        setExistingPayment(
          null
        );

        setActivePayment(
          active
        );
      },
      [
        copy.error,
      ]
    );


  const handleContinueExistingPayment =
    useCallback(
      () => {

        if (
          !existingPayment ||
          submitting
        ) {
          return;
        }


        continueResumedToStripe(
          existingPayment
        );
      },
      [
        continueResumedToStripe,
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

          setSubmitting(
            true
          );

          setError(
            null
          );


          await cancelDonationPayment();


          setExistingPayment(
            null
          );

        } catch (requestError) {

          console.error(
            "Could not cancel payment:",
            requestError
          );


          setError(
            copy.paymentCancelError
          );

        } finally {

          setSubmitting(
            false
          );
        }
      },
      [
        copy.paymentCancelError,
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


        const cleanAmount =
          amount.trim();


        const cleanEmail =
          email
            .trim()
            .toLowerCase();

        const cleanConfirmEmail =
          confirmEmail
            .trim()
            .toLowerCase();

        const cleanFirstName =
          firstName.trim();

        const cleanLastName =
          lastName.trim();

        const cleanMessage =
          message.trim();


        const amountFormatValid =
          /^\d+(?:\.\d{1,2})?$/
            .test(
              cleanAmount
            );


        if (!amountFormatValid) {

          setAmountError(
            copy.amountDecimalPlaces
          );

          scrollToAmount();

          return;
        }


        if (
          !Number.isFinite(
            numericAmount
          ) ||
          numericAmount < 1
        ) {

          setAmountError(
            copy.amountMinimum
          );

          scrollToAmount();

          return;
        }


        if (!cleanEmail) {

          setError(
            copy.required
          );

          scrollToField(
            "donation-email"
          );

          return;
        }


        if (!cleanFirstName) {

          setError(
            copy.required
          );

          scrollToField(
            "donation-first-name"
          );

          return;
        }


        if (!cleanLastName) {

          setError(
            copy.required
          );

          scrollToField(
            "donation-last-name"
          );

          return;
        }


        if (
          !isLoggedIn &&
          (
            !cleanConfirmEmail ||
            cleanEmail !==
              cleanConfirmEmail
          )
        ) {

          setError(
            copy.emailsDoNotMatch
          );

          scrollToField(
            "donation-confirm-email"
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

              continueDonationToStripe(
                result
              );

              return;


            case "EXISTING_DUPLICATE":

              continueDonationToStripe(
                result
              );

              return;


            case "CONFIRM_EXISTING": {

              const resumedPayment =
                await continueDonationPayment();


              if (!resumedPayment) {

                setExistingPayment(
                  null
                );

                return;
              }


              setExistingPayment(
                resumedPayment
              );

              return;
            }


            default:

              setError(
                copy.error
              );
          }

        } catch (requestError) {

          console.error(
            "Donation checkout failed:",
            requestError
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
        amount,
        anonymous,
        clearAuth,
        confirmEmail,
        continueDonationToStripe,
        copy.amountDecimalPlaces,
        copy.amountMinimum,
        copy.emailsDoNotMatch,
        copy.error,
        copy.required,
        email,
        firstName,
        isLoggedIn,
        lastName,
        message,
        numericAmount,
        scrollToAmount,
        scrollToField,
        submitting,
      ]
    );


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