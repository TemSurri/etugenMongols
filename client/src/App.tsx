import Home from "./pages/home";
import ProgramsPage from "./pages/programs";
import EventPage from "./pages/eventItem";
import EventsPage from "./pages/events";
import GalleryPage from "./pages/galleryItem";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";
import VolunteerPage from "./pages/VolunteerPage";

import DonatePage from "./pages/DonatePage";
import MeetTeamPage from "./pages/MeetTeamPage";
import StoryPage from "./pages/StoryPage";
import OurImpactPage from "./pages/OurImpactPage";

import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";

import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./sections/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/story" element={<StoryPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/auth/login" element={<LoginPage />}/>

        <Route path="/auth/signup" element={<SignupPage />}/>
        
        <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
        
        <Route path="/get-involved/donate" element={<DonatePage />} />

        <Route path="/about/team" element={<MeetTeamPage />} />
        <Route path="/about/impact" element={<OurImpactPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;