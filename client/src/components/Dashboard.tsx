
// TEMPORARY VIEW

"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import landingImage from "../assets/landingpage.webp";

export default function Dashboard() {
  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="w-full min-h-screen text-black"
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full bg-white/90 backdrop-blur-sm border-t border-[#D4AF37]/40 border-b border-gray-200 px-4 py-[16px] flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
          Welcome
        </h1>

        <div className="flex gap-2">
          <Link
            to="/login"
            className="px-3 py-1 text-xs font-semibold uppercase bg-black text-white rounded-full hover:bg-[#D4AF37] hover:text-black transition"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="px-3 py-1 text-xs font-semibold uppercase border border-black rounded-full hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-center bg-white/90 backdrop-blur-sm border-[#D4AF37]/30 border-b">
        
        <div className="flex-1 py-[24px]">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-black">
            Programs
          </h2>

          <Link
            to="/programs"
            className="
              inline-block mt-3 px-4 py-1.5
              text-xs sm:text-sm font-semibold uppercase tracking-wide
              border border-black text-black rounded-full
              hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]
              transition
            "
          >
            View Programs →
          </Link>
        </div>

        <div className="flex-1 py-[24px]">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-black">
            User Account
          </h2>

          <Link
            to="/account"
            className="
              inline-block mt-3 px-4 py-1.5
              text-xs sm:text-sm font-semibold uppercase tracking-wide
              border border-black text-black rounded-full
              hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]
              transition
            "
          >
            Manage Account →
          </Link>
        </div>
      </div>

      <div className="w-full bg-white/90 backdrop-blur-sm border-t border-[#D4AF37]/40 flex items-center justify-center py-[16px]">
        <motion.button
          onClick={scrollToAbout}
          className="
            px-8 py-[8px]
            text-3xl font-bold leading-none
            text-white bg-black/40 border border-white/30 rounded-md
            hover:bg-black/60 hover:border-[#293305]
            transition duration-300
          "
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          aria-label="Scroll Down"
        >
          ↓
        </motion.button>
      </div>
    </section>
  );
}
