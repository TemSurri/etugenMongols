import { useLanguage } from "../../../context/useLanguage";

import Header from "../../../components/navigation/SiteHeader";
import Hero from "../Hero";

import Footer from "../../../components/navigation/SiteFooter";

export default function Home() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />
      </main>

      <Footer />
    </>
  );
}
