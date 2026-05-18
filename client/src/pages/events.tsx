"use client";

import { useState } from "react";

import Header from "../components/home/Header";
import Events from "../components/events/Events";
import Footer from "../components/home/Footer";

type Lang = "en" | "mn";

export default function EventsPage() {
  const [lang, setLang] = useState<Lang>("mn");

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <Events lang={lang} />
      </main>

      <Footer />
    </>
  );
}