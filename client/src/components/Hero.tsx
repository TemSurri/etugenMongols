"use client";
import heroBg from "../assets/landingpage.webp";

export default function Hero() {
  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 63; 

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[90vh] w-full flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-center text-white px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">
          Etugen Mongols
        </h2>
        
        <div className="w-60 h-0.5 bg-white/60 mx-auto mt-4 mb-6 rounded-full"></div>

        <p className="text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Celebrating the spirit, history, and culture of the Mongol people here in Calgary.
        </p>

        <button
          onClick={() => scrollWithOffset("upcoming")}
          className="
            inline-block mt-10 px-10 py-4
            text-lg font-semibold uppercase tracking-wide
            text-white
            bg-black/40 backdrop-blur-sm
            border border-white/30
            hover:bg-black/60 hover:border-[#293305]
            transition duration-300
          "
        >
          Learn More
        </button>
      </div>
    </section>
  );
}
