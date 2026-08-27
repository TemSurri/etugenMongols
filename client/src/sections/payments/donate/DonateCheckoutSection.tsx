import {
  memo,
} from "react";

import {
  Elements,
} from "@stripe/react-stripe-js";

import type {
  Lang,
} from "./donateTypes";

import {
  DONATION_COPY,
} from "./donateCopy";

import {
  stripePromise,
} from "./stripe";

import {
  useDonationCheckout,
} from "./UseDonationCheckout";

import DonationAmount
  from "./DonationAmount";

import DonationAccountStatus
  from "./DonationAccountStatus";

import DonationDetails
  from "./DonationDetails";

import DonationSummary
  from "./DonationSummary";

import DonationImages
  from "./DonationImages";

import DonationExistingPayment
  from "./DonationExistingPayment";

import DonationPayment
  from "./DonationPayment";


type DonateCheckoutSectionProps = {

  lang: Lang;
};


function DonateCheckoutSection({
  lang,
}: DonateCheckoutSectionProps) {

  const safeLang: Lang =
    lang === "mn"
      ? "mn"
      : "en";


  const copy =
    DONATION_COPY[
      safeLang
    ];


  const checkout =
    useDonationCheckout(
      copy
    );


  /*
   * Once the backend has returned a usable
   * Stripe client secret, replace the donation
   * information form with Stripe Elements.
   */
  if (
    checkout.activePayment
      ?.clientSecret
  ) {

    const payment =
      checkout.activePayment;


    return (
      <section
        className="
          min-h-screen
          bg-[#fffaf0]
          text-[#303824]
        "
      >

        <div
          className="
            grid
            min-h-screen
            items-start
            lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]
          "
        >

          <div
            className="
              min-w-0
              px-6
              pb-20
              pt-32
              sm:px-8
              sm:pt-36
              md:px-10
              lg:px-14
              lg:pb-24
              lg:pt-40
              xl:px-20
            "
          >

            <Elements
              stripe={
                stripePromise
              }
              options={{
                clientSecret:
                  payment.clientSecret ?? undefined,
              }}
            >

              <DonationPayment
                amount={
                  payment.amount
                }
                currency={
                  payment.currency
                }
                onBack={
                  checkout.returnFromStripe
                }
              />

            </Elements>

          </div>


          <DonationImages />

        </div>

      </section>
    );
  }


  /*
   * Initial donation information form.
   */
  return (
    <section
      className="
        min-h-screen
        bg-[#fffaf0]
        text-[#303824]
      "
    >

      <div
        className="
          grid
          min-h-screen
          items-start
          lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]
        "
      >

        {/* Form column */}

        <div
          className="
            min-w-0
            px-6
            pb-20
            pt-32
            sm:px-8
            sm:pt-36
            md:px-10
            lg:px-14
            lg:pb-24
            lg:pt-40
            xl:px-20
          "
        >

          <form
            onSubmit={
              checkout.handleSubmit
            }
            className="
              mx-auto
              w-full
              max-w-[700px]
            "
          >

            <div
              ref={
                checkout.amountSectionRef
              }
            >

              <DonationAmount
                copy={
                  copy
                }
                amount={
                  checkout.amount
                }
                numericAmount={
                  checkout.numericAmount
                }
                error={
                  checkout.amountError
                }
                onAmountChange={
                  checkout.handleAmountChange
                }
                onQuickAmountSelect={
                  checkout.handleQuickAmountSelect
                }
              />

            </div>


            <DonationAccountStatus
              copy={
                copy
              }
              loading={
                checkout.authLoading
              }
              isLoggedIn={
                checkout.isLoggedIn
              }
              user={
                checkout.user
              }
            />


            <DonationDetails
              copy={
                copy
              }
              email={
                checkout.email
              }
              firstName={
                checkout.firstName
              }
              lastName={
                checkout.lastName
              }
              anonymous={
                checkout.anonymous
              }
              message={
                checkout.message
              }

              onEmailChange={
                (
                  value: string
                ) => {

                  checkout.setEmail(
                    value
                  );
                }
              }

              onFirstNameChange={
                (
                  value: string
                ) => {

                  checkout.setFirstName(
                    value
                  );
                }
              }

              onLastNameChange={
                (
                  value: string
                ) => {

                  checkout.setLastName(
                    value
                  );
                }
              }

              onAnonymousChange={
                (
                  value: boolean
                ) => {

                  checkout.setAnonymous(
                    value
                  );
                }
              }

              onMessageChange={
                (
                  value: string
                ) => {

                  checkout.setMessage(
                    value
                  );
                }
              }
            />


            <DonationSummary
              copy={
                copy
              }
              formattedAmount={
                checkout.formattedAmount
              }
              submitting={
                checkout.submitting
              }
              authLoading={
                checkout.authLoading
              }
              error={
                checkout.error
              }
            />

          </form>

        </div>


        {/* Image column */}

        <DonationImages />

      </div>


      {/* Existing payment modal */}

      {
        checkout.existingPayment &&
        (

          <DonationExistingPayment
            copy={
              copy
            }
            payment={
              checkout.existingPayment
            }
            loading={
              checkout.submitting
            }
            onContinue={
              checkout
                .handleContinueExistingPayment
            }
            onCancel={
              checkout
                .handleCancelExistingPayment
            }
          />

        )
      }

    </section>
  );
}


export default memo(
  DonateCheckoutSection
);