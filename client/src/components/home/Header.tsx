"use client";

import { memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";

type Lang = "en" | "mn";

type HeaderProps = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

type NavItem = {
  label: string;
  to: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

function Header({ lang, setLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "mn" : "en"));
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#d6c77a]/12 bg-[#252817] text-[#f3efd9] shadow-[0_8px_28px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 transition-opacity hover:opacity-85"
          aria-label="Go to homepage"
        >
          <img
            src={logo}
            alt="Etugen Mongols logo"
            className="h-11 w-11 object-contain"
            loading="eager"
            decoding="async"
          />

          <div className="leading-none">
            <p className="text-lg font-semibold tracking-wide">
              Etugen Mongols
            </p>
            <p className="mt-1 hidden text-[11px] uppercase tracking-[0.22em] text-[#f3efd9]/55 sm:block">
              Calgary Mongolian Community
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm font-medium tracking-wide transition-colors",
                  isActive
                    ? "text-[#d6c77a]"
                    : "text-[#f3efd9]/72 hover:text-[#f3efd9]",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="
              hidden
              border border-[#d6c77a]/25
              px-4 py-2
              text-xs font-semibold uppercase tracking-[0.18em]
              text-[#f3efd9]/85
              transition-colors
              hover:border-[#d6c77a]/70
              hover:bg-[#d6c77a]/10
              hover:text-[#f3efd9]
              sm:inline-flex
            "
          >
            {lang === "en" ? "Монгол" : "English"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="
              inline-flex
              h-10 w-10
              items-center justify-center
              border border-[#d6c77a]/25
              text-[#f3efd9]
              transition-colors
              hover:border-[#d6c77a]/70
              hover:bg-[#d6c77a]/10
              lg:hidden
            "
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#d6c77a]/12 bg-[#252817] px-5 py-5 lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "px-1 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "text-[#d6c77a]"
                      : "text-[#f3efd9]/75 hover:text-[#f3efd9]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggleLang}
              className="
                mt-4
                w-fit
                border border-[#d6c77a]/25
                px-4 py-2
                text-xs font-semibold uppercase tracking-[0.18em]
                text-[#f3efd9]/85
                transition-colors
                hover:border-[#d6c77a]/70
                hover:bg-[#d6c77a]/10
                hover:text-[#f3efd9]
                sm:hidden
              "
            >
              {lang === "en" ? "Монгол" : "English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default memo(Header);