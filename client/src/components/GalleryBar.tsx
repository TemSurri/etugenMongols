"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import heroBg from "../assets/landingpage.webp";
import { events, getCardInfos } from "../static_gallery";

const eventItems = getCardInfos(events);

// motion and animation variants

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* cool dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/70 to-black/90" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={fadeUp} className="mb-10">
          <h3 className="text-white text-2xl md:text-3xl font-medium tracking-wide">
            Gallery
          </h3>
          <div className="mt-3 h-0.5 w-14 bg-white/70" />
        </motion.div>

        {/* mobile index */}
        <motion.div
          variants={fadeUp}
          className="md:hidden bg-white px-6 py-6 mb-12"
        >
          <span className="block text-xs uppercase tracking-widest text-black/50 mb-4">
            Index
          </span>

          <div className="flex flex-col gap-3">
            {eventItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="
                  text-sm text-black/75
                  hover:text-black
                  transition
                  leading-snug
                "
              >
                {item.title}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="relative flex gap-12">

          {/* index */}
          <motion.div
            variants={fadeUp}
            className="hidden md:flex bg-white px-6 py-8 flex-col gap-5 shrink-0"
          >
            <span className="text-xs uppercase tracking-widest text-black/50 mb-2">
              Index
            </span>

            {eventItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="
                  text-sm text-black/70
                  hover:text-black
                  transition
                  leading-snug
                  max-w-40
                "
              >
                {item.title}
              </a>
            ))}
          </motion.div>

          <motion.div
            variants={container}
            className="
              flex gap-16
              overflow-x-auto
              scrollbar-none
              pb-20
            "
          >
            {eventItems.map((item, i) => {
              const sizeClass =
                i % 3 === 0
                  ? "w-[340px] h-[260px]"
                  : i % 3 === 1
                  ? "w-[280px] h-[340px]"
                  : "w-[300px] h-[240px]";

              return (
                <motion.a
                  key={i}
                  href={item.link}
                  variants={fadeUp}
                  className="shrink-0 group"
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`
                        relative overflow-hidden
                        ${sizeClass}
                        border border-white/15
                        shadow-[0_18px_50px_rgba(0,0,0,0.55)]
                      `}
                    >
                      <img
                        src={`/gallery/${item.id}/albumphotos/1.png`}
                        alt={item.title}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-105
                        "
                      />
                    </div>

                    <div className="max-w-[280px]">
                      <h4 className="text-sm font-medium text-white/90">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
