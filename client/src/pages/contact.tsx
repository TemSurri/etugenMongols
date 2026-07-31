"use client";

import { useLanguage } from "../context/LanguageContext";
import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import Contact from "../sections/contact/Contact";



export default function ContactPage() {
    const { lang, setLang } = useLanguage();
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <Contact lang={lang} />
      <Footer />
    </>
  );
}