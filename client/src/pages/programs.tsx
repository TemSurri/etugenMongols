"use client";

import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import ProgramsMain from "../sections/programs/ProgramsMain";
import { useLanguage } from "../context/LanguageContext";

export default function OurImpactPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <ProgramsMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}