"use client";

import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.webp";

export default function Header() {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsTop(currentY < 100);

      if (currentY > lastScrollY.current && currentY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 63;

    if (el) {
      const extraOffset = id === "contact" || id === "about" ? 13 : 0;
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        (headerHeight + extraOffset);
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 w-full z-50 px-8 py-4
        transition-all duration-300 ease-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${isTop ? "bg-transparent text-white" : "bg-black/70 text-white"}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        
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

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="md:hidden flex flex-col text-center gap-6 text-lg px-6 py-6 bg-black/80 border-t border-white/10 mt-4">
            <button onClick={() => scrollWithOffset("upcoming")} className="hover:text-blue-400 transition">Events</button>
            <button onClick={() => scrollWithOffset("about")} className="hover:text-blue-400 transition">About</button>
            <button onClick={() => scrollWithOffset("gallery")} className="hover:text-blue-400 transition">Gallery</button>
            <button onClick={() => scrollWithOffset("contact")} className="hover:text-blue-400 transition">Contact</button>
          </div>
          <div
            className="
              hidden md:block
              absolute right-8 top-full mt-4
              w-48
              bg-white
              text-black
              rounded-xl
              shadow-lg
              py-4
            "
          >
            <button onClick={() => scrollWithOffset("upcoming")} className="block w-full px-6 py-2 hover:bg-black/5 transition text-left">Events</button>
            <button onClick={() => scrollWithOffset("about")} className="block w-full px-6 py-2 hover:bg-black/5 transition text-left">About</button>
            <button onClick={() => scrollWithOffset("gallery")} className="block w-full px-6 py-2 hover:bg-black/5 transition text-left">Gallery</button>
            <button onClick={() => scrollWithOffset("contact")} className="block w-full px-6 py-2 hover:bg-black/5 transition text-left">Contact</button>
          </div>
        </>
      )}
    </header>
  );
}
