"use client";

import Header from "../../sections/home/Header";
import RegistrationsMain from "../../sections/users/registrations/RegistrationsMain";
import { useLanguage } from "../../context/LanguageContext";

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