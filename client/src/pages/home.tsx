"use client";

import { useLanguage } from "../context/LanguageContext";

import Header from "../components/home/Header";
import Hero from "../components/home/Hero";

import Footer from "../components/home/Footer";


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