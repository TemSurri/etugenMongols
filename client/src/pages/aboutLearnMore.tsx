"use client";

import { useLanguage } from "../context/LanguageContext";

import Header from "../components/home/Header";
import LearnMore from "../components/about/LearnMore";
import Footer from "../components/home/Footer";


export default function AboutLearnMore() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <LearnMore lang={lang} />
      </main>

      <Footer />
    </>
  );
}