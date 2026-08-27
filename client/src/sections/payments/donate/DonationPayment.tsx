import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import {
  useState,
  type FormEvent,
} from "react";


type DonationPaymentProps = {

  amount: number;

  currency: string;

  onBack: () => void;
};


function DonationPayment({
  amount,
  currency,
  onBack,
}: DonationPaymentProps) {

  const stripe =
    useStripe();

  const elements =
    useElements();


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


  const formattedAmount =
    (amount / 100)
      .toLocaleString(
        "en-CA",
        {
          style: "currency",

          currency:
            currency.toUpperCase(),
        }
      );


  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();


      if (
        !stripe ||
        !elements ||
        submitting
      ) {

        return;
      }


      setSubmitting(true);

      setError(
        null
      );


      const {
        error: stripeError,
      } =
        await stripe.confirmPayment({

          elements,

          confirmParams: {

            return_url:
              `${window.location.origin}/payments/donate/result`,
          },
        });


      /*
       * Successful payments may redirect.
       *
       * Immediate Stripe validation/payment
       * errors return here.
       */
      if (stripeError) {

        setError(
          stripeError.message ??
          "Payment could not be completed."
        );

        setSubmitting(
          false
        );
      }
    };


  return (
    <section
      className="
        mx-auto
        w-full
        max-w-[700px]
      "
    >

      <button
        type="button"
        onClick={
          onBack
        }
        disabled={
          submitting
        }
        className="
          mb-8
          text-sm
          text-[#69705c]
          underline
          underline-offset-4
          disabled:opacity-50
        "
      >
        Back to donation
      </button>


      <h1
        className="
          text-3xl
          font-normal
          leading-[1.08]
          tracking-tight
          text-[#303824]
          sm:text-4xl
        "
      >
        Complete your donation
      </h1>


      <div
        className="
          mt-4
          text-sm
          text-[#69705c]
        "
      >
        Total:{" "}

        <span
          className="
            font-medium
            text-[#303824]
          "
        >
          {formattedAmount}
        </span>
      </div>


      <form
        onSubmit={
          handleSubmit
        }
        className="mt-8"
      >

        <PaymentElement />


        {error && (

          <div
            role="alert"
            className="
              mt-6
              border-l-2
              border-[#d6ba72]
              bg-[#303824]/[0.025]
              py-3
              pl-4
              pr-4
              text-sm
              leading-6
              text-[#59604d]
            "
          >
            {error}
          </div>

        )}


        <button
          type="submit"
          disabled={
            !stripe ||
            !elements ||
            submitting
          }
          className="
            mt-8
            inline-flex
            w-full
            items-center
            justify-center
            bg-[#303824]
            px-7
            py-4
            text-sm
            font-medium
            text-[#fffaf0]
            transition-all
            duration-200
            hover:bg-[#242a1b]
            disabled:cursor-wait
            disabled:opacity-60
          "
        >
          {
            submitting
              ? "Processing..."
              : `Pay ${formattedAmount}`
          }
        </button>

      </form>

    </section>
  );
}


export default DonationPayment;