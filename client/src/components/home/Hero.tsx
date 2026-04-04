"use client";

import { useState, useEffect, useRef } from "react";
import { motion, cubicBezier, useAnimation, useInView } from "framer-motion";
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
    amount: 0.1,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/70 via-black/55 to-black/80" />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto flex items-center px-6 md:px-10 md:pr-[35%]">
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
            className="mb-6 flex items-center gap-4 md:hidden"
          >
            <img src={logo} alt="" className="w-14" />
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.15em]">
              Etugen Mongols
            </h2>
          </motion.div>

          <motion.h2
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="hidden text-4xl font-extrabold uppercase tracking-[0.15em] md:block md:text-6xl xl:text-7xl"
          >
            Etugen Mongols
          </motion.h2>

          <motion.div
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="mt-7 mb-7 h-px w-40 bg-white/50"
          />

          <motion.p
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="text-base leading-relaxed text-white/90 md:text-xl xl:text-2xl"
          >
            We host events for the Mongolian-Canadian community in Calgary.
          </motion.p>

          <motion.p
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="mt-4 text-sm text-white/70 md:text-base xl:text-lg"
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
          absolute inset-y-0 right-0 z-20 hidden
          w-[35%] bg-neutral-100 md:flex
        "
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-8 lg:px-10 xl:px-12">
          <motion.img
            variants={logoMotion}
            initial="hidden"
            animate="show"
            src={logo}
            alt="Etugen Mongols Logo"
            className="mb-8 w-52 lg:w-60 xl:mb-10 xl:w-72"
          />

          <div className="w-full max-w-sm space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full min-h-[3.1rem] px-4
                  text-sm lg:text-[15px]
                  bg-white
                  border border-neutral-300
                  text-neutral-900
                  placeholder:text-neutral-400
                  rounded-none
                  shadow-sm
                  focus:outline-none
                  focus:border-neutral-900
                  focus:ring-2 focus:ring-neutral-900/15
                  transition
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full min-h-[3.1rem] px-4
                  text-sm lg:text-[15px]
                  bg-white
                  border border-neutral-300
                  text-neutral-900
                  placeholder:text-neutral-400
                  rounded-none
                  shadow-sm
                  focus:outline-none
                  focus:border-neutral-900
                  focus:ring-2 focus:ring-neutral-900/15
                  transition
                "
              />
            </div>

            <button
              type="button"
              className="
                mt-2 inline-flex min-h-[3.15rem] w-full
                items-center justify-center
                whitespace-nowrap rounded-none
                bg-neutral-900 px-4
                text-sm font-semibold uppercase tracking-[0.16em]
                text-white shadow-sm
                transition
                hover:bg-neutral-800
                focus:outline-none
                focus:ring-2 focus:ring-neutral-900/25
              "
            >
              Log In
            </button>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:hidden">
        <img
          src={logo}
          alt=""
          className="w-56 opacity-[0.12] blur-[0.3px]"
        />
      </div>
    </section>
  );
}