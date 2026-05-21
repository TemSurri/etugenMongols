"use client";

import { useLanguage } from "../context/LanguageContext";
import { useParams } from "react-router-dom";

import Header from "../components/home/Header";
import EventView from "../components/eventItem/EventView";
import { events } from "../static_events";


export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

  const { lang, setLang } = useLanguage();

  if (!event) {
    return (
      <>
        <Header lang={lang} setLang={setLang} />

        <main className="min-h-screen bg-black pt-28">
          <p className="text-center text-xl text-white">Event not found</p>
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