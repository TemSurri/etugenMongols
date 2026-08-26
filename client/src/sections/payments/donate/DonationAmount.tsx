import { memo } from "react";

import type {
  DonationCopy,
} from "./donateTypes";

type DonationAmountProps = {
  copy: DonationCopy;

  amount: string;

  numericAmount: number;

  error: string | null;

  onAmountChange: (
    value: string
  ) => void;

  onQuickAmountSelect: (
    value: number
  ) => void;
};

const QUICK_AMOUNTS = [
  25,
  50,
  100,
  250,
] as const;

function DonationAmount({
  copy,
  amount,
  numericAmount,
  error,
  onAmountChange,
  onQuickAmountSelect,
}: DonationAmountProps) {
  return (
    <section>
      <h1
        className="
          text-3xl
          font-normal
          leading-[1.08]
          tracking-tight
          sm:text-4xl
          md:text-5xl
        "
      >
        {copy.donationTitle}
      </h1>

      <label
        htmlFor="donation-amount"
        className="
          mt-8
          block
          text-sm
          font-medium
        "
      >
        {copy.amountLabel}
      </label>

      <div
        className={`
          mt-2
          flex
          overflow-hidden
          border
          bg-white
          transition-colors
          duration-150

          ${
            error
              ? "border-red-700/60"
              : "border-[#303824]/20 focus-within:border-[#303824]/55"
          }
        `}
      >
        <div
          className="
            flex
            items-center
            border-r
            border-[#303824]/15
            px-4
            text-sm
            text-[#59604d]
          "
        >
          $
        </div>

        <input
          id="donation-amount"
          type="number"
          inputMode="decimal"
          step="0.01"
          value={amount}
          onChange={(event) =>
            onAmountChange(
              event.target.value
            )
          }
          placeholder={
            copy.amountPlaceholder
          }
          aria-invalid={
            error
              ? "true"
              : "false"
          }
          aria-describedby={
            error
              ? "donation-amount-error"
              : undefined
          }
          className="
            min-w-0
            flex-1
            bg-transparent
            px-4
            py-3.5
            text-sm
            text-[#303824]
            outline-none
            placeholder:text-[#8b907f]
          "
        />

        <div
          className="
            flex
            items-center
            px-4
            text-xs
            font-medium
            text-[#8b907f]
          "
        >
          CAD
        </div>
      </div>

      {error && (
        <p
          id="donation-amount-error"
          role="alert"
          className="
            mt-2
            text-sm
            font-medium
            text-red-700
          "
        >
          {error}
        </p>
      )}

      <div
        className="
          mt-3
          grid
          grid-cols-2
          gap-2
          sm:grid-cols-4
        "
      >
        {QUICK_AMOUNTS.map(
          (value) => {
            const selected =
              numericAmount === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onQuickAmountSelect(
                    value
                  )
                }
                className={`
                  min-h-11
                  border
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-150

                  ${
                    selected
                      ? "border-[#303824] bg-[#303824] text-[#fffaf0]"
                      : "border-[#303824]/20 bg-transparent text-[#303824] hover:border-[#303824]/45 hover:bg-[#303824]/[0.025]"
                  }
                `}
              >
                ${value}
              </button>
            );
          }
        )}
      </div>
    </section>
  );
}

export default memo(
  DonationAmount
);