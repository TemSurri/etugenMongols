import { memo } from "react";

import type {
  DonationCopy,
} from "./donateTypes";

type DonationDetailsProps = {
  copy: DonationCopy;

  email: string;
  firstName: string;
  lastName: string;
  anonymous: boolean;
  message: string;

  onEmailChange: (
    value: string
  ) => void;

  onFirstNameChange: (
    value: string
  ) => void;

  onLastNameChange: (
    value: string
  ) => void;

  onAnonymousChange: (
    value: boolean
  ) => void;

  onMessageChange: (
    value: string
  ) => void;
};

function DonationDetails({
  copy,
  email,
  firstName,
  lastName,
  anonymous,
  message,
  onEmailChange,
  onFirstNameChange,
  onLastNameChange,
  onAnonymousChange,
  onMessageChange,
}: DonationDetailsProps) {
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
        {copy.detailsTitle}
      </h2>

      {/* Email */}

      <div className="mt-6">
        <label
          htmlFor="donation-email"
          className="
            block
            text-sm
            font-medium
          "
        >
          {copy.emailLabel}
        </label>

        <input
          id="donation-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) =>
            onEmailChange(
              event.target.value
            )
          }
          placeholder={
            copy.emailPlaceholder
          }
          className="
            mt-2
            w-full
            border
            border-[#303824]/20
            bg-white
            px-4
            py-3.5
            text-sm
            text-[#303824]
            outline-none
            transition-colors
            duration-150
            placeholder:text-[#8b907f]
            focus:border-[#303824]/55
          "
        />
      </div>

      {/* Name */}

      <div
        className="
          mt-5
          grid
          gap-5
          sm:grid-cols-2
        "
      >
        <div>
          <label
            htmlFor="donation-first-name"
            className="
              block
              text-sm
              font-medium
            "
          >
            {copy.firstNameLabel}
          </label>

          <input
            id="donation-first-name"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(event) =>
              onFirstNameChange(
                event.target.value
              )
            }
            placeholder={
              copy.firstNamePlaceholder
            }
            className="
              mt-2
              w-full
              border
              border-[#303824]/20
              bg-white
              px-4
              py-3.5
              text-sm
              text-[#303824]
              outline-none
              transition-colors
              duration-150
              placeholder:text-[#8b907f]
              focus:border-[#303824]/55
            "
          />
        </div>

        <div>
          <label
            htmlFor="donation-last-name"
            className="
              block
              text-sm
              font-medium
            "
          >
            {copy.lastNameLabel}
          </label>

          <input
            id="donation-last-name"
            type="text"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(event) =>
              onLastNameChange(
                event.target.value
              )
            }
            placeholder={
              copy.lastNamePlaceholder
            }
            className="
              mt-2
              w-full
              border
              border-[#303824]/20
              bg-white
              px-4
              py-3.5
              text-sm
              text-[#303824]
              outline-none
              transition-colors
              duration-150
              placeholder:text-[#8b907f]
              focus:border-[#303824]/55
            "
          />
        </div>
      </div>

      {/* Anonymous */}

      <label
        className="
          mt-5
          flex
          cursor-pointer
          items-start
          gap-3
          text-sm
          text-[#59604d]
        "
      >
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(event) =>
            onAnonymousChange(
              event.target.checked
            )
          }
          className="
            mt-0.5
            h-4
            w-4
            accent-[#303824]
          "
        />

        <span>
          {copy.anonymousLabel}
        </span>
      </label>

      {/* Optional message */}

      <div className="mt-7">
        <label
          htmlFor="donation-message"
          className="
            block
            text-sm
            font-medium
          "
        >
          {copy.messageLabel}
        </label>

        <textarea
          id="donation-message"
          value={message}
          onChange={(event) =>
            onMessageChange(
              event.target.value
            )
          }
          placeholder={
            copy.messagePlaceholder
          }
          rows={5}
          maxLength={500}
          className="
            mt-2
            min-h-[140px]
            w-full
            resize-none
            border
            border-[#303824]/20
            bg-white
            px-4
            py-3.5
            text-sm
            leading-7
            text-[#303824]
            outline-none
            transition-colors
            duration-150
            placeholder:text-[#8b907f]
            focus:border-[#303824]/55
          "
        />

        <div
          className="
            mt-2
            flex
            justify-end
          "
        >
          <span
            className="
              text-xs
              text-[#8b907f]
            "
          >
            {message.length}/500
          </span>
        </div>
      </div>
    </section>
  );
}

export default memo(
  DonationDetails
);