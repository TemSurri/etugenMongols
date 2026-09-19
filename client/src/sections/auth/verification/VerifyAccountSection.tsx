import type { Lang } from "../../../context/language";
import { verifyAccountSectionCopy } from "../content/VerifyAccountSectionCopy";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";

import { memo, useState } from "react";

import VerifyAccountForm from "./VerifyAccountForm";

export type { Lang as Language } from "../../../context/language";
type Language = Lang;

function VerifyAccountSection() {
  const [language, setLanguage] = useState<Language>("en");

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
      backLabel={verifyAccountSectionCopy[language].backToLogin}
      title={verifyAccountSectionCopy[language].verifyYourAccount}
      description={
        verifyAccountSectionCopy[language].enterTheEmailAddressConnectedToYour
      }
    >
      <VerifyAccountForm language={language} />
    </AuthPageShell>
  );
}

export default memo(VerifyAccountSection);
