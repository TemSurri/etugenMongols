import type { Lang } from "../../context/language";

import DesktopAccountControls from "./DesktopAccountControls";
import DesktopNavigation from "./DesktopNavigation";
import LanguageToggle from "./LanguageToggle";
import MobileNavigation from "./MobileNavigation";
import { scrollToHashTarget, type UserMenuItem } from "./navigationConfig";

import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { siteMedia } from "../../media/siteMedia";
import { useAuth } from "../../sections/auth/hooks/useAuth";

type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

function Header({ lang, setLang }: HeaderProps) {
  const location = useLocation();

  const currentPath = `${location.pathname}${location.hash}`;

  const [menuOpen, setMenuOpen] = useState(false);

  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const { user, isLoggedIn, loading, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const userMenuItems: UserMenuItem[] = [
    {
      label: "My Account",
      to: "/account",
    },
    {
      label: "My Registrations",
      to: "/account/registrations",
    },

    ...(isAdmin
      ? [
          {
            label: "Admin",
            to: "/admin",
          },
        ]
      : []),
  ];

  const closeMenu = () => {
    setMenuOpen(false);

    setOpenMobileGroup(null);
  };

  const handleNavClick = (to: string) => {
    closeMenu();

    if (to.includes("#")) {
      scrollToHashTarget(to);
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "mn" : "en");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#efe7d4] bg-white text-[#27301d] shadow-[0_10px_34px_rgba(39,48,29,0.07)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:h-24 sm:px-6 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center gap-3 no-underline transition-opacity hover:opacity-90"
          aria-label="Go to homepage"
        >
          <img
            src={siteMedia.logo}
            alt="Etugen Mongols logo"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
            loading="eager"
            decoding="async"
          />

          <div className="hidden w-[12rem] leading-none sm:block">
            <p className="truncate text-lg font-semibold tracking-wide text-[#27301d] md:text-xl">
              Etugen Mongols
            </p>

            <p className="mt-2 truncate text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26] md:text-[11px]">
              Not For Profit
            </p>
          </div>
        </Link>

        <DesktopNavigation
          currentPath={currentPath}
          handleNavClick={handleNavClick}
        />

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {/* AUTH CONTROLS */}

          <DesktopAccountControls
            user={user}
            isLoggedIn={isLoggedIn}
            loading={loading}
            logout={logout}
            userMenuItems={userMenuItems}
          />

          {/* EXISTING LANGUAGE TOGGLE */}

          <LanguageToggle lang={lang} toggleLang={toggleLang} />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] text-lg text-[#27301d] transition-colors hover:border-[#d8caa5] hover:bg-white sm:h-11 sm:w-11 xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <MobileNavigation
          user={user}
          isLoggedIn={isLoggedIn}
          loading={loading}
          logout={logout}
          userMenuItems={userMenuItems}
          currentPath={currentPath}
          openMobileGroup={openMobileGroup}
          setOpenMobileGroup={setOpenMobileGroup}
          closeMenu={closeMenu}
          handleNavClick={handleNavClick}
        />
      )}
    </header>
  );
}

export default memo(Header);
