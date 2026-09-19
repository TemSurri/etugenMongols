import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import { useLanguage } from "../../../context/useLanguage";
import VolunteerMain from "../VolunteerMain";

export default function VolunteerPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <VolunteerMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}
