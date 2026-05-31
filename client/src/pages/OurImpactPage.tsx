"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import OurImpactMain from "../components/about/OurImpactMain";
import { useLanguage } from "../context/LanguageContext";

export default function OurImpactPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#27301d]">
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <OurImpactMain lang={lang} />
      </main>

      <footer className="relative z-50 bg-[#27301d]">
        <Footer />
      </footer>
    </div>
  );
}