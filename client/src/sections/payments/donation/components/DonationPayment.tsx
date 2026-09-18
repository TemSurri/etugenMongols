import { formatPaymentAmount } from "../../formatPaymentAmount";
import { paymentMedia } from "../../media";
import {
PaymentElement,
useElements,
useStripe,
} from "@stripe/react-stripe-js";
import { DonationInvalidPanel,DonationProcessingPanel,DonationSuccessPanel } from "./DonationPaymentStatus";

import {
useState,
type FormEvent,
} from "react";

import type {
DonationCopy,
PaymentAction,
} from "../types/donationTypes";


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
    formatPaymentAmount(amount, currency);


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

    return <DonationInvalidPanel copy={copy} isDonation={isDonation} onComplete={onComplete} />;
  }


  if (
    state === "success"
  ) {

    return <DonationSuccessPanel copy={copy} isDonation={isDonation} onComplete={onComplete} formattedAmount={formattedAmount} successTitle={successTitle} successDescription={successDescription} />;
  }


  if (
    state === "processing"
  ) {

    return <DonationProcessingPanel copy={copy} isDonation={isDonation} onComplete={onComplete} formattedAmount={formattedAmount} />;
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
            src={paymentMedia.logo}

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
