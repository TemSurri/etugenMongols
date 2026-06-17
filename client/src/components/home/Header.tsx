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
      { label: "Home / Our Story", to: "/" },
      { label: "Meet the Bigger Team", to: "/about/team" },
      { label: "Our Impact", to: "/about/impact" },
    ],
  },
  {
    label: "What We Do",
    to: "/what-we-do",
    children: [
      { label: "Events", to: "/events" },
      { label: "Programs (Coming Soon)", to: "/programs" },
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
  {
    label: "Gallery",
    to: "/gallery",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

const isRouteActive = (pathname: string, to: string) => {
  return pathname === to || pathname.startsWith(`${to}/`);
};

const isParentActive = (pathname: string, item: NavItem) => {
  return (
    isRouteActive(pathname, item.to) ||
    item.children?.some((child) => isRouteActive(pathname, child.to))
  );
};

function Header({ lang, setLang }: HeaderProps) {
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMobileGroup(null);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "mn" : "en");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#d8caa5]/55 bg-[#fffaf0] text-[#27301d] shadow-[0_8px_28px_rgba(88,72,38,0.10)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-0 transition-opacity hover:opacity-85"
          aria-label="Go to homepage"
        >
          <img
            src="/logo.webp"
            alt="Etugen Mongols logo"
            className="h-20 w-20 object-contain"
            loading="eager"
            decoding="async"
          />

          <div className="leading-none">
            <p className="text-lg font-semibold tracking-wide">
              Etugen Mongols
            </p>

            <p className="mt-1 hidden text-[11px] uppercase tracking-[0.22em] text-[#4e593c]/65 sm:block">
              Not For Profit
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const hasDropdown = Boolean(item.children?.length);
            const parentActive = isParentActive(pathname, item);

            if (!hasDropdown) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "text-sm font-medium tracking-wide transition-colors",
                      isActive
                        ? "text-[#9a7b26]"
                        : "text-[#4e593c]/78 hover:text-[#27301d]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              );
            }

            return (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className={[
                    "inline-flex cursor-default items-center gap-1.5 text-sm font-medium tracking-wide transition-colors",
                    parentActive
                      ? "text-[#9a7b26]"
                      : "text-[#4e593c]/78 group-hover:text-[#27301d]",
                  ].join(" ")}
                  aria-haspopup="true"
                >
                  {item.label}

                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
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

                <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-56 -translate-x-1/2 border border-[#d8caa5]/65 bg-[#fffaf0] p-2 opacity-0 shadow-[0_18px_45px_rgba(88,72,38,0.16)] transition-all duration-150 group-hover:visible group-hover:mt-3 group-hover:opacity-100">
                  <div className="absolute -top-3 left-0 h-3 w-full" />

                  {item.children?.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        [
                          "block px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[#efe2bf]/70 text-[#9a7b26]"
                            : "text-[#4e593c]/82 hover:bg-[#efe2bf]/45 hover:text-[#27301d]",
                        ].join(" ")
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex w-[5.6rem] justify-center border border-[#b39135]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#27301d]/85 transition-colors hover:border-[#9a7b26]/70 hover:bg-[#efe2bf]/55 hover:text-[#27301d] sm:w-27 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          >
            {lang === "en" ? "Монгол" : "English"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#b39135]/35 text-[#27301d] transition-colors hover:border-[#9a7b26]/70 hover:bg-[#efe2bf]/55 lg:hidden"
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

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#d8caa5]/55 bg-[#fffaf0] px-5 py-5 lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.children?.length);
              const isOpen = openMobileGroup === item.label;
              const parentActive = isParentActive(pathname, item);

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      [
                        "px-1 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "text-[#9a7b26]"
                          : "text-[#4e593c]/80 hover:text-[#27301d]",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }

              return (
                <div key={item.label} className="border-b border-[#d8caa5]/35">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileGroup(isOpen ? null : item.label)
                    }
                    className={[
                      "flex w-full items-center justify-between px-1 py-3 text-left text-base font-medium transition-colors hover:text-[#27301d]",
                      parentActive ? "text-[#9a7b26]" : "text-[#4e593c]/85",
                    ].join(" ")}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>

                    <svg
                      className={[
                        "h-4 w-4 transition-transform",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
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

                  {isOpen && (
                    <div className="pb-3 pl-4">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            [
                              "block px-2 py-2 text-sm font-medium transition-colors",
                              isActive
                                ? "text-[#9a7b26]"
                                : "text-[#4e593c]/75 hover:text-[#27301d]",
                            ].join(" ")
                          }
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