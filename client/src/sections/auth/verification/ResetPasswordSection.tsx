import { resetPasswordSectionCopy } from "../content/ResetPasswordSectionCopy";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";

import { memo, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import ResetPasswordForm from "./ResetPasswordForm";

function isValidUUID(value: string | null) {
  if (!value) {
    return false;
  }

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function ResetPasswordSection() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [language, setLanguage] = useState<"en" | "mn">("en");

  const [background] = useState(() => {
    const index = Math.floor(Math.random() * authMedia.backgrounds.length);

    return authMedia.backgrounds[index];
  });

  const validTokenFormat = isValidUUID(token);

  return (
    <AuthPageShell
      language={language}
      setLanguage={setLanguage}
      background={background}
      backTo="/auth/login"
      backLabel={resetPasswordSectionCopy[language].backToLogin}
      title={
        validTokenFormat
          ? resetPasswordSectionCopy[language].createANewPassword
          : resetPasswordSectionCopy[language].invalidResetLink
      }
      description={
        validTokenFormat
          ? resetPasswordSectionCopy[language].chooseANewPasswordForYourAccount
          : resetPasswordSectionCopy[language]
              .thisPasswordResetLinkIsInvalidRequest
      }
    >
      {validTokenFormat && token ? (
        <ResetPasswordForm language={language} token={token} />
      ) : (
        <Link
          to="/auth/forgot-password"
          className="
                                        flex
                                        min-h-11
                                        w-full
                                        items-center
                                        justify-center

                                        bg-[#27301d]

                                        px-6
                                        py-3

                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white

                                        no-underline
                                        transition-colors

                                        hover:bg-[#9a7b26]
                                    "
        >
          {resetPasswordSectionCopy[language].requestNewResetLink}
        </Link>
      )}
    </AuthPageShell>
  );
}

export default memo(ResetPasswordSection);
