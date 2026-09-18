import type { DonationCopy } from "../types/donationTypes";
export function DonationInvalidPanel({copy, isDonation, onComplete}: {copy: DonationCopy; isDonation: boolean; onComplete: () => void}) { return (
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
    ); }

export function DonationSuccessPanel({copy, isDonation, onComplete, formattedAmount, successTitle, successDescription}: {copy: DonationCopy; isDonation: boolean; onComplete: () => void; formattedAmount: string; successTitle: string; successDescription: string}) { return (
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
    ); }

export function DonationProcessingPanel({copy, isDonation, onComplete, formattedAmount}: {copy: DonationCopy; isDonation: boolean; onComplete: () => void; formattedAmount: string}) { return (
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
    ); }
