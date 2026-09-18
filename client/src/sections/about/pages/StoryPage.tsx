"use client";

import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/LanguageContext";
import StoryMain from "../OurStoryMain";

export default function OurImpactPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <StoryMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}
