"use client";

import AuthPageShell from "../components/AuthPageShell";


import { memo,useState } from "react";




import VerifyAccountForm from "./VerifyAccountForm";


const VERIFY_BACKGROUNDS = [
    "/home/slideshow/1.webp",
    "/home/slideshow/2.webp",
    "/home/slideshow/3.webp",
    "/home/slideshow/4.webp",
    "/impact/culture/4.webp",
    "/impact/archery/3.webp",
] as const;


export type Language =
    | "en"
    | "mn";








function VerifyAccountSection() {

    const [language, setLanguage] =
        useState<Language>("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    VERIFY_BACKGROUNDS.length
                );

            return VERIFY_BACKGROUNDS[index];
        });


    return (
        <AuthPageShell language={language} setLanguage={setLanguage} background={background} backTo="/auth/login" backLabel={language === "en"
                                ? "Back to login"
                                : "Нэвтрэх хэсэг рүү"} title={language === "en"
                                    ? "Verify your account"
                                    : "Бүртгэлээ баталгаажуулах"} description={language === "en"
                                    ? "Enter the email address connected to your account and we'll send you a verification link."
                                    : "Бүртгэлтэй холбоотой имэйл хаягаа оруулна уу. Бид танд баталгаажуулах холбоос илгээнэ."}>
<VerifyAccountForm
                                language={language}
                            />
</AuthPageShell>
    );
}


export default memo(VerifyAccountSection);