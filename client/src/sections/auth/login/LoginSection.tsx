"use client";

import AuthPageShell from "../components/AuthPageShell";
import { authMedia } from "../media";


import { memo,useState } from "react";




import LoginForm from "./LoginForm";


export type Language =
    | "en"
    | "mn";








function LoginSection() {

    const [language, setLanguage] =
        useState<Language>("en");


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
        <AuthPageShell language={language} setLanguage={setLanguage} background={background} backTo="/" backLabel={language === "en"
                                ? "Back to home"
                                : "Нүүр хуудас"} title={language === "en"
                                    ? "Welcome back"
                                    : "Тавтай морил"} description={language === "en"
                                    ? "Sign in to continue to your account."
                                    : "Өөрийн бүртгэлдээ нэвтэрч үргэлжлүүлнэ үү."}>
<LoginForm
                                language={language}
                            />
</AuthPageShell>
    );
}


export default memo(LoginSection);
