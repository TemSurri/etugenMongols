import { Navigate,Route,Routes } from "react-router-dom";

import MeetTeamPage from "../sections/about/pages/MeetTeamPage";
import OurImpactPage from "../sections/about/pages/OurImpactPage";
import StoryPage from "../sections/about/pages/StoryPage";
import AccountPage from "../sections/account/pages/AccountPage";
import RegistrationsPage from "../sections/account/pages/RegistrationsPage";
import AdminPage from "../sections/admin/pages/AdminPage";
import VerificationPage from "../sections/auth/pages/account_verification";
import EmailChangeVerificationPage from "../sections/auth/pages/email_change_verification";
import ForgotPasswordPage from "../sections/auth/pages/forgot_password";
import LoginPage from "../sections/auth/pages/login";
import ResetPasswordPage from "../sections/auth/pages/reset_password";
import VerifyAccountPage from "../sections/auth/pages/send_account_verification";
import SignupPage from "../sections/auth/pages/signup";
import Contact from "../sections/contact/pages/ContactPage";
import EventDetailPage from "../sections/events/pages/EventDetailPage";
import EventsPage from "../sections/events/pages/EventsPage";
import GalleryDetailPage from "../sections/gallery/pages/GalleryDetailPage";
import Gallery from "../sections/gallery/pages/GalleryPage";
import Home from "../sections/home/pages/HomePage";
import DonatePage from "../sections/involvement/pages/DonatePage";
import VolunteerPage from "../sections/involvement/pages/VolunteerPage";
import DonateMoneyPage from "../sections/payments/donation/pages/DonateMoneyPage";
import EventRegistrationPage from "../sections/payments/event-registration/pages/EventRegistrationPage";
import ProgramsPage from "../sections/programs/pages/ProgramsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/story" element={<StoryPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/gallery/:id" element={<GalleryDetailPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/auth/verify-account" element={<VerifyAccountPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/change-email" element={<EmailChangeVerificationPage />} />
      <Route path="/payments/donate-money" element={<DonateMoneyPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/account/registrations" element={<RegistrationsPage />} />
      <Route path="/events/:slug/register" element={<EventRegistrationPage />} />
      <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
      <Route path="/get-involved/donate" element={<DonatePage />} />
      <Route path="/about/team" element={<MeetTeamPage />} />
      <Route path="/about/impact" element={<OurImpactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
