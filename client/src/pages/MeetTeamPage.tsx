"use client";

import Header from "../sections/home/Header";
import Footer from "../sections/home/Footer";
import MeetTeamMain from "../sections/about/MeetTeamMain";

import { useLanguage } from "../context/LanguageContext";

export default function MeetTeamPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <MeetTeamMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}