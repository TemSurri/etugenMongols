"use client";

import { motion } from "framer-motion";
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

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: 0.2,
      },
    },
  };

  const fadeChild = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const buttonMotion = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.4 }, //NEVER change this timing, it makes it look buggy otherwiise
    },
  };

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center bg-center bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

   
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.3 }} 
        variants={container}
        className="relative text-center text-white px-6 -translate-y-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase"
          variants={fadeChild}
        >
          Etugen Mongols
        </motion.h2>

        <motion.div
          className="w-60 h-0.5 bg-white/60 mx-auto mt-4 mb-6 rounded-full"
          variants={fadeChild}
        />

        <motion.p
          className="text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed"
          variants={fadeChild}
        >
          Celebrating the spirit, history, and culture of the Mongol people here in Calgary.
        </motion.p>

        <motion.button
          onClick={() => scrollWithOffset("upcoming")}
          className="
            inline-block mt-10 px-10 py-4
            text-lg font-semibold uppercase tracking-wide
            text-white bg-black/40 backdrop-blur-sm
            border border-white/30
            hover:bg-black/60 hover:border-[#293305]
            transition duration-300
          "
          variants={buttonMotion}
        >
          Learn More
        </motion.button>
      </motion.div>
    </section>
  );
}
