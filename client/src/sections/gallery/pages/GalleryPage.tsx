import Footer from "../../../components/navigation/SiteFooter.tsx";
import Header from "../../../components/navigation/SiteHeader.tsx";
import ContentAvailabilityNotice from "../../../components/ContentAvailabilityNotice";
import { useLanguage } from "../../../context/useLanguage";
import GalleryShowcase from "../GalleryShowcase.tsx";

export default function GalleryPage() {
  const { lang, setLang } = useLanguage();

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <ContentAvailabilityNotice kind="gallery" lang={lang} />
      <GalleryShowcase lang={lang} />
      <Footer />
    </>
  );
}
