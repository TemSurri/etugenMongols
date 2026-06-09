"use client";

import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import MeetTeamMain from "../components/about/MeetTeamMain";
import AboutLayout from "../components/about/AboutLayout";
import { useLanguage } from "../context/LanguageContext";

export default function MeetTeamPage() {
  const { lang, setLang } = useLanguage();

  return (
    <AboutLayout>
      <Header lang={lang} setLang={setLang} />

      <main>
        <MeetTeamMain lang={lang} />
      </main>

      <Footer />
    </AboutLayout>
  );
}