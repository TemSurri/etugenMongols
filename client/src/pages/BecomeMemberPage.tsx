"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import BecomeMemberMain from "../components/involvement/BecomeMemberMain";
import { useLanguage } from "../context/LanguageContext";

export default function BecomeMemberPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <BecomeMemberMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}