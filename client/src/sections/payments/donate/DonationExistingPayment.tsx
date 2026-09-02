import {
  memo,
} from "react";

import type {
  DonationCopy,
  ResumePaymentResponse,
} from "./donateTypes";


type DonationExistingPaymentProps = {

  copy:
    DonationCopy;

  payment:
    ResumePaymentResponse;

  onContinue:
    () => void;

  onCancel:
    () => void;

  loading:
    boolean;
};


function DonationExistingPayment({
  copy,
  payment,
  onContinue,
  onCancel,
  loading,
}: DonationExistingPaymentProps) {

  const formattedAmount =
    (
      payment.amount /
      100
    ).toLocaleString(
      "en-CA",
      {
        style:
          "currency",

        currency:
          payment.currency.toUpperCase(),
      }
    );


  const isEventRegistration =
    payment.action ===
    "EVENT_REGISTRATION";


  const payer =
    isEventRegistration &&
    payment.actionPayload.payer &&
    typeof payment.actionPayload.payer ===
      "object"
      ? payment.actionPayload.payer as {
          firstName?: unknown;
          lastName?: unknown;
        }
      : null;


  const firstName =
    typeof payer?.firstName === "string"
      ? payer.firstName
      : "";


  const lastName =
    typeof payer?.lastName === "string"
      ? payer.lastName
      : "";


  const payerName =
    `${firstName} ${lastName}`
      .trim();


  const attendeeCount =
    typeof payment
      .actionPayload
      .attendeeCount === "number"
      ? payment
          .actionPayload
          .attendeeCount
      : null;


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

        className={`
          w-full
          max-w-md
          bg-[#fffaf0]
          p-7
          text-[#303824]
          shadow-2xl
          transition-all
          duration-300
          sm:p-8

          ${
            loading
              ? "scale-[0.995] opacity-90"
              : "scale-100 opacity-100"
          }
        `}
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


        <p
          className="
            mt-3
            text-sm
            leading-6
            text-[#69705c]
          "
        >
          {
            isEventRegistration
              ? copy.existingEventDescription
              : copy.existingDonationDescription
          }
        </p>


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

            <span
              className="
                text-[#69705c]
              "
            >
              {copy.existingPaymentType}
            </span>

            <span
              className="
                font-medium
              "
            >
              {
                isEventRegistration
                  ? copy.eventRegistration
                  : copy.donation
              }
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

            <span
              className="
                text-[#69705c]
              "
            >
              {copy.existingPaymentAmount}
            </span>

            <span
              className="
                font-medium
              "
            >
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

            <span
              className="
                text-[#69705c]
              "
            >
              {copy.existingPaymentEmail}
            </span>

            <span
              className="
                min-w-0
                truncate
                font-medium
              "
            >
              {payment.email}
            </span>

          </div>


          {
            isEventRegistration &&
            payerName &&
            (

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

                <span
                  className="
                    text-[#69705c]
                  "
                >
                  {copy.existingPaymentRegistrant}
                </span>

                <span
                  className="
                    font-medium
                  "
                >
                  {payerName}
                </span>

              </div>

            )
          }


          {
            isEventRegistration &&
            attendeeCount !== null &&
            (

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

                <span
                  className="
                    text-[#69705c]
                  "
                >
                  {copy.existingPaymentAttendees}
                </span>

                <span
                  className="
                    font-medium
                  "
                >
                  {attendeeCount}
                </span>

              </div>

            )
          }

        </div>


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

            disabled={
              loading
            }

            onClick={
              onContinue
            }

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

            disabled={
              loading
            }

            onClick={
              onCancel
            }

            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-2
              border
              border-[#303824]/20
              px-5
              py-3.5
              text-sm
              font-medium
              text-[#303824]
              transition-all
              duration-200
              hover:border-[#303824]/45
              hover:bg-[#303824]/[0.035]
              disabled:cursor-wait
              disabled:opacity-70
            "
          >
            {
              loading
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
                : copy.cancelExisting
            }
          </button>

        </div>

      </section>

    </div>
  );
}


export default memo(
  DonationExistingPayment
);