"use client";

import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/LanguageContext";
import RegistrationsMain from "../registrations/RegistrationsMain";

export default function RegistrationsPage() {

    const {
        lang,
        setLang
    } = useLanguage();

    return (
        <>
            <Header
                lang={lang}
                setLang={setLang}
            />

            <main>
                <RegistrationsMain
                    lang={lang}
                />
            </main>
        </>
    );
}
