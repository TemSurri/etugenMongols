import Header from "../components/Header";
import Hero from "../components/Hero";
import Gallery from "../components/GalleryBar";
import CTA from "../components/Contact";

import Upcoming from "../components/EventBar"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Upcoming />
        <Gallery />
        <CTA />
      </main>

      <Footer />
    </>
  );
}