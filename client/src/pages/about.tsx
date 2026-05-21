"use client";



import Header from "../components/home/Header";
import AboutUs from "../components/about/aboutUs";
import Footer from "../components/home/Footer";

import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <AboutUs lang={lang} />
      </main>

      <Footer />
    </>
  );
}
