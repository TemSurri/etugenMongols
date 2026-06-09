"use client";

import Header from "../components/home/Header";
import AboutUs from "../components/about/OurStory";
import Footer from "../components/home/Footer";
import AboutLayout from "../components/about/AboutLayout";

import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { lang, setLang } = useLanguage();

  return (
    <AboutLayout>
      <Header lang={lang} setLang={setLang} />

      <main>
        <AboutUs lang={lang} />
      </main>

      <Footer />
    </AboutLayout>
  );
}