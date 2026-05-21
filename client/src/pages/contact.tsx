"use client";

import { useLanguage } from "../context/LanguageContext";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Contact from "../components/contact/Contact";



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