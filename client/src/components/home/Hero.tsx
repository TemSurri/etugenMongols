"use client";

import { useState, useEffect, useRef } from "react";
import { motion, cubicBezier, useAnimation, useInView } from "framer-motion";
import heroBg from "../../assets/landingpage.webp";
import logo from "../../assets/logo.webp";

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
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

export default function Hero() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 13;

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const textRef = useRef(null);
  const controls = useAnimation();

  const isInView = useInView(textRef, {
    amount: 0.25,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/70 via-black/55 to-black/80" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 md:pr-[35%] flex items-center">
        <motion.div
          ref={textRef}
          variants={textContainer}
          initial="hidden"
          animate={controls}
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
            style={{ willChange: "transform, opacity" }}
            className="flex items-center gap-4 md:hidden mb-6"
          >
            <img src={logo} alt="" className="w-14" />
            <h2 className="text-3xl font-extrabold tracking-[0.15em] uppercase">
              Etugen Mongols
            </h2>
          </motion.div>

          <motion.h2
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="hidden md:block text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-[0.15em] uppercase"
          >
            Etugen Mongols
          </motion.h2>

          <motion.div
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="w-40 h-px bg-white/50 mt-7 mb-7"
          />

          <motion.p
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="text-base md:text-xl xl:text-2xl leading-relaxed text-white/90"
          >
            We host events for the Mongolian-Canadian community in Calgary.
          </motion.p>

          <motion.p
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="mt-4 text-sm md:text-base xl:text-lg text-white/70"
          >
            Бид Калгари хот дахь Монгол-Канадын нийгэмлэгт зориулсан арга
            хэмжээнүүдийг зохион байгуулдаг.
          </motion.p>

          <motion.div
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="mt-16"
          >
            <button
              onClick={() => scrollWithOffset("upcoming")}
              className="
                inline-flex px-12 py-4
                text-base font-semibold uppercase tracking-widest
                text-white bg-black/40
                border border-white/30

                transition-all duration-300 ease-out

              hover:-translate-y-0.5 hover:shadow-lg
              "
            >
              See Upcoming Events
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={panelMotion}
        initial="hidden"
        animate="show"
        className="
          hidden md:flex
          absolute inset-y-0 right-0
          w-[35%]
          bg-neutral-100
          z-20
        "
      >
        <div className="w-full h-full flex flex-col items-center pt-20 px-12">
          <motion.img
            variants={logoMotion}
            initial="hidden"
            animate="show"
            src={logo}
            alt="Etugen Mongols Logo"
            className="w-64 xl:w-72 mb-12"
          />

          <div className="w-full max-w-sm space-y-6">
            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-neutral-600 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full px-4 py-3
                  bg-white
                  border border-neutral-300
                  text-neutral-900
                  placeholder:text-neutral-400
                  focus:outline-none
                  focus:border-neutral-900
                  focus:ring-2 focus:ring-neutral-900/20
                  transition
                "
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold tracking-widest text-neutral-600 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full px-4 py-3
                  bg-white
                  border border-neutral-300
                  text-neutral-900
                  placeholder:text-neutral-400
                  focus:outline-none
                  focus:border-neutral-900
                  focus:ring-2 focus:ring-neutral-900/20
                  transition
                "
              />
            </div>

            <button
              type="button"
              className="
                w-full pt-3 pb-3
                mt-2
                text-sm font-semibold tracking-widest uppercase
                text-white
                bg-neutral-900
                hover:bg-neutral-800
                focus:outline-none
                focus:ring-2 focus:ring-neutral-900/30
                transition
              "
            >
              Log In
            </button>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
        <img
          src={logo}
          alt=""
          className="w-56 opacity-[0.12] blur-[0.3px]"
        />
      </div>
    </section>
  );
}