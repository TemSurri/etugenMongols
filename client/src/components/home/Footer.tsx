"use client";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold tracking-[0.15em] uppercase">
            Etugen Mongols
          </h4>

          <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
            Preserve our heritage, language & traditions through cultural activities, empowering women to thrive.
          </p>
        </div>

        <div>
          <h5 className="text-xs uppercase tracking-widest text-white/50 mb-5">
            Navigation
          </h5>

          <ul className="space-y-3 text-sm">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("upcoming")}
                className="text-white/70 hover:text-white transition"
              >
                Events
              </button>
            </li>

            {/* Mobile About */}
            <li className="md:hidden">
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="text-white/70 hover:text-white transition"
              >
                About
              </button>
            </li>

            {/* Desktop About */}
            <li className="hidden md:block">
              <button
                type="button"
                onClick={() => scrollToSection("upcoming")}
                className="text-white/70 hover:text-white transition"
              >
                About
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("gallery")}
                className="text-white/70 hover:text-white transition"
              >
                Gallery
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden md:block" />
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/40 tracking-wide">
          © {new Date().getFullYear()} Etugen Mongols. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
