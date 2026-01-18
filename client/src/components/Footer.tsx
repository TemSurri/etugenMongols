"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollWithOffset = (id: string) => {
    const targetId =
      isDesktop && id === "about" ? "upcoming" : id;

    const el = document.getElementById(targetId);
    const headerHeight = 6;

    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div
        className="
          max-w-7xl mx-auto px-6
          py-16
          grid gap-12
          md:grid-cols-3
        "
      >
        {/* Brand */}
        <div>
          <h4 className="text-lg font-semibold tracking-[0.15em] uppercase">
            Etugen Mongols
          </h4>

          <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
            Preserve our heritage, language & traditions through cultural activities, empowering women to thrive.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-xs uppercase tracking-widest text-white/50 mb-5">
            Navigation
          </h5>

          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => scrollWithOffset("upcoming")}
                className="text-white/70 hover:text-white transition"
              >
                Events
              </button>
            </li>

            <li>
              <button
                onClick={() => scrollWithOffset("about")}
                className="text-white/70 hover:text-white transition"
              >
                About
              </button>
            </li>
            
            {!isDesktop && (
              <li>
                <button
                  onClick={() => scrollWithOffset("gallery")}
                  className="text-white/70 hover:text-white transition"
                >
                  Gallery
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Intentional spacing column */}
        <div className="hidden md:block" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/40 tracking-wide">
          © {new Date().getFullYear()} Etugen Mongols. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
