import type { ReactNode } from "react";

import { AuthProvider } from "../context/AuthContext";
import { EventsProvider } from "../context/EventsContext";
import { LanguageProvider } from "../context/LanguageContext";

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
