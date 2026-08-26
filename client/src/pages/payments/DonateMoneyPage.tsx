"use client";

import { useLanguage } from "../../context/LanguageContext";

import Header from "../../sections/home/Header";
import DonateCheckoutSection from "../../sections/payments/donate/DonateCheckoutSection";
import Footer from "../../sections/home/Footer";

export default function DonateMoneyPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#27301d]">
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <DonateCheckoutSection lang={lang} />
      </main>

      <footer className="relative z-50 bg-[#27301d]">
        <Footer />
      </footer>
    </div>
  );
}