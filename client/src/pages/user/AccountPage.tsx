"use client";

import Header from "../../sections/home/Header";

import AccountMain from "../../sections/users/account/AccountMain";

import { useLanguage } from "../../context/LanguageContext";

export default function AccountPage() {
    const { lang, setLang } = useLanguage();

    return (
        <>
            <Header lang={lang} setLang={setLang} />

            <main>
                <AccountMain lang={lang} />
            </main>

            
        </>
    );
}