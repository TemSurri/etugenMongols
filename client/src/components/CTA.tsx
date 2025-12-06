"use client";

import { motion } from "framer-motion";
import heroBg from "../assets/landingpage.webp";
import { FaFacebook, FaEnvelope } from "react-icons/fa";

export default function CTA() {
  const container = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, staggerChildren: 0.2 } },
  };

  const fadeChild = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contact"
      className="relative py-32 text-center text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }}
        variants={container}
        className="relative px-6 max-w-3xl mx-auto"
      >
        <motion.h3
          variants={fadeChild}
          className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase"
        >
          Have Questions or Ideas?
        </motion.h3>

        <motion.div
          variants={fadeChild}
          className="w-48 h-0.5 bg-white/60 mx-auto mt-4 mb-6 rounded-full"
        />

        <motion.p
          variants={fadeChild}
          className="text-sm md:text-lg leading-relaxed opacity-90 mb-10"
        >
          Whether you want to collaborate, volunteer, suggest an event, or simply learn more,
          we'd love to hear from you.
        </motion.p>

        <div className="space-y-6">
          <motion.a
            variants={fadeChild}
            href="mailto:info@etugenmongols.ca"
            className="
              flex items-center justify-center gap-3
              px-8 sm:px-10 py-3 sm:py-4
              text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide
              whitespace-nowrap overflow-hidden text-ellipsis max-w-full
              text-white bg-black/40 backdrop-blur-sm
              border border-white/30
              hover:bg-black/60 hover:border-[#293305]
              transition duration-300
              w-full md:w-auto
            "
          >
            <FaEnvelope size={18} className="shrink-0" />
            <span className="truncate">info@etugenmongols.ca</span>
          </motion.a>

          <motion.a
            variants={fadeChild}
            href="https://www.facebook.com/profile.php?id=61584273744310"
            target="_blank"
            className="
              flex items-center justify-center gap-3
              px-8 sm:px-10 py-3 sm:py-4
              text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide
              whitespace-nowrap overflow-hidden text-ellipsis max-w-full
              text-white bg-black/40 backdrop-blur-sm
              border border-white/30
              hover:bg-black/60 hover:border-[#293305]
              transition duration-300
              w-full md:w-auto
            "
          >
            <FaFacebook size={20} className="shrink-0" />
            <span className="truncate">Etugen Mongols</span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

