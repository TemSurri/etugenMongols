"use client";

import { useState } from "react";

import Header from "../components/home/Header";
import LearnMore from "../components/about/LearnMore";
import Footer from "../components/home/Footer";

type Lang = "en" | "mn";

export default function AboutLearnMore() {
  const [lang, setLang] = useState<Lang>("mn");

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