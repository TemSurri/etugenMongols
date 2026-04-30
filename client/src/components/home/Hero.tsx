"use client";

import { useEffect, useRef } from "react";
import { motion, cubicBezier, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import logo from "../../assets/logo.webp";
import canadaFlag from "../../assets/canada-flag.webp";
import mongoliaFlag from "../../assets/mongolia-flag.webp";
import { FaFacebookF } from "react-icons/fa";

// Animation Variants
// all configuration for the animation are set within these objects

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
    transition: { duration: 0.35 },
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

type Lang = "en" | "mn";

type HeroProps = {
  lang: Lang;
};

export default function Hero({ lang }: HeroProps) {
  const ABOUT_TEXT =
    lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";

  const ABOUT_TITLE = lang === "en" ? "About Us" : "Бидний тухай";
  const CONTACT_TITLE = lang === "en" ? "Contact Us" : "Холбоо барих";
  const CONNECT_TITLE = lang === "en" ? "Connect with us" : "Бидэнтэй холбогдох";
  const EMAIL_LABEL = lang === "en" ? "Email" : "Имэйл";
  const EVENT_BUTTON_TEXT =
    "See Upcoming Events";

  const scrollWithOffset = (id: string) => {
    const el = document.getElementById(id);
    const headerHeight = 13;

    if (el) {
      const y =
        el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const textRef = useRef<HTMLDivElement | null>(null);
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
      {/* The main section of the component, which includes the bg image, overlay, and content. */}
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/70 via-black/55 to-black/80" />

      {/* Flags on the right side for larger screens, hidden on mobile */}
      <div className="pointer-events-none absolute top-6 inset-x-0 z-30 hidden md:block">
        <div className="absolute right-[35%] -translate-x-8">
          <img
            src={canadaFlag}
            alt="Canada flag"
            className="h-12 object-contain shadow-xl"
          />
        </div>

        <div className="absolute right-[35%] translate-x-32">
          <img
            src={mongoliaFlag}
            alt="Mongolia flag"
            className="h-12 object-contain shadow-xl"
          />
        </div>
      </div>

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto flex items-center px-6 md:px-10 md:pr-[35%]">
        {/* The content wrapper, which contains the text and the sliding panel on larger screens */}
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
          {/* The main heading, subheading, and button. */}
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
            className="mt-4 text-base text-white/70 md:text-lg xl:text-xl"
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
              {EVENT_BUTTON_TEXT}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* The sliding panel that appears on larger screens, contains about and contact. */}
      <motion.div
        variants={panelMotion}
        initial="hidden"
        animate="show"
        className="
          absolute inset-y-0 right-0 z-20 hidden
          w-[35%] bg-neutral-100 md:flex
        "
      >
        <div className="flex h-full w-full items-center justify-center px-8 lg:px-10 xl:px-12">
          <div className="flex w-full max-w-sm flex-col justify-center py-10">
            <img
              src={logo}
              alt="Etugen Mongols Logo"
              className="mb-6 w-52 self-center lg:w-60 xl:mb-8 xl:w-72"
            />

            <div>
              <h3
                className={`text-sm uppercase text-black/50 ${
                  lang === "en" ? "tracking-widest" : "tracking-wide"
                }`}
              >
                {ABOUT_TITLE}
              </h3>

              <div className="mt-2 h-0.5 w-14 bg-black" />

              <p className="mt-4 min-h-[8.25rem] lg:min-h-[7.75rem] xl:min-h-[7rem] text-sm leading-[1.75] text-black/70">
                {ABOUT_TEXT}
              </p>
            </div>

            <div className="mt-5">
              <div className="mb-3 h-px w-full bg-black/10" />

              <p
                className={`mb-2 text-[11px] uppercase text-black/50 ${
                  lang === "en" ? "tracking-[0.25em]" : "tracking-wide"
                }`}
              >
                {CONTACT_TITLE}
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
                  {EMAIL_LABEL} · calgarymongolians@gmail.com
                </a>
              </div>

              <div className="mt-4 h-px w-full bg-black/10" />
            </div>

            <div className="mt-4 text-center">
              <p
                className={`text-sm uppercase text-black/60 ${
                  lang === "en" ? "tracking-widest" : "tracking-wide"
                }`}
              >
                {CONNECT_TITLE}
              </p>

              <div className="mt-3 flex justify-center">
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
            </div>
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