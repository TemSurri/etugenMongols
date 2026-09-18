"use client";

import AuthPageShell from "../components/AuthPageShell";


import { memo,useState } from "react";




import ForgotPasswordForm from "./ForgetPasswordForm";


const PASSWORD_RESET_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp",
    "/impact/culture/4.webp",
    "/impact/archery/3.webp",
] as const;








function ForgotPasswordSection() {

    const [language, setLanguage] =
        useState<"en" | "mn">("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    PASSWORD_RESET_BACKGROUNDS.length
                );

            return PASSWORD_RESET_BACKGROUNDS[index];
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