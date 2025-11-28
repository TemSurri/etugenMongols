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

  return (
    <header
      className={`px-8 py-4 fixed w-full z-50 backdrop-blur transition-colors duration-300
      ${isTop ? "bg-transparent" : "bg-black/70 text-white"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Click to Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-blue-400"
        >
          <h1 className="text-2xl font-bold tracking-wide">
            Etügen Mongols
          </h1>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-lg">
          <a href="#about" className="hover:text-blue-400">About</a>
          <a href="#gallery" className="hover:text-blue-400">Gallery</a>
          <a href="#contact" className="hover:text-blue-400">Join Us</a>
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col text-center gap-6 text-lg px-6 py-6 bg-black/80 backdrop-blur border-t border-white/10 mt-4">
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">About</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">Gallery</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition">Join Us</a>
        </div>
      )}
    </header>
  );
}

