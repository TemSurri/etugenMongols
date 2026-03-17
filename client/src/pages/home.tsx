import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Gallery from "../components/home/GalleryBar";
import CTA from "../components/home/Contact";

import Upcoming from "../components/home/EventBar"
import Footer from "../components/home/Footer"

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