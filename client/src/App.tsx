import Home from "./pages/home";
import About from "./pages/about";
import AboutLearnMore from "./pages/aboutLearnMore";
import AboutEventsPage from "./pages/aboutEvents";
import EventPage from "./pages/event";
import GalleryPage from "./pages/gallery";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about/learnmore" element={<AboutLearnMore />} />
      <Route path="/about/events" element={<AboutEventsPage />} />
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/gallery/:id" element={<GalleryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;