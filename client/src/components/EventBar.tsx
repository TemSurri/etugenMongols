"use client";



import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaFacebookF } from "react-icons/fa";
import heroBg from "../assets/landingpage.webp";
import logo from "../assets/logo.webp";
import { events, getCardInfos, getListings} from "../static_events";
import type {OrganizedListing} from "../static_events";
import About from "./About";

const CONTACT_EMAIL = "calgarymongolians@gmail.com";

// all animation variants

const noEventsVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const textVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
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

export default function Upcoming() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lang, setLang] = useState<"en" | "mn">("mn");
  const [eventsLang, setEventsLang] = useState<"en" | "mn">("mn");

  const [isDesktop, setIsDesktop] = useState(false);

  const navigate = useNavigate();

  const eventItems= useMemo(() => getCardInfos(events), []);
  const Listings:OrganizedListing[] = useMemo(() => getListings(events), []);
  const hasEvents = eventItems.length > 0;


//use effect check for mobile view or nah
  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const displayItems =
    isDesktop && eventItems.length > 1
      ? [...eventItems]
      : eventItems;

  const ABOUT_TEXT =
    lang === "en"
      ? "Etugen Mongols is a Calgary-based, registered non-profit organization focused on building the Mongolian community. We host programs, events, and gatherings that bring people together and keep our culture alive."
      : "Этүгэн Монголчууд нь Калгари хотод төвтэй, албан ёсоор бүртгэлтэй ашгийн бус байгууллага юм. Бид Монголын нийгэмлэгийг нэгтгэх зорилготой хөтөлбөр, арга хэмжээ, уулзалтуудыг зохион байгуулдаг.";

  const scrollToGallery = () => {
    const el = document.getElementById("gallery");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  
  //const scrollToContact = () => {
  //  const el = document.getElementById("contact");
  //  if (!el) return;
  //  const y = el.getBoundingClientRect().top + window.pageYOffset - 60;
  //  window.scrollTo({ top: y, behavior: "smooth" });
  //};

  return (
    <>
      <motion.section
        id="upcoming"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/65 to-black/90" />


        


        {/* White side panel (right half of desktop view) */}
        <motion.div
          variants={panelMotion}
          initial="hidden"
          animate="show"
          className="
            hidden md:block
            absolute inset-y-0 right-0
            w-[35%]
            bg-neutral-100
            pointer-events-none
            z-20
          "
        >
          <div
            className="
              h-full
              px-6 lg:px-10 xl:px-12
              pt-16 lg:pt-20 xl:pt-24
              pb-10 lg:pb-14 xl:pb-16
              pointer-events-auto
              overflow-y-auto
              flex flex-col
            "
          >
            {/* about segment */}
            <div className="relative max-w-sm">
              <button
                onClick={() => setLang(lang === "en" ? "mn" : "en")}
                className="absolute right-0 -top-8 text-xs uppercase tracking-wide text-black/50 hover:text-black transition"
              >
                {lang === "en" ? "Монгол" : "English"}
              </button>

              <img src={logo} alt="" className="w-20 mb-6 opacity-90" />

              <h3 className="text-sm uppercase tracking-widest text-black/50">
                About Us
              </h3>

              <div className="mt-4 h-0.5 w-14 bg-black" />

              <div className="mt-6 min-h-[140px]">
                <p className="text-sm leading-relaxed text-black/75">
                  {ABOUT_TEXT}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="h-28 overflow-hidden bg-black/10">
                  <img src={heroBg} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-28 overflow-hidden bg-black/10">
                  <img src={heroBg} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="col-span-2 h-36 overflow-hidden bg-black/10">
                  <img src={heroBg} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
             {/* our work segment */}
            <div className="mt-12 max-w-sm">

              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
                Our Work
              </p>

              <p className="text-sm leading-relaxed text-black/70 mb-4">
                See what we do as an organization.
              </p>

              <button
                onClick={scrollToGallery}
                className="
                  inline-flex
                  text-xs
                  px-4 py-2
                  border border-black/30
                  text-black/70
                  hover:border-black
                  transition
                "
              >
                View Event Gallery
              </button>
            </div>

            {/* donate notice segment */}
            <div className="h-px w-full bg-black/10 mt-5" />
            <div className="mt-5 max-w-sm">
          

              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
                Donate Notice
              </p>

              <p className="text-sm leading-relaxed text-black/70">
                Donation support details will be available here soon. Your support helps us continue organizing cultural programs, events, and community gatherings.
              </p>
            </div>


            {/* contact segment*/}
            <div className="mt-5 max-w-sm">
              <div className="h-px w-full bg-black/10 mb-4" />

              <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-3">
                Contact Us
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
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
                  Email · {CONTACT_EMAIL}
                </a>
              </div>
              <div className="h-px w-full bg-black/10 mt-5" />
            </div>

            {/* social media segment */}
            <div className="mt-auto pt-2 max-w-sm text-center">
              <p className="text-sm uppercase tracking-widest text-black/60">
                Connect with us
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61584273744310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-10 h-7
                    flex items-center justify-center
                    rounded-full
                    border border-black/30
                    text-black
                    hover:border-black
                    hover:scale-105
                    transition
                  "
                >
                  <FaFacebookF className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* main content (left side of desktop view) */}
        <div
          className="
            relative z-10
            max-w-7xl mx-auto
            px-6 py-28
            md:pr-[40%]
          "
        >

          <motion.div variants={containerVariants} className="mb-16 md:mb-12">

            <motion.h3
              variants={textVariants}
              className="text-white text-3xl md:text-4xl font-semibold tracking-wide"
            >
              Upcoming Events
            </motion.h3>

            {hasEvents && (
              <>
                <motion.p variants={textVariants} className="mt-3 text-white/80 max-w-lg">
                  Click on the events to see more details
                </motion.p>
                <motion.p variants={textVariants} className="mt-1 text-white/60 text-sm">
                  Арга хэмжээн дээр дарж дэлгэрэнгүй мэдээлэл үзнэ үү
                </motion.p>
              </>
            )}
          </motion.div>

          <motion.div variants={textVariants} className="mb-6">
          {hasEvents ? (
            <h4 className="text-white text-sm tracking-[0.3em] uppercase">
              Events
            </h4>
          ) : (
            <h4 className="hidden md:block text-white text-sm tracking-[0.3em] uppercase">
              No events planned
            </h4>
          )}
        </motion.div>

          <motion.div
            variants={containerVariants}
            className="
              flex flex-col gap-12
              md:flex-row md:gap-14
              md:px-10 lg:px-20 xl:px-32
              md:pt-10 md:pb-24
              md:overflow-x-auto md:overflow-y-visible
              md:snap-x md:snap-mandatory
              md:scrollbar-none
            "
          >
            {hasEvents ? (
              displayItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  variants={cardVariants}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="w-full md:w-auto md:shrink-0 md:snap-start"
                >
                  <div className="group w-full max-w-[400px] md:min-w-[400px] lg:min-w-[340px] bg-black/40 border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`/upcoming_event_assets/${item.img}`}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-5 py-4">
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="mt-2 text-sm text-white/65">{item.desc}</p>
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <motion.div
                variants={noEventsVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="min-h-[100px] md:min-h-[100px] flex items-center"
              >

                <div className="max-w-md w-full">
                  <p className="text-white/80 text-sm">
                    No upcoming events are planned at the moment.
                  </p>

                  <p className="mt-3 text-white/60 text-sm">
                    We regularly host cultural celebrations and community gatherings.
                    In the meantime, take a look at highlights from our most recent event.
                  </p>

                  <div className="mt-4 h-px w-12 bg-white/30" />

                  <p className="mt-4 text-white/80 text-sm">
                    Look at our latest event
                  </p>

                  {/* placeholder rn, will add real one soon */}
                  <div className="mt-4 aspect-video w-full overflow-hidden border border-white/25">
                    <iframe
                      loading="lazy"
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/9bZkp7q19f0"
                      title="Latest Event Video"
                      
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <button
                    onClick={scrollToGallery}
                    className="
                      inline-flex mt-5
                      px-6 py-3
                      text-xs font-semibold uppercase tracking-widest
                      text-white
                      border border-white/40
                      hover:border-white
                      transition
                    "
                  >
                    View Event Gallery
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="hidden md:block mt-6 max-w-lg"
            >

           <div className="relative max-w-lg">
            <button
              onClick={() =>
                setEventsLang(eventsLang === "en" ? "mn" : "en")
              }
              className="absolute right-0 -top-6 text-xs uppercase tracking-wide text-white/60 hover:text-white transition"
            >
              {eventsLang === "en" ? "Монгол" : "English"}
            </button>

            <div className="h-[120px]">
              <motion.p variants={textVariants} className="text-white/75 text-sm">
                {eventsLang === "en"
                  ? "We host two primary community events each year — a Christmas & New Year celebration in the winter time, followed by Naadam in the summer time. Be sure to stay tuned with our socials."
                  : "Этүгэн Монголчууд жил бүр үндсэн хоёр арга хэмжээ зохион байгуулдаг. Өвлийн улиралд Зул сар, Шинэ жилийн баяр, зуны улиралд Наадам болдог."}
              </motion.p>

              <motion.p variants={textVariants} className="mt-4 text-white/75 text-sm">
                {eventsLang === "en"
                  ? "We often require help from the community for our events. See current volunteer opportunities below."
                  : "Бид арга хэмжээнүүддээ олон нийтийн дэмжлэгийг тогтмол шаарддаг. Одоогийн сайн дурын ажлын боломжуудыг доороос үзнэ үү."}
              </motion.p>
            </div>
          </div>     
            <p className="mt-15 text-white/60 text-sm uppercase tracking-widest">
              Event volunteer listings
            </p>

          {Listings.length > 0 ? (          
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
                mt-3
                max-h-50
                overflow-y-auto
                pr-2
                space-y-2
                scrollbar-thin
                scrollbar-thumb-white/30
                scrollbar-track-transparent
              "
            >
              {Listings.map((item, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/events/${item.id}`)}
                  className="
                    relative
                    w-full
                    text-left
                    text-sm
                    text-white/70
                    border border-white/25
                    px-3 py-2
                    hover:border-white
                    hover:text-white
                    transition
                  "
                >
                  <span className="block truncate">
                    {item.listing.title}
                  </span>
                  <span
                    className={`
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      max-w-[55%]
                      text-xs
                      text-white/60
                      text-right
                      truncate
                      transition-opacity
                      duration-200
                      ${hoveredIndex === i ? "opacity-100" : "opacity-0"}
                    `}
                  >
                    {item.listing.title_mn}
                  </span>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="
                mt-3
                max-h-50
                h-50
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
              "
            >
              <img
                src={logo}
                alt=""
                className="w-12 opacity-20"
              />

              <p className="text-white/60 text-sm">
                No help needed as of now.
              </p>
            </motion.div>

          )}            
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile view */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="md:hidden px-6 pb-20"
      >
        <div className="relative mb-6">
          <button
            onClick={() =>
              setEventsLang(eventsLang === "en" ? "mn" : "en")
            }
            className="absolute right-0 -top-6 text-xs uppercase tracking-wide text-white/60 hover:text-white transition"

          >
            {eventsLang === "en" ? "Монгол" : "English"}
          </button>
        </div>

        <div className="mt-10 h-[120px] overflow-hidden">
          <motion.p
            variants={textVariants}
            className="text-white/75 text-sm"
          >
            {eventsLang === "en"
              ? "We host two primary community events each year — a Christmas & New Year celebration in the winter time, followed by Naadam in the summer time."
              : "Этүгэн Монголчууд жил бүр үндсэн хоёр арга хэмжээ зохион байгуулдаг. Өвлийн улиралд Зул сар, Шинэ жилийн баяр, зуны улиралд Наадам болдог."}
          </motion.p>

          <motion.p
            variants={textVariants}
            className="mt-4 text-white/75 text-sm"
          >
            {eventsLang === "en"
              ? "We often require help from the community for our events. See current volunteer opportunities below."
              : "Бид арга хэмжээнүүддээ олон нийтийн дэмжлэгийг тогтмол шаарддаг. Одоогийн сайн дурын ажлын боломжуудыг доороос үзнэ үү."}
          </motion.p>
        </div>

        <p className="mt-15 text-white/60 text-sm uppercase tracking-widest">
          Event volunteer listings
        </p>

        {Listings.length > 0 ? (
          <div className="mt-3 space-y-2">
            {Listings.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(`/events/${item.id}`)}
                className="
                  w-full
                  text-left
                  text-sm
                  text-white/70
                  border border-white/25
                  px-4 py-3
                  hover:border-white
                  hover:text-white
                  transition
                "
              >
                {item.listing.title}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-white/60 text-sm">
            No help needed as of now.
          </p>
        )}
      </motion.div>
      <div className="md:hidden">
        <About />
      </div>
    </>
  );
}














