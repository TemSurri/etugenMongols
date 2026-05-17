"use client";

import { memo } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.webp";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d8caa5]/55 bg-[#fffaf0] text-[#27301d]">
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col gap-3
          px-6 py-5
          sm:flex-row sm:items-center sm:justify-between
          md:px-10 lg:px-12
        "
      >
        <Link
          to="/"
          aria-label="Go to homepage"
          className="
            group flex w-fit items-center gap-3
            transition-opacity hover:opacity-85
          "
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8caa5]/70 bg-white/55 shadow-[0_8px_22px_rgba(88,72,38,0.08)]">
            <img
              src={logo}
              alt="Etugen Mongols logo"
              loading="lazy"
              decoding="async"
              className="h-8 w-8 object-contain"
            />
          </span>

          <span className="text-sm font-semibold tracking-[0.12em]">
            Etugen Mongols
          </span>
        </Link>

        <p className="text-xs tracking-wide text-[#4e593c]/60 sm:text-right">
          © {currentYear} Etugen Mongols. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default memo(Footer);