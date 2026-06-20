"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import StoryMain from "../components/about/OurStoryMain";
import { useLanguage } from "../context/LanguageContext";

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