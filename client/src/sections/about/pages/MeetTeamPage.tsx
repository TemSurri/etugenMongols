import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import MeetTeamMain from "../MeetTeamMain";

import { useLanguage } from "../../../context/useLanguage";

export default function MeetTeamPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <MeetTeamMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}
