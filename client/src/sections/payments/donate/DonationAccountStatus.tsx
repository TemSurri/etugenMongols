import { memo } from "react";

import { Link } from "react-router-dom";

import type {
  DonationCopy,
} from "./donateTypes";

type AccountUser = {
  email: string;
  firstName: string;
  lastName: string;
};

type DonationAccountStatusProps = {
  copy: DonationCopy;

  loading: boolean;

  isLoggedIn: boolean;

  user: AccountUser | null;
};

function DonationAccountStatus({
  copy,
  loading,
  isLoggedIn,
  user,
}: DonationAccountStatusProps) {
  if (loading) {
    return null;
  }

  if (isLoggedIn && user) {
    return (
      <section
        className="
          mt-10
          border-l-2
          border-[#d6ba72]
          bg-[#303824]/[0.035]
          px-5
          py-4
        "
      >
        <p
          className="
            text-xs
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#7d6b38]
          "
        >
          {copy.loggedInAs}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-medium
            text-[#303824]
          "
        >
          {user.firstName}{" "}
          {user.lastName}
        </p>

        <p
          className="
            mt-0.5
            text-sm
            text-[#69705c]
          "
        >
          {user.email}
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        mt-10
        border
        border-[#303824]/10
        bg-[#303824]/[0.035]
        px-5
        py-5
        sm:flex
        sm:items-center
        sm:justify-between
        sm:gap-6
      "
    >
      <div className="max-w-md">
        <p
          className="
            text-sm
            font-medium
            text-[#303824]
          "
        >
          {copy.accountTitle}
        </p>

        <p
          className="
            mt-1
            text-sm
            leading-6
            text-[#69705c]
          "
        >
          {copy.accountDescription}
        </p>
      </div>

      <div
        className="
          mt-4
          flex
          shrink-0
          items-center
          gap-4
          sm:mt-0
        "
      >
        <Link
          to="/auth/login"
          className="
            text-sm
            font-medium
            text-[#303824]
            underline
            decoration-[#d6ba72]
            underline-offset-4
            transition-colors
            duration-150
            hover:text-[#9a7b30]
          "
        >
          {copy.login}
        </Link>

        <Link
          to="/auth/signup"
          className="
            inline-flex
            items-center
            justify-center
            bg-[#303824]
            px-4
            py-2.5
            text-sm
            font-medium
            text-[#fffaf0]
            transition-colors
            duration-150
            hover:bg-[#242a1b]
          "
        >
          {copy.createAccount}
        </Link>
      </div>
    </section>
  );
}

export default memo(
  DonationAccountStatus
);