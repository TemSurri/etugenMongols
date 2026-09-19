import { useLanguage } from "../../../context/useLanguage";

import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import Events from "../EventsMain";

export default function EventsPage() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#27301d]">
      <Header lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <Events lang={lang} />
      </main>

      <footer className="relative z-50 bg-[#27301d]">
        <Footer />
      </footer>
    </div>
  );
}
