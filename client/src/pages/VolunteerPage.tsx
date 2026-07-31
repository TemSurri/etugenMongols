"use client";

import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import VolunteerMain from "../sections/involvement/VolunteerMain";
import { useLanguage } from "../context/LanguageContext";

export default function VolunteerPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <VolunteerMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}