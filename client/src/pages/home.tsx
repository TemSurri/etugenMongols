import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Gallery from "../components/home/GalleryBar";
import CTA from "../components/home/Contact";
import Upcoming from "../components/home/upcoming/Upcoming";
import Footer from "../components/home/Footer";

import {
  events as upcomingEventsRaw,
  getCardInfos as getUpcomingCardInfos,
  getListings,
} from "../static_events";

import {
  events as galleryEventsRaw,
  getCardInfos as getGalleryCardInfos,
} from "../static_gallery";

export default function Home() {
  const upcomingItems = getUpcomingCardInfos(upcomingEventsRaw);
  const volunteerListings = getListings(upcomingEventsRaw);
  const galleryItems = getGalleryCardInfos(galleryEventsRaw);

  return (
    <>
      <Header />

      <main>
        <Hero />
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