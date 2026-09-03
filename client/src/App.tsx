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
import VerificationPage
    from "./pages/auth/account_verification";
import VerifyAccountPage
    from "./pages/auth/send_account_verification";

import ForgotPasswordPage
  from "./pages/auth/forgot_password";

import ResetPasswordPage
  from "./pages/auth/reset_password";

import EventRegistrationPage
  from "./pages/EventRegistrationPage";

import DonateMoneyPage from "./pages/payments/DonateMoneyPage";
import AdminPage from "./pages/AdminPage";

import AccountPage from "./pages/user/AccountPage";
import RegistrationsPage from "./pages/user/RegistrationsPage";

import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./sections/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";
import {
  EventsProvider
} from "./context/EventsContext";

import {
    AuthProvider
} from "./context/AuthContext";
import EmailChangeVerificationPage from "./pages/auth/email_change_verification";


function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
    <EventsProvider>
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
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/auth/login" element={<LoginPage />}/>
        <Route path="/auth/signup" element={<SignupPage />}/>
        <Route
            path="/verify"
            element={<VerificationPage />}
        />
        <Route
          path="/auth/verify-account"
          element={<VerifyAccountPage />}
         />

        <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
        />

        <Route
            path="/auth/reset-password"
            element={<ResetPasswordPage />}
        />
        <Route
            path="/auth/change-email"
            element={
                <EmailChangeVerificationPage />
            }
        />

        <Route
          path="/payments/donate-money"
          element={<DonateMoneyPage/>}
        />

        <Route
          path="/account"
          element={<AccountPage />}
        />

        <Route
          path="/account/registrations"
          element={<RegistrationsPage />}
        />

        <Route
          path="/events/:slug/register"
          element={
            <EventRegistrationPage />
          }
        />
        
        <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
        <Route path="/get-involved/donate" element={<DonatePage />} />
        <Route path="/about/team" element={<MeetTeamPage />} />
        <Route path="/about/impact" element={<OurImpactPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EventsProvider>
    </AuthProvider>
     
    </LanguageProvider>



  );
}

export default App;