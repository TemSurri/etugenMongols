"use client";

import { motion, cubicBezier } from "framer-motion";
import heroBg from "../assets/landingpage.webp";
import logo from "../assets/logo.webp";

export default function Hero() {
  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 63;

    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const textContainer = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const panelMotion = {
    hidden: { x: "100%" },
    show: {
      x: 0,
      transition: { duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
  };

  const logoMotion = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay: 0.4 },
    },
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/80" />

      <motion.div
        variants={panelMotion}
        initial="hidden"
        animate="show"
        className="hidden md:flex absolute inset-y-0 right-0 w-[35%] bg-neutral-100 items-center justify-center"
      >
        <motion.img
          variants={logoMotion}
          initial="hidden"
          animate="show"
          src={logo}
          alt="Etugen Mongols Logo"
          className="w-72 xl:w-96"
        />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
        <img
          src={logo}
          alt=""
          className="w-56 opacity-[0.12] blur-[0.3px]"
        />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_35%] w-full">
          
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="show"
            className="
              text-white
              max-w-[min(100%,42rem)]
              md:max-w-[min(100%,36rem)]
              lg:max-w-160
              md:pr-16
              lg:pr-24
            "
          >
            <motion.div
              variants={textItem}
              className="flex items-center gap-4 md:hidden mb-4"
            >
              <img src={logo} alt="" className="w-14" />
              <h2 className="text-3xl font-extrabold tracking-[0.15em] uppercase">
                Etugen Mongols
              </h2>
            </motion.div>

            <motion.h2
              variants={textItem}
              className="hidden md:block text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-[0.15em] uppercase"
            >
              Etugen Mongols
            </motion.h2>

            <motion.div
              variants={textItem}
              className="w-40 h-px bg-white/50 mt-6 mb-8"
            />

            <motion.p
              variants={textItem}
              className="text-base md:text-xl xl:text-2xl leading-relaxed text-white/90"
            >
              We host events for the Mongolian-Canadian community in Calgary.
            </motion.p>

            <motion.p
              variants={textItem}
              className="mt-3 text-sm md:text-base xl:text-lg text-white/70"
            >
              Бид Калгари хот дахь Монгол-Канадын нийгэмлэгт зориулсан арга хэмжээнүүдийг зохион байгуулдаг.
            </motion.p>

            <motion.button
              variants={textItem}
              onClick={() => scrollWithOffset("upcoming")}
              className="
                inline-flex mt-14 px-12 py-4
                text-base font-semibold uppercase tracking-widest
                text-white bg-black/40 backdrop-blur-sm
                border border-white/30
                hover:bg-black/60
                transition-all duration-300
              "
            >
              See Upcoming Events
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
