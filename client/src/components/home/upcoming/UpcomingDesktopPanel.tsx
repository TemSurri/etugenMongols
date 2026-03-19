"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaFacebookF } from "react-icons/fa";

const CONTACT_EMAIL = "calgarymongolians@gmail.com";

type UpcomingDesktopPanelProps = {
  panelMotion: Variants;
  lang: "en" | "mn";
  setLang: React.Dispatch<React.SetStateAction<"en" | "mn">>;
  ABOUT_TEXT: string;
  scrollToGallery: () => void;
  heroBg: string;
  logo: string;
};

export default function UpcomingDesktopPanel({
  panelMotion,
  lang,
  setLang,
  ABOUT_TEXT,
  scrollToGallery,
  heroBg,
  logo,
}: UpcomingDesktopPanelProps) {
  return (
    <motion.div
      variants={panelMotion}
      initial="hidden"
      animate="show"
      className="
        hidden md:block
        absolute inset-y-0 right-0
        w-[35%]
        bg-neutral-100
        pointer-events-none
        z-20
      "
    >
      <div
        className="
          h-full
          px-6 lg:px-10 xl:px-12
          pt-16 lg:pt-20 xl:pt-24
          pb-10 lg:pb-14 xl:pb-16
          pointer-events-auto
          overflow-y-auto
          flex flex-col
        "
      >
        <div className="relative max-w-sm">
          <button
            onClick={() => setLang(lang === "en" ? "mn" : "en")}
            className="absolute right-0 -top-8 text-xs uppercase tracking-wide text-black/50 hover:text-black transition"
          >
            {lang === "en" ? "Монгол" : "English"}
          </button>

          <img src={logo} alt="" className="w-20 mb-6 opacity-90" />

          <h3 className="text-sm uppercase tracking-widest text-black/50">
            About Us
          </h3>

          <div className="mt-4 h-0.5 w-14 bg-black" />

          <div className="mt-6 min-h-[140px]">
            <p className="text-sm leading-relaxed text-black/75">{ABOUT_TEXT}</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="h-28 overflow-hidden bg-black/10">
              <img src={heroBg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="h-28 overflow-hidden bg-black/10">
              <img src={heroBg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 h-36 overflow-hidden bg-black/10">
              <img src={heroBg} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-sm">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
            Our Work
          </p>

          <p className="text-sm leading-relaxed text-black/70 mb-4">
            See what we do as an organization.
          </p>

          <button
            onClick={scrollToGallery}
            className="
              inline-flex
              text-xs
              px-4 py-2
              border border-black/30
              text-black/70
              hover:border-black
              transition
            "
          >
            View Event Gallery
          </button>
        </div>

        <div className="h-px w-full bg-black/10 mt-5" />
        <div className="mt-5 max-w-sm">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
            Donate Notice
          </p>

          <p className="text-sm leading-relaxed text-black/70">
            Donation support details will be available here soon. Your support helps us continue organizing cultural programs, events, and community gatherings.
          </p>
        </div>

        <div className="mt-5 max-w-sm">
          <div className="h-px w-full bg-black/10 mb-4" />

          <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
            Contact Us
          </p>

          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="
                inline-flex items-center
                text-xs
                px-4 py-2
                border border-black/30
                text-black/70
                hover:border-black
                transition
              "
            >
              Email · {CONTACT_EMAIL}
            </a>
          </div>
          <div className="h-px w-full bg-black/10 mt-5" />
        </div>

        <div className="mt-auto pt-2 max-w-sm text-center">
          <p className="text-sm uppercase tracking-widest text-black/60">
            Connect with us
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://www.facebook.com/profile.php?id=61584273744310"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-7
                flex items-center justify-center
                rounded-full
                border border-black/30
                text-black
                hover:border-black
                hover:scale-105
                transition
              "
            >
              <FaFacebookF className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}