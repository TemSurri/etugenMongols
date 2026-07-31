"use client";

import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import DonateMain from "../sections/involvement/Donate";
import { useLanguage } from "../context/LanguageContext";

export default function DonatePage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <DonateMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}