"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import VolunteerMain from "../components/involvement/VolunteerMain";
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