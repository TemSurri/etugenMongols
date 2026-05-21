"use client";

import { useLanguage } from "../context/LanguageContext";

import Header from "../components/home/Header";
import Events from "../components/events/Events";
import Footer from "../components/home/Footer";

export default function EventsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <Events lang={lang} />
      </main>

      <Footer />
    </>
  );
}