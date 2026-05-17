"use client";

import { useState } from "react";

import Header from "../components/home/Header";
import AboutUs from "../components/about/aboutUs";
import Footer from "../components/home/Footer";

type Lang = "en" | "mn";

export default function About() {
  const [lang, setLang] = useState<Lang>("mn");

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
