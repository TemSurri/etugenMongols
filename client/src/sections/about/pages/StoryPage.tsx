import Footer from "../../../components/navigation/SiteFooter";
import Header from "../../../components/navigation/SiteHeader";
import ContentAvailabilityNotice from "../../../components/ContentAvailabilityNotice";
import { useLanguage } from "../../../context/useLanguage";
import StoryMain from "../OurStoryMain";

export default function OurImpactPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <ContentAvailabilityNotice kind="story" lang={lang} />

      <main className="relative z-10">
        <StoryMain lang={lang} />
      </main>

      <Footer />
    </>
  );
}
