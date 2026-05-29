"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import DonateMain from "../components/involvement/Donate";
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