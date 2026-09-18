"use client";

import Header from "../../../components/navigation/SiteHeader";

import AccountMain from "../AccountMain";

import { useLanguage } from "../../../context/LanguageContext";

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
