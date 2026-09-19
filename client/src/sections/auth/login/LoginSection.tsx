import type { Lang } from "../../../context/language";
import { loginSectionCopy } from "../content/LoginSectionCopy";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";

import { memo, useState } from "react";

import LoginForm from "./LoginForm";

export type { Lang as Language } from "../../../context/language";
type Language = Lang;

function LoginSection() {
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
      backTo="/"
      backLabel={loginSectionCopy[language].backToHome}
      title={loginSectionCopy[language].welcomeBack}
      description={loginSectionCopy[language].signInToContinueToYourAccount}
    >
      <LoginForm language={language} />
    </AuthPageShell>
  );
}

export default memo(LoginSection);
