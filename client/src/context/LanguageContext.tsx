import type { Lang } from "./language";
import { LanguageContext } from "./useLanguage";

import { useEffect, useMemo, useState, type ReactNode } from "react";

export type { Lang } from "./language";

const STORAGE_KEY = "site-lang";

function isLang(value: unknown): value is Lang {
  return value === "en" || value === "mn";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "mn";

    const savedLang = window.localStorage.getItem(STORAGE_KEY);
    return isLang(savedLang) ? savedLang : "mn";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
