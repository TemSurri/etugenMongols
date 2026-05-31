"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

import logo from "../../assets/logo.webp";

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

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d8caa5]/55 bg-[#fffaf0] text-[#27301d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-12">
        <Link
          to="/"
          aria-label="Go to homepage"
          className="group flex w-fit items-center gap-3 transition-opacity hover:opacity-85"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8caa5]/70 bg-white/60 shadow-[0_8px_22px_rgba(88,72,38,0.08)]">
            <img
              src={logo}
              alt="Etugen Mongols logo"
              loading="lazy"
              decoding="async"
              className="h-8 w-8 object-contain"
            />
          </span>

          <span>
            <span className="block text-sm font-semibold tracking-[0.12em]">
              Etugen Mongols
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-[#9a7b26]">
              Strengthening the mongolian calgary community
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:justify-end">
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8caa5]/70 bg-white/55 text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-xs tracking-wide text-[#4e593c]/60 sm:text-right">
            © {currentYear} Etugen Mongols.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);