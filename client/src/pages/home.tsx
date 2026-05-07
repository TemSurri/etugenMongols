"use client";

import { useState } from "react";

import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Gallery from "../components/home/GalleryBar";
import CTA from "../components/home/Contact";
import Upcoming from "../components/home/upcoming/Upcoming";
import Footer from "../components/home/Footer";

// upcoming event data
import { events as upcomingEventsRaw, getListings } from "../static_events";

// gallery event data
import {
  events as galleryEventsRaw,
  getCardInfos as getGalleryCardInfos,
} from "../static_gallery";

type Lang = "en" | "mn";

export default function Home() {
  const volunteerListings = getListings(upcomingEventsRaw);
  const galleryItems = getGalleryCardInfos(galleryEventsRaw);

  const [lang, setLang] = useState<Lang>("mn");

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />

        <Upcoming
          eventItems={upcomingEventsRaw}
          Listings={volunteerListings}
          pastEvents={galleryEventsRaw}
          lang={lang}
        />

        <Gallery eventItems={galleryItems} />

        <CTA />
      </main>

      <Footer />
    </>
  );
}