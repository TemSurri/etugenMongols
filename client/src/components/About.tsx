"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import landingImage from "../assets/landingpage.webp";

const reveal = {
  hidden: { y: 40, scale: 0.98 },
  show: {
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut }
  }
};

function AnimateOnView({ children }: { children: React.ReactNode }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    controls.start(inView ? "show" : "hidden");
  }, [inView, controls]);

  return (
    <motion.div ref={ref} variants={reveal} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}

export default function About({ orgName = "About Us" }) {
  const [lang, setLang] = useState<"en" | "mn">("mn");

  const TXT = {
    title: lang === "en" ? orgName : "Бидний тухай",
    intro:
      lang === "en"
        ? "A Mongolian cultural organization dedicated to preserving heritage, uniting communities, and celebrating the spirit of Mongolia here in Calgary."
        : "Калгари хотноо монгол өв соёлыг хадгалж, олон нийтийг нэгтгэн, Монголын үзэл санааг түгээн дэлгэрүүлэхэд зориулагдсан соёлын байгууллага юм.",
    purpose: lang === "en" ? "Our Purpose & Initiatives" : "Бидний зорилго ба үйл ажиллагаа",
    purposeText:
      lang === "en"
        ? "We connect Mongolian and Canadian communities through cultural, educational, and community-driven initiatives that inspire pride, preserve identity, and build meaningful relationships."
        : "Бид Монгол, Канадын иргэдийг соёлын, боловсролын болон хамтын ажиллагааны хүрээнд холбон өв соёлоо түгээж, утга учиртай харилцааг дэмждэг.",
    serve: lang === "en" ? "Who We Serve" : "Хэнийг дэмждэг вэ",
    serveText:
      lang === "en"
        ? "We welcome Mongolian-Canadians, friends of Mongolia, and anyone who values cultural connection and shared heritage."
        : "Бид Монгол-Канадын иргэд болон Монгол соёлыг сонирхогч бүх хүнд нээлттэй.",
    events: lang === "en" ? "Explore Our Past Events" : "Өмнөх арга хэмжээнүүд",
    eventsText:
      lang === "en"
        ? "Scroll below to explore a gallery of past events. Each event card opens to reveal photos, stories, and more."
        : "Доорх хэсэгт байрлах арга хэмжээний карт дээр дарж зураг болон дэлгэрэнгүй мэдээллийг үзнэ үү."
  };

  return (
    <section
      id="about"
      className="relative bg-cover bg-center bg-fixed text-black py-24 sm:py-32"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <div className="space-y-32 sm:space-y-40">

        <AnimateOnView>
          <div className="relative px-4 py-16 text-center bg-white/60 border-y border-[#D4AF37]/40 rounded-md shadow-md">
            <button
              onClick={() => setLang(lang === "en" ? "mn" : "en")}
              className="absolute right-4 top-4 px-3 py-1.5 text-sm font-semibold uppercase bg-black text-white hover:bg-[#D4AF37] hover:text-black rounded transition"
            >
              {lang === "en" ? "Монгол" : "English"}
            </button>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              {TXT.title}
            </h1>

            <div className="h-[3px] bg-[#D4AF37] w-20 mx-auto mt-6 mb-8" />

            <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              {TXT.intro}
            </p>
          </div>
        </AnimateOnView>

        <AnimateOnView>
          <div className="py-16 bg-white/60 border-y border-[#D4AF37]/40 text-center px-6 rounded-md shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase">{TXT.purpose}</h2>
            <p className="text-gray-700 max-w-4xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
              {TXT.purposeText}
            </p>
          </div>
        </AnimateOnView>

        <AnimateOnView>
          <div className="py-16 bg-white/60 border-y border-[#D4AF37]/40 text-center px-6 rounded-md shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase">{TXT.serve}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
              {TXT.serveText}
            </p>
          </div>
        </AnimateOnView>

        <AnimateOnView>
          <div className="py-16 bg-white/60 border-y border-[#D4AF37]/40 text-center px-6 rounded-md shadow-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase">{TXT.events}</h2>
            <p className="text-gray-700 max-w-4xl mx-auto mt-6 text-base sm:text-lg leading-relaxed">
              {TXT.eventsText}
            </p>
          </div>
        </AnimateOnView>

      </div>
    </section>
  );
}
