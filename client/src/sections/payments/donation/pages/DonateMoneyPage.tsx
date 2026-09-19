import { useLanguage } from "../../../../context/useLanguage";

import Footer from "../../../../components/navigation/SiteFooter";
import Header from "../../../../components/navigation/SiteHeader";
import DonateCheckoutSection from "../DonateCheckoutSection";

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
