import Home from "./pages/home";
import About from "./pages/about";
import AboutEventsPage from "./pages/aboutEvents";
import EventPage from "./pages/event";
import EventsPage from "./pages/events";
import GalleryPage from "./pages/gallery";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop/>
    <Routes>

      

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about/events" element={<AboutEventsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/gallery/:id" element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;