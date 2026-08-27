"use client";

import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  AuthContext,
} from "../../../context/AuthContext";

import {
  checkoutDonation,
  verifyDonationSession,
} from "./donateApi";

import type {
  DonationCheckoutRequest,
  DonationCopy,
  Lang,
  PaymentIntentResult,
} from "./donateTypes";

import DonationAmount from "./DonationAmount";
import DonationAccountStatus from "./DonationAccountStatus";
import DonationDetails from "./DonationDetails";
import DonationSummary from "./DonationSummary";
import DonationImages from "./DonationImages";
import DonationExistingPayment from "./DonationExistingPayment";


type DonateCheckoutSectionProps = {
  lang: Lang;
};


const COPY: Record<
  Lang,
  DonationCopy
> = {

  en: {

    donationTitle:
      "Your donation",

    amountLabel:
      "Donation amount",

    amountPlaceholder:
      "Enter amount",

    amountMinimum:
      "The minimum donation amount is $1.00 CAD.",

    detailsTitle:
      "Your details",

    emailLabel:
      "Email address",

    emailPlaceholder:
      "Enter your email address",

    firstNameLabel:
      "First name",

    firstNamePlaceholder:
      "Enter your first name",

    lastNameLabel:
      "Last name",

    lastNamePlaceholder:
      "Enter your last name",

    anonymousLabel:
      "I wish to remain anonymous",

    messageTitle:
      "Message",

    messageDescription:
      "If you have something specific in mind for your donation, let us know here. You can tell us about a program, event, cultural activity, or other area you would especially like your contribution to support. You can also use this space to leave any other information you would like us to know.",

    messageLabel:
      "Anything you'd like us to know? (optional)",

    messagePlaceholder:
      "Tell us if there's something you'd especially like your donation to support, such as a particular event, program, or cultural activity. You can also leave any other information you'd like us to know.",

    summaryTitle:
      "Summary",

    donationSummary:
      "Donation",

    total:
      "Total",

    checkout:
      "Continue to payment",

    processing:
      "Preparing payment...",

    required:
      "Please complete the required information.",

    error:
      "We could not start your payment. Please try again.",

    loggedInAs:
      "Donating as",

    accountTitle:
      "Have an Etugen account?",

    accountDescription:
      "Sign in to automatically fill your information and make future donations easier.",

    login:
      "Sign in",

    createAccount:
      "Create account",


    /*
     * Existing payment
     */

    existingPaymentTitle:
      "You already have a payment in progress",

    existingPaymentDescription:
      "There is already a donation payment associated with your current session. You can continue that payment or cancel it and start again.",

    existingPaymentAmount:
      "Amount",

    existingPaymentEmail:
      "Email",

    continueExisting:
      "Continue payment",

    cancelExisting:
      "Cancel and start again",
  },


  mn: {

    donationTitle:
      "Таны хандив",

    amountLabel:
      "Хандивын хэмжээ",

    amountPlaceholder:
      "Дүн оруулна уу",

    amountMinimum:
      "Хандивын доод хэмжээ $1.00 CAD байна.",

    detailsTitle:
      "Таны мэдээлэл",

    emailLabel:
      "Имэйл хаяг",

    emailPlaceholder:
      "Имэйл хаягаа оруулна уу",

    firstNameLabel:
      "Нэр",

    firstNamePlaceholder:
      "Нэрээ оруулна уу",

    lastNameLabel:
      "Овог",

    lastNamePlaceholder:
      "Овгоо оруулна уу",

    anonymousLabel:
      "Нэрээ нууцлах",

    messageTitle:
      "Зурвас",

    messageDescription:
      "Хэрэв та хандиваа тодорхой зүйлд зориулахыг хүсэж байвал энд бичиж болно. Та дэмжихийг хүссэн хөтөлбөр, арга хэмжээ, соёлын үйл ажиллагаа эсвэл бусад чиглэлийг бидэнд хэлээрэй. Мөн бидэнд мэдэгдэхийг хүссэн бусад мэдээллээ энд үлдээж болно.",

    messageLabel:
      "Бидэнд хэлэх зүйл байна уу? (сонголттой)",

    messagePlaceholder:
      "Хандиваа тодорхой арга хэмжээ, хөтөлбөр, соёлын үйл ажиллагаа эсвэл бусад зүйлд түлхүү зориулахыг хүсэж байвал энд бичнэ үү. Мөн бидэнд мэдэгдэх бусад мэдээллээ үлдээж болно.",

    summaryTitle:
      "Дүн",

    donationSummary:
      "Хандив",

    total:
      "Нийт",

    checkout:
      "Төлбөр рүү үргэлжлүүлэх",

    processing:
      "Төлбөр бэлдэж байна...",

    required:
      "Шаардлагатай мэдээллийг бөглөнө үү.",

    error:
      "Төлбөрийг эхлүүлж чадсангүй. Дахин оролдоно уу.",

    loggedInAs:
      "Хандив өгч буй хэрэглэгч",

    accountTitle:
      "Etugen бүртгэлтэй юу?",

    accountDescription:
      "Нэвтэрснээр таны мэдээлэл автоматаар бөглөгдөж, дараагийн хандив илүү хялбар болно.",

    login:
      "Нэвтрэх",

    createAccount:
      "Бүртгүүлэх",


    /*
     * Existing payment
     */

    existingPaymentTitle:
      "Танд үргэлжилж буй төлбөр байна",

    existingPaymentDescription:
      "Таны одоогийн сесстэй холбоотой хандивын төлбөр аль хэдийн байна. Та уг төлбөрийг үргэлжлүүлэх эсвэл цуцлаад шинээр эхлэх боломжтой.",

    existingPaymentAmount:
      "Дүн",

    existingPaymentEmail:
      "Имэйл",

    continueExisting:
      "Төлбөрийг үргэлжлүүлэх",

    cancelExisting:
      "Цуцлаад дахин эхлэх",
  },
};


