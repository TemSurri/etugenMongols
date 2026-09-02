import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  DonationCopy,
  PaymentAction,
} from "./donateTypes";


type DonationPaymentProps = {

  action:
    PaymentAction;

  amount:
    number;

  currency:
    string;

  copy:
    DonationCopy;

  onCancel:
    () => Promise<void>;

  onComplete:
    () => void;
};


type PaymentState =
  | "payment"
  | "processing"
  | "success"
  | "invalid";


function DonationPayment({
  action,
  amount,
  currency,
  copy,
  onCancel,
  onComplete,
}: DonationPaymentProps) {

  const stripe =
    useStripe();

  const elements =
    useElements();


  const [
    state,
    setState,
  ] =
    useState<PaymentState>(
      "payment"
    );


  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);


  const [
    cancelling,
    setCancelling,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);


  const formattedAmount =
    (
      amount /
      100
    ).toLocaleString(
      "en-CA",
      {
        style:
          "currency",

        currency:
          currency.toUpperCase(),
      }
    );


  const isDonation =
    action ===
    "DONATION";


  const title =
    isDonation
      ? copy.paymentTitle
      : copy.eventPaymentTitle;


  const description =
    isDonation
      ? copy.paymentDescription
      : copy.eventPaymentDescription;


  const successTitle =
    isDonation
      ? copy.paymentSuccessTitle
      : copy.eventSuccessTitle;


  const successDescription =
    isDonation
      ? copy.paymentSuccessDescription
      : copy.eventSuccessDescription;


  const busy =
    submitting ||
    cancelling;


  const handleCancel =
    async () => {

      if (busy) {
        return;
      }


      try {

        setCancelling(
          true
        );

        setError(
          null
        );


        await onCancel();

      } catch (requestError) {

        console.error(
          "Payment cancellation failed:",
          requestError
        );


        setError(
          copy.paymentCancelError
        );


        setCancelling(
          false
        );
      }
    };


  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();


      if (
        !stripe ||
        !elements ||
        busy
      ) {
        return;
      }


      setSubmitting(
        true
      );

      setError(
        null
      );


      try {

        const {
          error: stripeError,
          paymentIntent,
        } =
          await stripe.confirmPayment({

            elements,

            confirmParams: {

              return_url:
                `${window.location.origin}/payments/donate/result`,
            },

            redirect:
              "if_required",
          });


        if (stripeError) {

          if (
            stripeError.code ===
            "payment_intent_unexpected_state"
          ) {

            setState(
              "invalid"
            );

            return;
          }


          setError(
            stripeError.message ??
            "Payment could not be completed."
          );

          return;
        }


        switch (
          paymentIntent?.status
        ) {

          case "succeeded":

            setState(
              "success"
            );

            return;


          case "processing":

            setState(
              "processing"
            );

            return;


          case "requires_payment_method":

            setError(
              "Your payment was not completed. Please check your payment method and try again."
            );

            return;


          case "requires_action":
          case "requires_confirmation":

            setError(
              "Your payment requires another confirmation step. Please try again."
            );

            return;


          case "requires_capture":
          case "canceled":
          case undefined:

            setState(
              "invalid"
            );

            return;


          default:

            setState(
              "invalid"
            );

            return;
        }

      } catch (requestError) {

        console.error(
          "Stripe confirmation failed:",
          requestError
        );


        setError(
          "Payment could not be completed. Please try again."
        );

      } finally {

        setSubmitting(
          false
        );
      }
    };


  if (
    state === "invalid"
  ) {

    return (
      <section
        role="alertdialog"

        aria-modal="true"

        className="
          w-full
          max-w-[620px]
          bg-white
          text-[#303824]
          shadow-2xl
        "
      >

        <div
          className="
            px-7
            py-12
            text-center
            sm:px-10
          "
        >

          <img
            src="/logo.webp"

            alt="Etugen Mongols"

            className="
              mx-auto
              h-16
              w-16
              object-contain
            "
          />


          <h2
            className="
              mt-7
              text-2xl
              font-normal
              tracking-tight
            "
          >
            {copy.paymentInvalidTitle}
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-md
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {copy.paymentInvalidDescription}
          </p>


          <button
            type="button"

            onClick={
              onComplete
            }

            className="
              mt-8
              inline-flex
              min-w-48
              items-center
              justify-center
              bg-[#303824]
              px-7
              py-3.5
              text-sm
              font-medium
              text-white
              transition-colors
              duration-150
              hover:bg-[#242a1b]
            "
          >
            {
              isDonation
                ? copy.paymentDone
                : copy.backToEvents
            }
          </button>

        </div>

      </section>
    );
  }


  if (
    state === "success"
  ) {

    return (
      <section
        role="dialog"

        aria-modal="true"

        className="
          w-full
          max-w-[620px]
          bg-white
          text-[#303824]
          shadow-2xl
        "
      >

        <div
          className="
            px-7
            py-10
            text-center
            sm:px-10
            sm:py-12
          "
        >

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#303824]
              text-white
            "
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"

              fill="none"

              className="
                h-8
                w-8
              "
            >

              <path
                d="
                  M5 12.5
                  L9.2 16.5
                  L19 7
                "

                stroke="currentColor"

                strokeWidth="2"

                strokeLinecap="round"

                strokeLinejoin="round"
              />

            </svg>

          </div>


          <p
            className="
              mt-6
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#9a7b26]
            "
          >
            {
              isDonation
                ? copy.donation
                : copy.eventRegistration
            }
          </p>


          <h2
            className="
              mt-3
              text-2xl
              font-normal
              tracking-tight
              sm:text-3xl
            "
          >
            {successTitle}
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-md
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {successDescription}
          </p>


          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {copy.queuedDescription}
          </p>


          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {copy.paymentSuccessEmail}
          </p>


          <div
            className="
              mx-auto
              mt-8
              max-w-sm
              border-y
              border-[#303824]/10
              py-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-6
                text-sm
              "
            >

              <span
                className="
                  text-[#69705c]
                "
              >
                {copy.paymentTotal}
              </span>


              <span
                className="
                  font-medium
                "
              >
                {formattedAmount}
              </span>

            </div>

          </div>


          <p
            className="
              mx-auto
              mt-5
              max-w-sm
              text-xs
              leading-5
              text-[#7a806e]
            "
          >
            {copy.safeToLeave}
          </p>


          <button
            type="button"

            onClick={
              onComplete
            }

            className="
              mt-8
              inline-flex
              min-w-48
              items-center
              justify-center
              bg-[#303824]
              px-7
              py-3.5
              text-sm
              font-medium
              text-white
              transition-colors
              duration-150
              hover:bg-[#242a1b]
            "
          >
            {
              isDonation
                ? copy.paymentDone
                : copy.backToEvents
            }
          </button>

        </div>

      </section>
    );
  }


  if (
    state === "processing"
  ) {

    return (
      <section
        role="dialog"

        aria-modal="true"

        className="
          w-full
          max-w-[620px]
          bg-white
          text-[#303824]
          shadow-2xl
        "
      >

        <div
          className="
            px-7
            py-12
            text-center
            sm:px-10
          "
        >

          <img
            src="/logo.webp"

            alt="Etugen Mongols"

            className="
              mx-auto
              h-16
              w-16
              object-contain
            "
          />


          <h2
            className="
              mt-7
              text-2xl
              font-normal
              tracking-tight
            "
          >
            {copy.paymentProcessingTitle}
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-md
              text-sm
              leading-7
              text-[#69705c]
            "
          >
            {copy.paymentProcessingDescription}
          </p>


          <div
            className="
              mx-auto
              mt-8
              max-w-sm
              border-y
              border-[#303824]/10
              py-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                text-sm
              "
            >

              <span
                className="
                  text-[#69705c]
                "
              >
                {copy.paymentTotal}
              </span>

              <span
                className="
                  font-medium
                "
              >
                {formattedAmount}
              </span>

            </div>

          </div>


          <button
            type="button"

            onClick={
              onComplete
            }

            className="
              mt-8
              inline-flex
              min-w-48
              items-center
              justify-center
              border
              border-[#303824]/20
              px-7
              py-3.5
              text-sm
              font-medium
              text-[#303824]
              transition-colors
              duration-150
              hover:bg-[#303824]/[0.03]
            "
          >
            {
              isDonation
                ? copy.paymentDone
                : copy.backToEvents
            }
          </button>

        </div>

      </section>
    );
  }


  return (
    <section
      role="dialog"

      aria-modal="true"

      aria-labelledby="donation-payment-title"

      className={`
        relative
        w-full
        max-w-[620px]
        bg-white
        text-[#303824]
        shadow-2xl
        transition-all
        duration-300

        ${
          cancelling
            ? "scale-[0.995] opacity-90"
            : "scale-100 opacity-100"
        }
      `}
    >

      <div
        className="
          border-b
          border-[#303824]/10
          px-6
          py-6
          sm:px-9
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-6
          "
        >

          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#9a7b26]
              "
            >
              {
                isDonation
                  ? copy.donation
                  : copy.eventRegistration
              }
            </p>


            <h2
              id="donation-payment-title"

              className="
                mt-2
                text-2xl
                font-normal
                tracking-tight
              "
            >
              {title}
            </h2>


            <p
              className="
                mt-2
                max-w-md
                text-sm
                leading-6
                text-[#69705c]
              "
            >
              {description}
            </p>

          </div>


          <img
            src="/logo.webp"

            alt="Etugen Mongols"

            className="
              h-11
              w-11
              shrink-0
              object-contain
            "
          />

        </div>


        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-6
            border-t
            border-[#303824]/10
            pt-4
          "
        >

          <span
            className="
              text-sm
              text-[#69705c]
            "
          >
            {copy.paymentTotal}
          </span>


          <span
            className="
              text-lg
              font-medium
            "
          >
            {formattedAmount}
          </span>

        </div>

      </div>


      <form
        onSubmit={
          handleSubmit
        }

        className="
          px-6
          py-7
          sm:px-9
          sm:py-8
        "
      >

        <PaymentElement />


        {
          error &&
          (

            <div
              role="alert"

              className="
                mt-6
                border-l-2
                border-[#d6ba72]
                bg-[#303824]/[0.03]
                px-4
                py-3
                text-sm
                leading-6
                text-[#59604d]
              "
            >
              {error}
            </div>

          )
        }


        <div
          className="
            mt-8
            flex
            flex-col-reverse
            gap-3
            sm:flex-row
          "
        >

          <button
            type="button"

            disabled={
              busy
            }

            onClick={
              handleCancel
            }

            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              border
              border-[#303824]/20
              px-6
              py-3.5
              text-sm
              font-medium
              text-[#303824]
              transition-all
              duration-200
              hover:border-[#303824]/45
              hover:bg-[#303824]/[0.03]
              disabled:cursor-wait
              disabled:opacity-70
            "
          >
            {
              cancelling
                ? (
                    <>

                      <span
                        aria-hidden="true"

                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          animate-spin
                          rounded-full
                          border-2
                          border-[#303824]/20
                          border-t-[#303824]
                        "
                      />

                      <span>
                        {copy.cancellingPayment}
                      </span>

                    </>
                  )
                : copy.paymentCancel
            }
          </button>


          <button
            type="submit"

            disabled={
              !stripe ||
              !elements ||
              busy
            }

            className="
              inline-flex
              flex-1
              items-center
              justify-center
              bg-[#303824]
              px-6
              py-3.5
              text-sm
              font-medium
              text-white
              transition-colors
              duration-150
              hover:bg-[#242a1b]
              disabled:cursor-wait
              disabled:opacity-60
            "
          >
            {
              submitting
                ? copy.paymentProcessing
                : `Pay ${formattedAmount}`
            }
          </button>

        </div>

      </form>

    </section>
  );
}


export default DonationPayment;