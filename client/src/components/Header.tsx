"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 100);
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
  };

  return (
    <header
      className={`px-8 py-4 fixed w-full z-50 backdrop-blur transition-colors duration-300
      ${isTop ? "bg-transparent" : "bg-black/70 text-white"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:opacity-90 transition"
        >
          <h1 className="text-2xl font-bold tracking-wide">
            Etugen Mongols
          </h1>
        </button>

        <nav className="hidden md:flex gap-6 text-lg">
          <button onClick={() => scrollWithOffset("upcoming")} className="hover:text-blue-400">Events</button>
          <button onClick={() => scrollWithOffset("about")} className="hover:text-blue-400">About</button>
          <button onClick={() => scrollWithOffset("gallery")} className="hover:text-blue-400">Gallery</button>
          <button onClick={() => scrollWithOffset("contact")} className="hover:text-blue-400">Contact</button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col text-center gap-6 text-lg px-6 py-6 bg-black/80 backdrop-blur border-t border-white/10 mt-4">
          <button onClick={() => { scrollWithOffset("upcoming"); setMenuOpen(false); }} className="hover:text-blue-400 transition">Events</button>
          <button onClick={() => { scrollWithOffset("about"); setMenuOpen(false); }} className="hover:text-blue-400 transition">About</button>
          <button onClick={() => { scrollWithOffset("gallery"); setMenuOpen(false); }} className="hover:text-blue-400 transition">Gallery</button>
          <button onClick={() => { scrollWithOffset("contact"); setMenuOpen(false); }} className="hover:text-blue-400 transition">Contact</button>
        </div>
      )}
    </header>
  );
}
