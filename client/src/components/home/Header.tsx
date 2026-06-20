"use client";

import { memo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

type Lang = "en" | "mn";

type HeaderProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

type NavChild = {
  label: string;
  to: string;
};

type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Who We Are",
    to: "/about",
    children: [
      { label: "Our Story", to: "/about/story" },
      { label: "Meet the Bigger Team", to: "/about/team" },
      { label: "Our Impact", to: "/about/impact" },
    ],
  },
  {
    label: "What We Do",
    to: "/what-we-do",
    children: [
      { label: "Events", to: "/events" },
      { label: "Programs", to: "/programs" },
    ],
  },
  {
    label: "Get Involved",
    to: "/get-involved",
    children: [
      { label: "Volunteer", to: "/get-involved/volunteer" },
      { label: "Donate", to: "/get-involved/donate" },
    ],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const isRouteActive = (currentPath: string, to: string) => {
  if (to.includes("#")) return currentPath === to;
  if (to === "/") return currentPath === "/";
  return currentPath === to || currentPath.startsWith(`${to}/`);
};

const isParentActive = (currentPath: string, item: NavItem) =>
  Boolean(item.children?.some((child) => isRouteActive(currentPath, child.to)));

const scrollToHashTarget = (to: string) => {
  const hash = to.split("#")[1];
  if (!hash) return;

  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

function Header({ lang, setLang }: HeaderProps) {
  const location = useLocation();
  const currentPath = `${location.pathname}${location.hash}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMobileGroup(null);
  };

  const handleNavClick = (to: string) => {
    closeMenu();
    if (to.includes("#")) scrollToHashTarget(to);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "mn" : "en");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#efe7d4] bg-white text-[#27301d] shadow-[0_10px_34px_rgba(39,48,29,0.07)]">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink-0 items-center gap-3 no-underline transition-opacity hover:opacity-90"
          aria-label="Go to homepage"
        >
          <img
            src="/logo.webp"
            alt="Etugen Mongols logo"
            className="h-18 w-18 object-contain md:h-20 md:w-20"
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

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-8"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.children?.length);
            const parentActive = isParentActive(currentPath, item);

            if (!hasDropdown) {
              const itemActive = isRouteActive(currentPath, item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => handleNavClick(item.to)}
                  className={[
                    "whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.12em] no-underline transition-colors 2xl:text-[13px] 2xl:tracking-[0.16em]",
                    itemActive
                      ? "text-[#9a7b26]"
                      : "text-[#27301d]/78 hover:text-[#27301d]",
                  ].join(" ")}
                >
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div key={item.to} className="group relative">
                <button
                  type="button"
                  className={[
                    "inline-flex cursor-default items-center gap-1.5 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.12em] transition-colors 2xl:text-[13px] 2xl:tracking-[0.16em]",
                    parentActive
                      ? "text-[#9a7b26]"
                      : "text-[#27301d]/78 group-hover:text-[#27301d]",
                  ].join(" ")}
                  aria-haspopup="true"
                >
                  {item.label}

                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="invisible absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 border border-[#efe7d4] bg-white p-2 opacity-0 shadow-[0_22px_55px_rgba(39,48,29,0.13)] transition-all duration-150 group-hover:visible group-hover:mt-4 group-hover:opacity-100">
                  <div className="absolute -top-4 left-0 h-4 w-full" />

                  {item.children?.map((child) => {
                    const childActive = isRouteActive(currentPath, child.to);

                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => handleNavClick(child.to)}
                        className={[
                          "block px-4 py-3 text-sm font-semibold no-underline transition-colors",
                          childActive
                            ? "bg-[#fffaf0] text-[#9a7b26]"
                            : "text-[#27301d]/80 hover:bg-[#fffaf0] hover:text-[#27301d]",
                        ].join(" ")}
                      >
                        {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="grid h-11 w-[8.75rem] grid-cols-2 border border-[#e6dcc3] bg-[#fffaf0] p-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#27301d] transition-colors hover:border-[#d8caa5]"
            aria-label="Toggle language"
          >
            <span
              className={[
                "flex items-center justify-center transition-colors",
                lang === "en"
                  ? "bg-white text-[#9a7b26] shadow-sm"
                  : "text-[#27301d]/55",
              ].join(" ")}
            >
              EN
            </span>
            <span
              className={[
                "flex items-center justify-center transition-colors",
                lang === "mn"
                  ? "bg-white text-[#9a7b26] shadow-sm"
                  : "text-[#27301d]/55",
              ].join(" ")}
            >
              MN
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] text-[#27301d] transition-colors hover:border-[#d8caa5] hover:bg-white xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#efe7d4] bg-white px-5 py-5 xl:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children?.length);
              const isOpen = openMobileGroup === item.label;

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className="px-1 py-3 text-base font-semibold no-underline text-[#27301d]/82"
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <div key={item.to} className="border-b border-[#efe7d4]">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroup(isOpen ? null : item.label)
                    }
                    className="flex w-full items-center justify-between px-1 py-3 text-left text-base font-semibold text-[#27301d]/85"
                  >
                    {item.label}
                    <span>{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="pb-3 pl-4">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => handleNavClick(child.to)}
                          className="block px-2 py-2 text-sm font-medium no-underline text-[#27301d]/72"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default memo(Header);