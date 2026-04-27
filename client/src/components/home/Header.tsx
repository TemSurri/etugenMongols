"use client";

import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.webp";

type MenuItem = {
  label: string;
  id: string;
  offset?: number;
};

type Lang = "en" | "mn";

type HeaderProps = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Events", id: "upcoming" },
  { label: "About", id: "upcoming" },
  { label: "Contact", id: "upcoming", offset: -600 },
  { label: "Gallery", id: "gallery" },
];

const MOBILE_MENU_ITEMS: MenuItem[] = [
  { label: "Events", id: "upcoming" },
  { label: "About", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Contact", id: "contact" },
];

// keeps track of if the header should be hidden or transparent
function useHeaderScrollState() {
  const [isTop, setIsTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const nextIsTop = currentY < 100;
        const nextHidden = currentY > lastScrollY.current && currentY > 120;

        setIsTop((prev) => (prev !== nextIsTop ? nextIsTop : prev));
        setHidden((prev) => (prev !== nextHidden ? nextHidden : prev));

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isTop, hidden };
}

type MenuButtonProps = {
  menuOpen: boolean;
  onToggle: () => void;
};

// hamburger button
function MenuButton({ menuOpen, onToggle }: MenuButtonProps) {
  return (
    <button
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      aria-controls="desktop-header-menu mobile-header-menu"
      onClick={onToggle}
      className={`
        p-3 rounded-full transition
        ${menuOpen ? "bg-black/80" : "bg-black/60"}
        hover:bg-black/80
      `}
    >
      {menuOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

type DesktopMenuProps = {
  items: MenuItem[];
  onItemClick: (id: string, offset?: number) => void;
};

// desktop dropdown menu
function DesktopMenu({ items, onItemClick }: DesktopMenuProps) {
  return (
    <div
      id="desktop-header-menu"
      className="
        hidden lg:block
        absolute right-0 top-full mt-4
        w-48
        bg-white
        text-black
        rounded-xl
        shadow-lg
        py-4
      "
    >
      {items.map((item) => (
        <button
          key={`${item.label}-${item.id}-${item.offset ?? 0}`}
          onClick={() => onItemClick(item.id, item.offset)}
          className="block w-full px-6 py-2 hover:bg-black/5 transition text-left"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

type MobileMenuProps = {
  items: MenuItem[];
  onItemClick: (id: string, offset?: number) => void;
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

// mobile and tablet dropdown menu
function MobileMenu({ items, onItemClick, lang, setLang }: MobileMenuProps) {
  return (
    <div
      id="mobile-header-menu"
      className="
        lg:hidden
        flex flex-col text-center gap-5
        text-lg px-6 py-6 mt-4
        bg-black/80 border-t border-white/10
      "
    >
      <button
        type="button"
        onClick={() => setLang((prev) => (prev === "en" ? "mn" : "en"))}
        className="
          mx-auto
          rounded-full
          border border-white/70
          px-5 py-2
          text-sm font-semibold uppercase tracking-widest
          text-white
          hover:bg-white/10
          transition
        "
      >
        {lang === "en" ? "Монгол" : "English"}
      </button>

      <div className="mx-auto h-px w-24 bg-white/20" />

      {items.map((item) => (
        <button
          key={`${item.label}-${item.id}-${item.offset ?? 0}`}
          onClick={() => onItemClick(item.id, item.offset)}
          className="hover:text-blue-400 transition"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function Header({ lang, setLang }: HeaderProps) {
  const { isTop, hidden } = useHeaderScrollState();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

  const scrollWithOffset = (id: string, offset: number = 13) => {
    const el = document.getElementById(id);

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  // closes menu when escape is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // closes menu when clicking outside of it
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!menuWrapperRef.current) return;

      if (!menuWrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  return (
    <header
      className={`
        hidden [@media(min-height:500px)]:block
        fixed top-0 w-full z-50 px-4 sm:px-6 md:px-8 py-4
        transition-all duration-300 ease-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${isTop ? "bg-transparent text-white" : "bg-black/70 text-white"}
      `}
    >
      <div ref={menuWrapperRef}>
        <div className="w-full flex justify-between items-center relative">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="hover:opacity-90 transition flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Etugen Mongols Logo"
              className="hidden md:block w-10 h-10"
            />

            <h1 className="text-2xl font-bold tracking-wide">
              Etugen Mongols
            </h1>
          </button>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "en" ? "mn" : "en"))}
              className="
                hidden lg:inline-flex
                items-center justify-center
                rounded-full
                px-4 py-2
                text-xs font-semibold uppercase tracking-widest
                bg-black/60 text-white
                hover:bg-black/80
                transition
              "
            >
              {lang === "en" ? "Монгол" : "English"}
            </button>

            <div className="relative">
              <MenuButton
                menuOpen={menuOpen}
                onToggle={() => setMenuOpen((open) => !open)}
              />

              {menuOpen && (
                <DesktopMenu
                  items={MENU_ITEMS}
                  onItemClick={scrollWithOffset}
                />
              )}
            </div>
          </div>
        </div>

        {menuOpen && (
          <MobileMenu
            items={MOBILE_MENU_ITEMS}
            onItemClick={scrollWithOffset}
            lang={lang}
            setLang={setLang}
          />
        )}
      </div>
    </header>
  );
}