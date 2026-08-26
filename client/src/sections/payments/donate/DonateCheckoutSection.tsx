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
} from "./donateAPI";

import type {
  DonationCheckoutRequest,
  DonationCopy,
  Lang,
} from "./donateTypes";

import DonationAmount from "./DonationAmount";
import DonationAccountStatus from "./DonationAccountStatus";
import DonationDetails from "./DonationDetails";
import DonationSummary from "./DonationSummary";
import DonationImages from "./DonationImages";

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
        setAmount(value);

        setAmountError(null);
        setError(null);
      },
      []
    );

  const handleQuickAmountSelect =
    useCallback(
      (value: number) => {
        setAmount(
          String(value)
        );

        setAmountError(null);
        setError(null);
      },
      []
    );

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

        setError(null);
        setAmountError(null);

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


        await checkoutDonation(
          request
        );

        try {
          setSubmitting(true);

          await checkoutDonation(
            request
          );

          /*
           * Stripe flow continues here
           * once the backend returns the
           * client secret.
           */

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
              user={user}
            />

            <DonationDetails
              copy={copy}
              email={email}
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
    </section>
  );
}

export default memo(
  DonateCheckoutSection
);