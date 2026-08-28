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
} from "./donateTypes";


type DonationPaymentProps = {

  amount: number;

  currency: string;

  copy: DonationCopy;

  onCancel:
    () => Promise<void>;

  onComplete:
    () => void;
};


type PaymentState =
  | "payment"
  | "processing"
  | "success";


function DonationPayment({
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
  ] = useState<PaymentState>(
    "payment"
  );


  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  const [
    cancelling,
    setCancelling,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);


  const formattedAmount =
    (amount / 100)
      .toLocaleString(
        "en-CA",
        {
          style:
            "currency",

          currency:
            currency.toUpperCase(),
        }
      );


  const busy =
    submitting ||
    cancelling;


  /* -------------------------------------------- */
  /* Cancel payment                               */
  /* -------------------------------------------- */

  const handleCancel =
    async () => {

      if (busy) {
        return;
      }


      try {

        setCancelling(true);

        setError(null);


        /*
         * Actual cancellation belongs to
         * the backend.
         */
        await onCancel();


      } catch (error) {

        console.error(
          "Donation cancellation failed:",
          error
        );


        setError(
          copy.paymentCancelError
        );


        setCancelling(false);
      }
    };


  /* -------------------------------------------- */
  /* Confirm Stripe payment                       */
  /* -------------------------------------------- */

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


      setSubmitting(true);

      setError(null);


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

            /*
             * Normal card payments stay
             * inside the modal.
             */
            redirect:
              "if_required",
          });


        if (stripeError) {

          setError(
            stripeError.message ??
            "Payment could not be completed."
          );

          return;
        }


        /*
         * Browser-side confirmation only.
         *
         * Your webhook remains authoritative
         * for backend fulfillment.
         */
        if (
          paymentIntent
            ?.status ===
            "succeeded"
        ) {

          setState(
            "success"
          );

          return;
        }


        if (
          paymentIntent
            ?.status ===
            "processing"
        ) {

          setState(
            "processing"
          );

          return;
        }


        setError(
          "Your payment has not been completed yet. Please try again."
        );


      } catch (error) {

        console.error(
          "Stripe confirmation failed:",
          error
        );


        setError(
          "Payment could not be completed. Please try again."
        );


      } finally {

        setSubmitting(false);
      }
    };


  /* -------------------------------------------- */
  /* Success                                      */
  /* -------------------------------------------- */

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
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-[#303824]/[0.05]
            "
          >

            <img
              src="/logo.webp"
              alt="Etugen Mongols"
              className="
                h-14
                w-14
                object-contain
              "
            />

          </div>


          <div
            className="
              mx-auto
              mt-7
              flex
              h-12
              w-12
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
                h-6
                w-6
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


          <h2
            className="
              mt-6
              text-2xl
              font-normal
              tracking-tight
              sm:text-3xl
            "
          >
            {copy.paymentSuccessTitle}
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
            {copy.paymentSuccessDescription}
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
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#303824]
              focus-visible:ring-offset-2
            "
          >
            Go back to home
          </button>

        </div>

      </section>
    );
  }


  /* -------------------------------------------- */
  /* Processing                                   */
  /* -------------------------------------------- */

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
              animate-pulse
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
            Go back to home
          </button>

        </div>

      </section>
    );
  }


  /* -------------------------------------------- */
  /* Payment form                                 */
  /* -------------------------------------------- */

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-payment-title"
      className="
        relative
        w-full
        max-w-[620px]
        bg-white
        text-[#303824]
        shadow-2xl
      "
    >

      {/* Header */}

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

            <h2
              id="donation-payment-title"
              className="
                text-2xl
                font-normal
                tracking-tight
              "
            >
              {copy.paymentTitle}
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
              {copy.paymentDescription}
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


      {/* Stripe */}

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


        {error && (

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

        )}


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
              border
              border-[#303824]/20
              px-6
              py-3.5
              text-sm
              font-medium
              text-[#303824]
              transition-colors
              duration-150
              hover:border-[#303824]/45
              hover:bg-[#303824]/[0.03]
              disabled:cursor-wait
              disabled:opacity-50
            "
          >
            {copy.paymentCancel}
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
              gap-3
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

            {submitting ? (

              <>
                <img
                  src="/logo.webp"
                  alt=""
                  className="
                    h-5
                    w-5
                    animate-pulse
                    object-contain
                  "
                />

                {copy.paymentProcessing}
              </>

            ) : (

              <>
                Pay {formattedAmount}
              </>

            )}

          </button>

        </div>

      </form>


      {/* Blocking overlay while Stripe/cancel runs */}

      {busy && (

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-start
            justify-center
            bg-white/95
            px-6
            pt-24
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              text-center
            "
          >

            <img
              src="/logo.webp"
              alt="Etugen Mongols"
              className="
                mx-auto
                h-16
                w-16
                animate-pulse
                object-contain
              "
            />


            <p
              className="
                mt-4
                text-sm
                font-medium
                text-[#59604d]
              "
            >
              {
                cancelling
                  ? copy.paymentCancel
                  : copy.paymentProcessing
              }
            </p>

          </div>

        </div>

      )}

    </section>
  );
}


export default DonationPayment;