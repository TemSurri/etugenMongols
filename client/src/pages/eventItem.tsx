"use client";

import {
  useParams
} from "react-router-dom";

import {
  useLanguage
} from "../context/LanguageContext";

import {
  useEventsContext
} from "../context/EventsContext";

import Header
  from "../sections/home/Header";

import EventView
  from "../sections/eventItem/EventView";


export default function EventPage() {

  const {
    id
  } =
    useParams<{
      id: string;
    }>();


  const {
    lang,
    setLang
  } =
    useLanguage();


  const {
    events,
    loading,
    error
  } =
    useEventsContext();


  const event =
    events.find(
      event =>
        event.slug === id
    );


  if (loading) {

    return (
      <>
        <Header
          lang={lang}
          setLang={setLang}
        />

        <main className="min-h-screen bg-[#f6efdf] pt-28">

          <p className="text-center text-sm text-[#4e593c]">
            {lang === "mn"
              ? "Арга хэмжээг ачаалж байна..."
              : "Loading event..."}
          </p>

        </main>
      </>
    );
  }


  if (
    error ||
    !event
  ) {

    return (
      <>
        <Header
          lang={lang}
          setLang={setLang}
        />

        <main className="min-h-screen bg-[#f6efdf] pt-28">

          <p className="text-center text-xl text-[#27301d]">
            {lang === "mn"
              ? "Арга хэмжээ олдсонгүй"
              : "Event not found"}
          </p>

        </main>
      </>
    );
  }


  return (
    <>
      <Header
        lang={lang}
        setLang={setLang}
      />

      <EventView
        event={event}
        lang={lang}
      />
    </>
  );
}