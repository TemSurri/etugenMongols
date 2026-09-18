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
} from "./types/donationTypes";

import {
DONATION_COPY,
} from "./copy/donationCopy";

import {
stripePromise,
} from "../stripe";

import {
useDonationCheckout,
} from "./hooks/useDonationCheckout";

import DonationAmount from "./components/DonationAmount";

import DonationAccountStatus from "./components/DonationAccountStatus";

import DonationDetails from "./components/DonationDetails";

import DonationSummary from "./components/DonationSummary";

import DonationImages from "./components/DonationImages";

import DonationExistingPayment from "./components/DonationExistingPayment";

import DonationPayment from "./components/DonationPayment";


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


  const {
    activePayment,
    amount,
    amountError,
    amountSectionRef,
    anonymous,
    authLoading,
    confirmEmail,
    email,
    error,
    existingPayment,
    firstName,
    formattedAmount,
    handleAmountChange,
    handleCancelActivePayment,
    handleCancelExistingPayment,
    handleContinueExistingPayment,
    handleQuickAmountSelect,
    handleSubmit,
    isLoggedIn,
    lastName,
    message,
    numericAmount,
    setAnonymous,
    setConfirmEmail,
    setEmail,
    setFirstName,
    setLastName,
    setMessage,
    submitting,
    user,
  } =
    useDonationCheckout(copy);


  const modalOpen =
    Boolean(
      activePayment ||
      existingPayment ||
      submitting
    );


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


  const paymentPortal =
    typeof document !== "undefined"
      ? createPortal(
          <>

            {
              submitting &&
              !activePayment &&
              !existingPayment &&
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


            {
              existingPayment &&
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
                      existingPayment
                    }

                    loading={
                      submitting
                    }

                    onContinue={
                      handleContinueExistingPayment
                    }

                    onCancel={
                      handleCancelExistingPayment
                    }
                  />

                </div>

              )
            }


            {
              activePayment
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
                          activePayment
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
                          activePayment
                            .action
                        }

                        amount={
                          activePayment
                            .amount
                        }

                        currency={
                          activePayment
                            .currency
                        }

                        copy={copy}

                        onCancel={
                          handleCancelActivePayment
                        }

                        onComplete={() => {

                          if (
                            activePayment
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
                handleSubmit
              }

              noValidate

              className="
                mx-auto
                w-full
                max-w-[700px]
              "
            >

              <div
                ref={
                  amountSectionRef
                }
              >

                <DonationAmount
                  copy={copy}

                  amount={
                    amount
                  }

                  numericAmount={
                    numericAmount
                  }

                  error={
                    amountError
                  }

                  onAmountChange={
                    handleAmountChange
                  }

                  onQuickAmountSelect={
                    handleQuickAmountSelect
                  }
                />

              </div>


              <DonationAccountStatus
                copy={copy}

                loading={
                  authLoading
                }

                isLoggedIn={
                  isLoggedIn
                }

                user={
                  user
                }
              />


              <DonationDetails
                copy={copy}

                email={
                  email
                }

                confirmEmail={
                  confirmEmail
                }

                firstName={
                  firstName
                }

                lastName={
                  lastName
                }

                anonymous={
                  anonymous
                }

                message={
                  message
                }

                isLoggedIn={
                  isLoggedIn
                }

                onEmailChange={
                  setEmail
                }

                onConfirmEmailChange={
                  setConfirmEmail
                }

                onFirstNameChange={
                  setFirstName
                }

                onLastNameChange={
                  setLastName
                }

                onAnonymousChange={
                  setAnonymous
                }

                onMessageChange={
                  setMessage
                }
              />


              <DonationSummary
                copy={copy}

                formattedAmount={
                  formattedAmount
                }

                submitting={
                  submitting
                }

                authLoading={
                  authLoading
                }

                error={
                  error
                }
              />

            </form>

          </div>


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
