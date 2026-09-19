import type { ReactNode } from "react";

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
        <EventsProvider>{children}</EventsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
