"use client";

import { useLanguage } from "../context/LanguageContext";

import Header from "../sections/home/Header";
import Hero from "../sections/home/Hero";

import Footer from "../sections/home/Footer";


export default function Home() {

  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />
      </main>

      <Footer/>
    </>
  );
}