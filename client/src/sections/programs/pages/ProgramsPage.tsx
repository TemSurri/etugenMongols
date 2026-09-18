"use client";

import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/LanguageContext";
import ProgramsMain from "../ProgramsMain";

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
