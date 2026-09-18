"use client";

import AuthPageShell from "../components/AuthPageShell";


import { memo,useState } from "react";




import LoginForm from "./LoginForm";


const LOGIN_BACKGROUNDS = [
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








function LoginSection() {

    const [language, setLanguage] =
        useState<Language>("en");


    const [background] =
        useState(() => {

            const index =
                Math.floor(
                    Math.random() *
                    LOGIN_BACKGROUNDS.length
                );

            return LOGIN_BACKGROUNDS[index];
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