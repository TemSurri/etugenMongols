"use client";

export default function Footer() {
  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 63; 

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left grid md:grid-cols-3 gap-10">

        
        <div>
          <h4 className="text-lg font-semibold tracking-wide uppercase mb-3">
            Etügen Mongols
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Preserving Mongolian heritage, culture, and community for future generations in Canada.
          </p>
        </div>

      
        <div>
          <h5 className="text-sm font-semibold uppercase text-gray-300 mb-3">
            Quick Links
          </h5>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => scrollWithOffset("about")}
                className="hover:text-blue-400 transition"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollWithOffset("upcoming")}
                className="hover:text-blue-400 transition"
              >
                Events
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollWithOffset("gallery")}
                className="hover:text-blue-400 transition"
              >
                Gallery
              </button>
            </li>
          </ul>
        </div>

       
        <div>
          <h5 className="text-sm font-semibold uppercase text-gray-300 mb-3">
            Legal
          </h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Accessibility</a></li>
          </ul>
        </div>
      </div>


      <div className="text-center text-xs text-gray-500 mt-10 pt-4 border-t border-white/10">
        &copy; {new Date().getFullYear()} Etügen Mongols. All rights reserved.
      </div>
    </footer>
  );
}
