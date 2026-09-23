import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "../sections/home/pages/HomePage";
import EventsPage from "../sections/events/pages/EventsPage";
import DonatePage from "../sections/involvement/pages/DonatePage";
import VolunteerPage from "../sections/involvement/pages/VolunteerPage";
import GalleryDetailPage from "../sections/gallery/pages/GalleryDetailPage";

const MeetTeamPage = lazy(() => import("../sections/about/pages/MeetTeamPage"));
const OurImpactPage = lazy(
  () => import("../sections/about/pages/OurImpactPage"),
);
const StoryPage = lazy(() => import("../sections/about/pages/StoryPage"));
const AccountPage = lazy(() => import("../sections/account/pages/AccountPage"));
const RegistrationsPage = lazy(
  () => import("../sections/account/pages/RegistrationsPage"),
);
const AdminPage = lazy(() => import("../sections/admin/pages/AdminPage"));
const VerificationPage = lazy(
  () => import("../sections/auth/pages/account_verification"),
);
const EmailChangeVerificationPage = lazy(
  () => import("../sections/auth/pages/email_change_verification"),
);
const ForgotPasswordPage = lazy(
  () => import("../sections/auth/pages/forgot_password"),
);
const LoginPage = lazy(() => import("../sections/auth/pages/login"));
const ResetPasswordPage = lazy(
  () => import("../sections/auth/pages/reset_password"),
);
const VerifyAccountPage = lazy(
  () => import("../sections/auth/pages/send_account_verification"),
);
const SignupPage = lazy(() => import("../sections/auth/pages/signup"));
const Contact = lazy(() => import("../sections/contact/pages/ContactPage"));
const EventDetailPage = lazy(
  () => import("../sections/events/pages/EventDetailPage"),
);
const Gallery = lazy(() => import("../sections/gallery/pages/GalleryPage"));
const DonateMoneyPage = lazy(
  () => import("../sections/payments/donation/pages/DonateMoneyPage"),
);
const EventRegistrationPage = lazy(
  () =>
    import(
      "../sections/payments/event-registration/pages/EventRegistrationPage"
    ),
);
const ProgramsPage = lazy(
  () => import("../sections/programs/pages/ProgramsPage"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
        <Route
          path="/auth/change-email"
          element={<EmailChangeVerificationPage />}
        />
        <Route path="/payments/donate-money" element={<DonateMoneyPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/registrations" element={<RegistrationsPage />} />
        <Route
          path="/events/:slug/register"
          element={<EventRegistrationPage />}
        />
        <Route path="/get-involved/volunteer" element={<VolunteerPage />} />
        <Route path="/get-involved/donate" element={<DonatePage />} />
        <Route path="/about/team" element={<MeetTeamPage />} />
        <Route path="/about/impact" element={<OurImpactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function RouteFallback() {
  const { pathname } = useLocation();
  const usesLightBackground =
    pathname.startsWith("/about/") ||
    pathname === "/programs" ||
    pathname === "/contact";

  return (
    <div
      aria-hidden="true"
      className={`min-h-screen ${
        usesLightBackground ? "bg-[#fffaf0]" : "bg-[#303824]"
      }`}
    />
  );
}
