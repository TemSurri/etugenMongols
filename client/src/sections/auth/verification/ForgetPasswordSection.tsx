"use client";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";


import { memo,useState } from "react";




import ForgotPasswordForm from "./ForgetPasswordForm";








function ForgotPasswordSection() {

    const [language, setLanguage] =
        useState<"en" | "mn">("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    authMedia.backgrounds.length
                );

            return authMedia.backgrounds[index];
        });


    return (
        <AuthPageShell language={language} setLanguage={setLanguage} background={background} backTo="/auth/login" backLabel={language === "en"
                                ? "Back to login"
                                : "Нэвтрэх хэсэг рүү"} title={language === "en"
                                    ? "Reset your password"
                                    : "Нууц үгээ шинэчлэх"} description={language === "en"
                                    ? "Enter your email address and we'll send you a secure link to reset your password."
                                    : "Имэйл хаягаа оруулна уу. Бид танд нууц үгээ шинэчлэх аюулгүй холбоос илгээнэ."}>
<ForgotPasswordForm
                                language={language}
                            />
</AuthPageShell>
    );
}


export default memo(ForgotPasswordSection);
