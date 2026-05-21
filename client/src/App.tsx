import Home from "./pages/home";
import About from "./pages/about";
import AboutEventsPage from "./pages/aboutEvents";
import EventPage from "./pages/eventItem";
import EventsPage from "./pages/events";
import GalleryPage from "./pages/galleryItem";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";

import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/events" element={<AboutEventsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;