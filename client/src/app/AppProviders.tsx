import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from "../sections/auth/context/AuthProvider";
import { EventsProvider } from "../sections/events/context/EventsProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <EventsProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </EventsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
