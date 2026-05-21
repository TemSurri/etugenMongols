"use client";

import Header from "../components/home/Header";
import AboutEvents from "../components/about/AboutEvents";
import Footer from "../components/home/Footer";

import { useLanguage } from "../context/LanguageContext";

export default function AboutEventsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <AboutEvents lang={lang} />
      </main>

      <Footer />
    </>
  );
}