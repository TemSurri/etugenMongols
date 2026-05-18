"use client";

import { useState } from "react";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Contact from "../components/contact/Contact";

type Lang = "en" | "mn";


export default function ContactPage() {
    const [lang, setLang] = useState<Lang>("mn");
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <Contact lang={lang} />
      <Footer />
    </>
  );
}