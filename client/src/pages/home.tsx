import Header from "../components/Header";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import CTA from "../components/CTA";
import About from "../components/About"
import Upcoming from "../components/Upcoming"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Upcoming />
      <About />
      <Gallery />
      <CTA />
      <Footer/>
    </>
  );
}