function DonateCheckoutSection({
  lang,
}: DonateCheckoutSectionProps) {

  const safeLang: Lang =
    lang === "mn"
      ? "mn"
      : "en";


  const copy =
    COPY[safeLang];


  const auth =
    useContext(AuthContext);


  if (!auth) {

    throw new Error(
      "DonateCheckoutSection must be used inside AuthProvider."
    );
  }


  const {
    user,
    loading: authLoading,
    isLoggedIn,
    clearAuth,
  } = auth;


  /* -------------------------------------------------------------------- */
  /* Refs                                                                 */
  /* -------------------------------------------------------------------- */

  const amountSectionRef =
    useRef<HTMLDivElement>(null);


  /* -------------------------------------------------------------------- */
  /* Form state                                                           */
  /* -------------------------------------------------------------------- */

  const [
    amount,
    setAmount,
  ] = useState("50");


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    firstName,
    setFirstName,
  ] = useState("");


  const [
    lastName,
    setLastName,
  ] = useState("");


  const [
    anonymous,
    setAnonymous,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


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


  const [
    amountError,
    setAmountError,
  ] = useState<
    string | null
  >(null);


  /*
   * Holds the payment returned by the backend when
   * there is already an INIT payment that does not
   * look like an accidental duplicate.
   *
   * When this is not null the frontend shows the
   * existing-payment confirmation UI.
   */
  const [
    existingPayment,
    setExistingPayment,
  ] = useState<
    PaymentIntentResult | null
  >(null);


  /* -------------------------------------------------------------------- */
  /* Auth autofill                                                        */
  /* -------------------------------------------------------------------- */

  useEffect(() => {

    if (!user) {

      return;
    }


    setEmail(
      user.email
    );


    setFirstName(
      user.firstName
    );


    setLastName(
      user.lastName
    );

  }, [user]);


  /* -------------------------------------------------------------------- */
  /* Amount                                                               */
  /* -------------------------------------------------------------------- */

  const numericAmount =
    useMemo(() => {

      const value =
        Number(amount);


      if (
        !Number.isFinite(value)
      ) {

        return 0;
      }


      return value;

    }, [amount]);


  const formattedAmount =
    useMemo(() => {

      return numericAmount
        .toLocaleString(
          "en-CA",
          {
            style:
              "currency",

            currency:
              "CAD",

            minimumFractionDigits:
              2,

            maximumFractionDigits:
              2,
          }
        );

    }, [numericAmount]);


  const handleAmountChange =
    useCallback(
      (value: string) => {

        setAmount(
          value
        );


        setAmountError(
          null
        );


        setError(
          null
        );

      },
      []
    );


  const handleQuickAmountSelect =
    useCallback(
      (value: number) => {

        setAmount(
          String(value)
        );


        setAmountError(
          null
        );


        setError(
          null
        );

      },
      []
    );


  /* -------------------------------------------------------------------- */
  /* Stripe payment transition                                            */
  /* -------------------------------------------------------------------- */

  /*
   * CREATED and EXISTING_DUPLICATE both end up here.
   *
   * Both states mean the backend has decided which
   * PaymentJob / Stripe PaymentIntent should be used.
   *
   * The actual Stripe Elements UI will be opened here
   * once Stripe is connected.
   */
  const continueToStripe =
    useCallback(
      (
        payment:
          PaymentIntentResult
      ) => {

        /*
         * A usable Stripe payment should always have
         * a client secret.
         *
         * CONFIRM_EXISTING should never reach here.
         */
        if (!payment.clientSecret) {

          setError(
            copy.error
          );

          return;
        }


        /*
         * Stripe Elements integration goes here next.
         *
         * Eventually this will probably set some payment
         * state and render the Stripe Elements component.
         *
         * Do not leave the client secret logged once the
         * real Stripe integration is completed.
         */
        console.log(
          "continue to stripe for job:",
          payment.jobId
        );

      },
      [
        copy.error,
      ]
    );


  /* -------------------------------------------------------------------- */
  /* Existing payment actions                                             */
  /* -------------------------------------------------------------------- */

  /*
   * User decided to continue the payment that already
   * exists.
   *
   * CONFIRM_EXISTING intentionally does not currently
   * provide a client secret.
   *
   * Later this will call a backend endpoint that:
   *
   * 1. checks ownership of the job
   * 2. retrieves the existing Stripe PaymentIntent
   * 3. returns its client secret
   */
  const handleContinueExistingPayment =
    useCallback(() => {

      if (!existingPayment) {

        return;
      }


      console.log(
        "continue existing payment:",
        existingPayment.jobId
      );


      /*
       * Continue-existing backend call goes here later.
       */

    }, [existingPayment]);


  /*
   * User decided to cancel the payment that currently
   * exists and start a new one.
   *
   * Later this will:
   *
   * 1. call backend cancel endpoint
   * 2. backend checks job ownership
   * 3. backend cancels Stripe PaymentIntent
   * 4. backend marks PaymentJob CANCELLED
   * 5. frontend submits the new donation again
   */
  const handleCancelExistingPayment =
    useCallback(() => {

      if (!existingPayment) {

        return;
      }


      console.log(
        "cancel existing payment:",
        existingPayment.jobId
      );


      /*
       * Cancel-existing backend call goes here later.
       */

    }, [existingPayment]);


  /* -------------------------------------------------------------------- */
  /* Submission                                                           */
  /* -------------------------------------------------------------------- */

  const handleSubmit =
    useCallback(
      async (
        event:
          FormEvent<HTMLFormElement>
      ) => {

        event.preventDefault();


        if (submitting) {

          return;
        }


        setError(
          null
        );


        setAmountError(
          null
        );


        const cleanEmail =
          email.trim();


        const cleanFirstName =
          firstName.trim();


        const cleanLastName =
          lastName.trim();


        const cleanMessage =
          message.trim();


        /* -------------------------------------------------------------- */
        /* Amount validation                                              */
        /* -------------------------------------------------------------- */

        if (
          !Number.isFinite(
            numericAmount
          ) ||
          numericAmount < 1
        ) {

          setAmountError(
            copy.amountMinimum
          );


          /*
           * Wait until React has rendered
           * the error before scrolling.
           */
          requestAnimationFrame(() => {

            amountSectionRef.current
              ?.scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "center",
              });
          });


          return;
        }


        /* -------------------------------------------------------------- */
        /* Required donor information                                    */
        /* -------------------------------------------------------------- */

        if (
          !cleanEmail ||
          !cleanFirstName ||
          !cleanLastName
        ) {

          setError(
            copy.required
          );


          return;
        }


        /* -------------------------------------------------------------- */
        /* Request                                                        */
        /* -------------------------------------------------------------- */

        const request:
          DonationCheckoutRequest = {

            amount:
              numericAmount,

            email:
              cleanEmail,

            firstName:
              cleanFirstName,

            lastName:
              cleanLastName,

            anonymous,
          };


        if (cleanMessage) {

          request.message =
            cleanMessage;
        }


        /*
         * If this browser remembers being authenticated,
         * verify that the server session still exists.
         *
         * This prevents an expired authenticated user
         * from silently becoming a guest during checkout.
         */
        const wasLoggedIn =
          localStorage.getItem(
            "wasLoggedIn"
          ) === "true";


        if (wasLoggedIn) {

          const sessionValid =
            await verifyDonationSession();


          if (!sessionValid) {

            alert(
              "Sorry, your session has timed out. Please log in again before continuing."
            );


            clearAuth();


            return;
          }
        }


        /* -------------------------------------------------------------- */
        /* Payment request                                                */
        /* -------------------------------------------------------------- */

        try {

          setSubmitting(
            true
          );


          /*
           * Backend either:
           *
           * CREATED
           *      creates a new payment
           *
           * EXISTING_DUPLICATE
           *      reuses the recently created payment
           *
           * CONFIRM_EXISTING
           *      tells frontend that another payment
           *      already exists and needs user input
           */
          const result =
            await checkoutDonation(
              request
            );


          /* ------------------------------------------------------------ */
          /* New payment                                                  */
          /* ------------------------------------------------------------ */

          if (
            result.result ===
              "CREATED"
          ) {

            continueToStripe(
              result
            );


            return;
          }


          /* ------------------------------------------------------------ */
          /* Accidental duplicate                                        */
          /* ------------------------------------------------------------ */

          if (
            result.result ===
              "EXISTING_DUPLICATE"
          ) {

            /*
             * Backend already determined that this is
             * effectively the same recent request.
             *
             * Reuse the existing PaymentIntent instead
             * of creating another one.
             */
            continueToStripe(
              result
            );


            return;
          }


          /* ------------------------------------------------------------ */
          /* Existing payment requires confirmation                      */
          /* ------------------------------------------------------------ */

          if (
            result.result ===
              "CONFIRM_EXISTING"
          ) {

            /*
             * Do not continue into Stripe yet.
             *
             * Store the existing payment so the modal
             * can ask whether the donor wants to
             * continue or cancel it.
             */
            setExistingPayment(
              result
            );


            return;
          }


          /*
           * Defensive fallback in case the backend
           * ever returns a result type this frontend
           * does not understand.
           */
          setError(
            copy.error
          );

        } catch (error) {

          console.error(
            "Donation checkout failed:",
            error
          );


          setError(
            copy.error
          );

        } finally {

          setSubmitting(
            false
          );
        }

      },
      [
        anonymous,
        clearAuth,
        continueToStripe,
        copy.amountMinimum,
        copy.error,
        copy.required,
        email,
        firstName,
        lastName,
        message,
        numericAmount,
        submitting,
      ]
    );


  /* -------------------------------------------------------------------- */
  /* Render                                                               */
  /* -------------------------------------------------------------------- */

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

        {/* -------------------------------------------------------------- */}
        {/* Form column                                                    */}
        {/* -------------------------------------------------------------- */}

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
                amount={amount}
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

              onEmailChange={(
                value: string
              ) => {

                setEmail(
                  value
                );


                setError(
                  null
                );
              }}

              onFirstNameChange={(
                value: string
              ) => {

                setFirstName(
                  value
                );


                setError(
                  null
                );
              }}

              onLastNameChange={(
                value: string
              ) => {

                setLastName(
                  value
                );


                setError(
                  null
                );
              }}

              onAnonymousChange={(
                value: boolean
              ) => {

                setAnonymous(
                  value
                );
              }}

              onMessageChange={(
                value: string
              ) => {

                setMessage(
                  value
                );
              }}
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


        {/* -------------------------------------------------------------- */}
        {/* Independent image column                                       */}
        {/* -------------------------------------------------------------- */}

        <DonationImages />

      </div>


      {/* ---------------------------------------------------------------- */}
      {/* Existing payment confirmation                                    */}
      {/* ---------------------------------------------------------------- */}

      {existingPayment && (

        <DonationExistingPayment
          copy={
            copy
          }
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

      )}

    </section>
  );
}


export default memo(
  DonateCheckoutSection
);