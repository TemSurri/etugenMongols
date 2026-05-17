"use client";

import { useState } from "react";

import Header from "../components/home/Header";
import AboutEvents from "../components/about/AboutEvents";
import Footer from "../components/home/Footer";

type Lang = "en" | "mn";

export default function AboutEventsPage() {
  const [lang, setLang] = useState<Lang>("mn");

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <AboutEvents lang={lang} />
      </main>

      <Footer />
    </>
  );
}