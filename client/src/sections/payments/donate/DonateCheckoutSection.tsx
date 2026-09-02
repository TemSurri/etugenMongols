import {
  memo,
  useEffect,
} from "react";

import {
  createPortal,
} from "react-dom";

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
    DONATION_COPY[safeLang];


  const checkout =
    useDonationCheckout(copy);


  const modalOpen =
    Boolean(
      checkout.activePayment ||
      checkout.existingPayment ||
      checkout.submitting
    );


  /*
   * Lock the underlying page while any
   * payment-related modal is open.
   */
  useEffect(() => {

    if (!modalOpen) {
      return;
    }


    const previousOverflow =
      document.body.style.overflow;


    document.body.style.overflow =
      "hidden";


    return () => {

      document.body.style.overflow =
        previousOverflow;
    };

  }, [modalOpen]);


  /*
   * Render payment UI directly under <body>.
   *
   * This avoids stacking-context problems from
   * headers, transforms, positioned containers,
   * z-indexes, etc.
   */
  const paymentPortal =
    typeof document !== "undefined"
      ? createPortal(
          <>

            {/* ---------------------------------- */}
            {/* Preparing payment                  */}
            {/* ---------------------------------- */}

            {
              checkout.submitting &&
              !checkout.activePayment &&
              !checkout.existingPayment &&
              (

                <div
                  className="
                    fixed
                    inset-0
                    z-[9999]
                    overflow-y-auto
                    bg-black/50
                    px-4
                    pb-8
                    pt-24
                    backdrop-blur-[2px]
                    sm:px-6
                    sm:pb-10
                    sm:pt-28
                  "
                >

                  <div
                    className="
                      flex
                      min-h-full
                      items-start
                      justify-center
                    "
                  >

                    <div
                      className="
                        w-full
                        max-w-sm
                        bg-white
                        px-8
                        py-10
                        text-center
                        text-[#303824]
                        shadow-2xl
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
                          mt-5
                          text-sm
                          font-medium
                          text-[#59604d]
                        "
                      >
                        {copy.processing}
                      </p>

                    </div>

                  </div>

                </div>

              )
            }


            {/* ---------------------------------- */}
            {/* Existing payment                   */}
            {/* ---------------------------------- */}

            {
              checkout.existingPayment &&
              (

                <div
                  className="
                    fixed
                    inset-0
                    z-[9999]
                  "
                >

                  <DonationExistingPayment
                    copy={copy}

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

                </div>

              )
            }


            {/* ---------------------------------- */}
            {/* Active Stripe payment              */}
            {/* ---------------------------------- */}

            {
              checkout.activePayment
                ?.clientSecret &&
              (

                <div
                  className="
                    fixed
                    inset-0
                    z-[9999]
                    overflow-y-auto
                    bg-black/50
                    px-4
                    pb-8
                    pt-24
                    backdrop-blur-[2px]
                    sm:px-6
                    sm:pb-12
                    sm:pt-28
                  "
                >

                  {/*
                   * This is deliberately top-aligned.
                   *
                   * When Stripe expands its fields,
                   * the payment card grows downward
                   * instead of re-centering upward
                   * underneath the site header.
                   */}

                  <div
                    className="
                      flex
                      min-h-full
                      items-start
                      justify-center
                    "
                  >

                    <Elements
                      stripe={
                        stripePromise
                      }

                      options={{
                        clientSecret:
                          checkout
                            .activePayment
                            .clientSecret ??
                          undefined,

                        appearance: {

                          theme:
                            "stripe",

                          variables: {

                            colorPrimary:
                              "#303824",

                            colorBackground:
                              "#ffffff",

                            colorText:
                              "#303824",

                            colorDanger:
                              "#b91c1c",

                            borderRadius:
                              "0px",
                          },
                        },
                      }}
                    >

                      <DonationPayment
                        action={
                          checkout
                            .activePayment
                            .action
                        }

                        amount={
                          checkout
                            .activePayment
                            .amount
                        }

                        currency={
                          checkout
                            .activePayment
                            .currency
                        }

                        copy={copy}

                        onCancel={
                          checkout
                            .handleCancelActivePayment
                        }

                        onComplete={() => {

                          /*
                           * Browser-side UX only.
                           *
                           * Stripe webhook + payment worker
                           * remain the source of truth for
                           * backend fulfillment.
                           */

                          if (
                            checkout
                              .activePayment
                              ?.action ===
                            "EVENT_REGISTRATION"
                          ) {

                            window.location.assign(
                              "/events"
                            );

                            return;
                          }


                          window.location.assign(
                            "/"
                          );
                        }}
                      />

                    </Elements>

                  </div>

                </div>

              )
            }

          </>,

          document.body
        )
      : null;


  return (
    <>

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

          {/* ---------------------------------- */}
          {/* Donation form                     */}
          {/* ---------------------------------- */}

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
                  copy={copy}

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
                copy={copy}

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
                copy={copy}

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
                  checkout.setEmail
                }

                onFirstNameChange={
                  checkout.setFirstName
                }

                onLastNameChange={
                  checkout.setLastName
                }

                onAnonymousChange={
                  checkout.setAnonymous
                }

                onMessageChange={
                  checkout.setMessage
                }
              />


              <DonationSummary
                copy={copy}

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


          {/* ---------------------------------- */}
          {/* Images                            */}
          {/* ---------------------------------- */}

          <DonationImages />

        </div>

      </section>


      {paymentPortal}

    </>
  );
}


export default memo(
  DonateCheckoutSection
);