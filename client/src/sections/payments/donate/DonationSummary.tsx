import { memo } from "react";

import type {
  DonationCopy,
} from "./donateTypes";

type DonationSummaryProps = {
  copy: DonationCopy;

  formattedAmount: string;

  submitting: boolean;

  authLoading: boolean;

  error: string | null;
};

function DonationSummary({
  copy,
  formattedAmount,
  submitting,
  authLoading,
  error,
}: DonationSummaryProps) {
  return (
    <section
      className="
        mt-12
        border-t
        border-[#303824]/15
        pt-8
      "
    >
      <h2
        className="
          text-xl
          font-normal
        "
      >
        {copy.summaryTitle}
      </h2>

      <div className="mt-6">
        <div
          className="
            flex
            items-center
            justify-between
            gap-6
            text-sm
            text-[#59604d]
          "
        >
          <span>
            {copy.donationSummary}
          </span>

          <span>
            {formattedAmount}
          </span>
        </div>

        <div
          className="
            mt-5
            border-t
            border-[#303824]/15
            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-6
            "
          >
            <span className="font-medium">
              {copy.total}
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
      </div>

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
          submitting ||
          authLoading
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
          ease-out
          hover:-translate-y-px
          hover:bg-[#242a1b]
          disabled:cursor-wait
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >
        {submitting
          ? copy.processing
          : copy.checkout}
      </button>

      <p
        className="
          mt-4
          text-center
          text-xs
          text-[#7a806e]
        "
      >
        CAD
      </p>
    </section>
  );
}

export default memo(
  DonationSummary
);