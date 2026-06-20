"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584273744310",
    Icon: FaFacebookF,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MrBeast",
    Icon: FaYoutube,
  },
] as const;

const FOOTER_LINKS = [
  { label: "Events", to: "/events" },
  { label: "Our Story", to: "/about/story" },
  { label: "Team", to: "/about/team" },
  { label: "Impact", to: "/about/impact" },
  { label: "Contact", to: "/contact" },
] as const;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#efe7d4] bg-white text-[#27301d]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <Link
            to="/"
            aria-label="Go to homepage"
            className="flex w-fit items-center gap-4 no-underline transition-opacity hover:opacity-90"
          >
            <img
              src="/logo.webp"
              alt="Etugen Mongols logo"
              loading="lazy"
              decoding="async"
              className="h-16 w-16 object-contain"
            />

            <div>
              <p className="text-lg font-semibold tracking-wide text-[#27301d]">
                Etugen Mongols
              </p>
              <p className="mt-2 max-w-md text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b26]">
                Your roots are your wings
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-5 md:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end"
            >
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#27301d]/70 no-underline transition-colors hover:text-[#9a7b26]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:justify-end">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-[#e6dcc3] bg-[#fffaf0] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#efe7d4] pt-5 text-xs font-medium text-[#667056] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Etugen Mongols. All rights reserved.</p>
          <p>Calgary-based Mongolian non-profit organization.</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);