import { eventDetailPageCopy } from "../content/EventDetailPageCopy";

import { useParams } from "react-router-dom";

import { useLanguage } from "../../../context/useLanguage";

import { useEventsContext } from "../hooks/useEventsContext";

import Header from "../../../components/navigation/SiteHeader";

import EventView from "../detail/EventView";

export default function EventDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const { lang, setLang } = useLanguage();

  const { events, loading, error } = useEventsContext();

  const event = events.find((event) => event.slug === id);

  if (loading) {
    return (
      <>
        <Header lang={lang} setLang={setLang} />

        <main className="min-h-screen bg-[#f6efdf] pt-28">
          <p className="text-center text-sm text-[#4e593c]">
            {eventDetailPageCopy[lang].loadingEvent}
          </p>
        </main>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Header lang={lang} setLang={setLang} />

        <main className="min-h-screen bg-[#f6efdf] pt-28">
          <p className="text-center text-xl text-[#27301d]">
            {eventDetailPageCopy[lang].eventNotFound}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <EventView event={event} lang={lang} />
    </>
  );
}
