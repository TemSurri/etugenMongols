import { forgetPasswordSectionCopy } from "../content/ForgetPasswordSectionCopy";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";

import { memo, useState } from "react";

import ForgotPasswordForm from "./ForgetPasswordForm";

function ForgotPasswordSection() {
  const [language, setLanguage] = useState<"en" | "mn">("en");

  const [background] = useState(() => {
    const index = Math.floor(Math.random() * authMedia.backgrounds.length);

    return authMedia.backgrounds[index];
  });

  return (
    <AuthPageShell
      language={language}
      setLanguage={setLanguage}
      background={background}
      backTo="/auth/login"
      backLabel={forgetPasswordSectionCopy[language].backToLogin}
      title={forgetPasswordSectionCopy[language].resetYourPassword}
      description={
        forgetPasswordSectionCopy[language].enterYourEmailAddressAndWeLl
      }
    >
      <ForgotPasswordForm language={language} />
    </AuthPageShell>
  );
}

export default memo(ForgotPasswordSection);
