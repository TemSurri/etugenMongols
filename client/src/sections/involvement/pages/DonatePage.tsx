import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/useLanguage";
import DonateMain from "../Donate";

export default function DonatePage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <DonateMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}
