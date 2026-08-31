import { memo } from "react";

import type {
  DonationCopy,
  PaymentIntentResult,
} from "./donateTypes";


type DonationExistingPaymentProps = {

  copy: DonationCopy;

  payment: PaymentIntentResult;

  onContinue: () => void;

  onCancel: () => void;

  loading: boolean;
};


function DonationExistingPayment({
  copy,
  payment,
  onContinue,
  onCancel,
  loading,
}: DonationExistingPaymentProps) {

  /*
   * Backend stores money in the smallest currency unit.
   *
   * 5000 -> $50.00
   */
  const formattedAmount =
    (payment.amount / 100)
      .toLocaleString(
        "en-CA",
        {
          style: "currency",
          currency:
            payment.currency.toUpperCase(),
        }
      );


  return (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/35
      px-5
    "
  >
    <section
      role="dialog"
      aria-modal="true"
      className="
        w-full
        max-w-md
        bg-[#fffaf0]
        p-7
        text-[#303824]
        shadow-2xl
        sm:p-8
      "
    >

      <h2
        className="
          text-xl
          font-medium
          tracking-tight
        "
      >
        {copy.existingPaymentTitle}
      </h2>


      {/* Existing payment information */}

      <div
        className="
          mt-6
          border-y
          border-[#303824]/15
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-5
            text-sm
          "
        >
          <span className="text-[#69705c]">
            {copy.existingPaymentAmount}
          </span>

          <span className="font-medium">
            {formattedAmount}
          </span>
        </div>


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-5
            text-sm
          "
        >
          <span className="text-[#69705c]">
            {copy.existingPaymentEmail}
          </span>

          <span
            className="
              truncate
              font-medium
            "
          >
            {payment.email}
          </span>
        </div>
      </div>


      {/* Actions */}

      <div
        className="
          mt-6
          flex
          flex-col
          gap-3
          sm:flex-row
        "
      >
        <button
          type="button"
          disabled={loading}
          onClick={onContinue}
          className="
            inline-flex
            flex-1
            items-center
            justify-center
            bg-[#303824]
            px-5
            py-3.5
            text-sm
            font-medium
            text-[#fffaf0]
            transition-colors
            duration-150
            hover:bg-[#242a1b]
            disabled:cursor-wait
            disabled:opacity-60
          "
        >
          {copy.continueExisting}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="
            inline-flex
            flex-1
            items-center
            justify-center
            border
            border-[#303824]/20
            px-5
            py-3.5
            text-sm
            font-medium
            text-[#303824]
            transition-colors
            duration-150
            hover:border-[#303824]/45
            hover:bg-[#303824]/[0.035]
            disabled:cursor-wait
            disabled:opacity-60
          "
        >
          {copy.cancelExisting}
        </button>
      </div>

    </section>
  </div>
);
}


export default memo(
  DonationExistingPayment
);