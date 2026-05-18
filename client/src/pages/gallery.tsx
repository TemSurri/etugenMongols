"use client";

import { useState } from "react";
import GalleryShowcase from "../components/gallery/GalleryShowcase.tsx";
import Header from "../components/home/Header.tsx";
import Footer from "../components/home/Footer.tsx";


type Lang = "en" | "mn";

export default function GalleryPage() {
  const [lang, setLang] = useState<Lang>("mn");

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <GalleryShowcase lang={lang} />
      <Footer />
    </>

);
}