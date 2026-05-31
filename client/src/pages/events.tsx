"use client";

import { useLanguage } from "../context/LanguageContext";

import Header from "../components/home/Header";
import Events from "../components/events/Events";
import Footer from "../components/home/Footer";

export default function EventsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#27301d]">
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <Events lang={lang} />
      </main>

      <footer className="relative z-50 bg-[#27301d]">
        <Footer />
      </footer>
    </div>
  );
}