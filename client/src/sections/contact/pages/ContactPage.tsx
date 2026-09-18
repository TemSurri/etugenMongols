"use client";

import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/LanguageContext";
import Contact from "../Contact";



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
