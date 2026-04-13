"use client";

import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import logo from "../../assets/logo.webp";
import { FaFacebookF } from "react-icons/fa";

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const panelMotion: Variants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      duration: 0.9,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const logoMotion: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.4 },
  },
};

const panelContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const panelItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const langButtonVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function Hero() {
  const [lang, setLang] = useState<"en" | "mn">("mn");

  const ABOUT_TEXT =
    lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";

  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 13;

    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const textRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const panelControls = useAnimation();

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

  useEffect(() => {
    panelControls.start("show");
  }, [panelControls]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/70 via-black/55 to-black/80" />

      {/* flags at the split */}
      <div className="pointer-events-none absolute top-6 inset-x-0 z-30 hidden md:block">
        <div className="absolute right-[35%] -translate-x-8">
          <img
            src="https://flagcdn.com/w160/ca.png"
            alt="Canada flag"
            className="h-12 object-contain shadow-xl ring-1 ring-white/30"
          />
        </div>

        <div className="absolute right-[35%] translate-x-32">
          <img
            src="https://flagcdn.com/w160/mn.png"
            alt="Mongolia flag"
            className="h-12 object-contain shadow-xl ring-1 ring-black/10"
          />
        </div>
      </div>

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
            Preserve our heritage, language & traditions through cultural
            activities, empowering women to thrive.
          </motion.p>

          <motion.p
            variants={textItem}
            style={{ willChange: "transform, opacity" }}
            className="mt-4 text-sm text-white/70 md:text-base xl:text-lg"
          >
            Соёлын үйл ажиллагаагаар дамжуулан өв соёл, хэл, уламжлалаа
            хадгалж, эмэгтэйчүүдийг хөгжихөд дэмжинэ.
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
        <motion.div
          variants={panelContainer}
          initial="hidden"
          animate={panelControls}
          className="flex h-full w-full flex-col items-center justify-center px-8 lg:px-10 xl:px-12"
        >
          <motion.img
            variants={logoMotion}
            src={logo}
            alt="Etugen Mongols Logo"
            className="mb-6 mt-12 w-52 lg:mt-14 lg:w-60 xl:mt-16 xl:mb-8 xl:w-72"
          />

          <div className="w-full max-w-sm">
            <motion.button
              variants={langButtonVariants}
              onClick={() => setLang((prev) => (prev === "en" ? "mn" : "en"))}
              className="
                mb-4 block ml-auto
                text-xs uppercase tracking-wide
                text-black/50 hover:text-black transition
              "
            >
              {lang === "en" ? "Монгол" : "English"}
            </motion.button>

            <motion.div variants={panelItem} layout>
              <h3 className="text-sm uppercase tracking-widest text-black/50">
                About Us
              </h3>

              <div className="mt-3 h-0.5 w-14 bg-black" />

              <p className="mt-4 min-h-[132px] text-sm leading-[1.75] text-black/70">
                {ABOUT_TEXT}
              </p>
            </motion.div>

            <motion.div variants={panelItem} className="mt-6" layout>
              <div className="mb-4 h-px w-full bg-black/10" />

              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-black/50">
                Contact Us
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="mailto:calgarymongolians@gmail.com"
                  className="
                    inline-flex items-center
                    text-xs
                    px-4 py-2
                    border border-black/30
                    text-black/70
                    hover:border-black
                    transition
                  "
                >
                  Email · calgarymongolians@gmail.com
                </a>
              </div>

              <div className="mt-5 h-px w-full bg-black/10" />
            </motion.div>

            <motion.div variants={panelItem} className="mt-5 text-center" layout>
              <p className="text-sm uppercase tracking-widest text-black/60">
                Connect with us
              </p>

              <div className="mt-4 flex justify-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61584273744310"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="
                    flex h-7 w-10 items-center justify-center
                    rounded-full
                    border border-black/30
                    text-black
                    hover:scale-105
                    hover:border-black
                    transition
                  "
                >
                  <FaFacebookF className="text-sm" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
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