"use client";

import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Gallery from "../components/home/GalleryBar";
import CTA from "../components/home/Contact";
import Upcoming from "../components/home/upcoming/Upcoming";
import Footer from "../components/home/Footer";

import { useState}  from "react";

// upcoming event data
import {
  events as upcomingEventsRaw,
  getCardInfos as getUpcomingCardInfos,
  getListings,
} from "../static_events";

// gallery event data
import {
  events as galleryEventsRaw,
  getCardInfos as getGalleryCardInfos,
} from "../static_gallery";

// Language type 
type Lang = "en" | "mn";

export default function Home() {
  const upcomingItems = getUpcomingCardInfos(upcomingEventsRaw);
  const volunteerListings = getListings(upcomingEventsRaw);
  const galleryItems = getGalleryCardInfos(galleryEventsRaw);

  const [lang, setLang] = useState<Lang>("mn");

  return (
    <>
      <Header lang = {lang} setLang = {setLang} />

      <main>
        <Hero lang = {lang}/>
        <Upcoming
          eventItems={upcomingItems}
          Listings={volunteerListings}
        />
        <Gallery eventItems={galleryItems} />
        <CTA />
      </main>

      <Footer />
    </>
  );
}