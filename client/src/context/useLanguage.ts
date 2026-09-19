import type { Lang } from "./language";

import { createContext, useContext } from "react";
type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
