"use client";

import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

import canadaFlag from "../../assets/canada-flag.webp";
import mongoliaFlag from "../../assets/mongolia-flag.webp";

type Lang = "en" | "mn";

type HeroProps = {
  lang: Lang;
};

type ActionLink = {
  label: string;
  to: string;
};

const HERO_IMAGE = "/landingpage.webp";
const FEATURED_VIDEO_ID = "YOUR_FEATURED_EVENT_VIDEO_ID";

const HERO_SLIDES = [
  "/landingpage.webp",
  "/landingpage.webp",
  "/landingpage.webp",
  "/landingpage.webp",
] as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const COPY = {
  en: {
    brand: "Etugen Mongols",
    intro:
      "A Calgary-based non-profit preserving Mongolian culture and bringing the community together through events, programs, and performances.",
    learnMore: "Learn More",
    whatKicker: "What We Do",
    whatBody:
      "We host cultural events, performances, gatherings, and community programs that help Mongolian traditions stay active in Calgary. From Naadam to family celebrations, our goal is to create spaces where people can participate, practice, perform, and pass culture forward.",
    eventsButton: "View Events",
    programsButton: "Programs",
    whoKicker: "Who We Are",
    whoBody:
      "Etugen Mongols is built by families, volunteers, organizers, artists, performers, and community members who care about keeping Mongolian heritage visible, shared, and meaningful for the next generation.",
    storyButton: "Our Story",
    teamButton: "Meet the Team",
    impactButton: "Our Impact",
    pause: "Pause",
    paused: "Paused",
  },
  mn: {
    brand: "Этүгэн Монголчууд",
    intro:
      "Калгари дахь Монгол соёлыг хадгалж, арга хэмжээ, хөтөлбөр, тоглолтоор хамт олноо нэгтгэх ашгийн бус байгууллага.",
    learnMore: "Дэлгэрэнгүй",
    whatKicker: "Бид юу хийдэг вэ",
    whatBody:
      "Бид Монгол уламжлалаа Калгари хотод амьд байлгахын тулд соёлын арга хэмжээ, тоглолт, уулзалт, хөтөлбөрүүдийг зохион байгуулдаг. Наадам, гэр бүлийн баяр, хамтын үйл ажиллагаагаар дамжуулан хүмүүс оролцож, дадлага хийж, соёлоо хойч үедээ өвлүүлэх орон зайг бий болгодог.",
    eventsButton: "Арга хэмжээнүүд",
    programsButton: "Хөтөлбөрүүд",
    whoKicker: "Бид хэн бэ",
    whoBody:
      "Этүгэн Монголчууд нь Монгол өв соёлоо хадгалж, бусадтай хуваалцаж, дараагийн үедээ утга учиртайгаар өвлүүлэхийг хүссэн гэр бүлүүд, сайн дурынхан, зохион байгуулагчид, уран бүтээлчид, хамт олноос бүрддэг.",
    storyButton: "Бидний түүх",
    teamButton: "Багтай танилцах",
    impactButton: "Бидний нөлөө",
    pause: "Зогсоох",
    paused: "Зогссон",
  },
} as const;

function Hero({ lang }: HeroProps) {
  const copy = COPY[lang];

  const scrollToLearnMore = () => {
  const target = document.getElementById("learn-more");
  if (!target) return;

  const offset = 40;

  window.scrollTo({
    top: target.offsetTop - offset,
    behavior: "smooth",
  });
};

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <section className="flex min-h-screen flex-col bg-white pt-16 md:pt-20">
        <HeroSlowScroll pauseText={copy.pause} pausedText={copy.paused} />

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 py-6 text-center md:px-10"
        >
          <div className="flex justify-center gap-3">
            <img src={mongoliaFlag} alt="Mongolia flag" className="h-7 md:h-9" />
            <img src={canadaFlag} alt="Canada flag" className="h-7 md:h-9" />
          </div>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#9a7b26]">
            {copy.brand}
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-tight text-[#27301d] md:text-2xl">
            {copy.intro}
          </h1>

          <button
            type="button"
            onClick={scrollToLearnMore}
            className="mt-6 inline-flex bg-[#27301d] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#9a7b26]"
          >
            {copy.learnMore}
          </button>
        </motion.div>
      </section>

      <section
        id="learn-more"
        className="scroll-mt-0 bg-white px-6 py-14 md:px-10 md:py-18"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-6xl lg:grid-cols-2"
        >
          <FeaturedVideo className="order-1" />

          <InfoPanel
            className="order-2"
            kicker={copy.whatKicker}
            body={copy.whatBody}
            actions={[
              { label: copy.eventsButton, to: "/events" },
              { label: copy.programsButton, to: "/programs" },
            ]}
          />

          <SingleImage className="order-3 lg:order-4" />

          <InfoPanel
            className="order-4 lg:order-3"
            kicker={copy.whoKicker}
            body={copy.whoBody}
            actions={[
              { label: copy.storyButton, to: "/about/story" },
              { label: copy.teamButton, to: "/about/team" },
              { label: copy.impactButton, to: "/about/impact" },
            ]}
          />
        </motion.div>
      </section>
    </main>
  );
}

function HeroSlowScroll({
  pauseText,
  pausedText,
}: {
  pauseText: string;
  pausedText: string;
}) {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const scrollingImages = [...HERO_SLIDES, ...HERO_SLIDES];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? HERO_SLIDES.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === HERO_SLIDES.length - 1 ? 0 : current + 1
    );
  };

  const handleTouchEnd = (x: number) => {
    if (touchStart === null) return;

    const distance = touchStart - x;

    if (distance > 45) goToNext();
    if (distance < -45) goToPrevious();

    setTouchStart(null);
  };

  return (
    <div className="relative h-[43vh] min-h-[21rem] overflow-hidden bg-[#27301d] md:h-[49vh] md:min-h-[25rem]">
      <style>
        {`
          @keyframes etugenHeroScroll {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }

          .etugen-hero-scroll {
            animation: etugenHeroScroll 42s linear infinite;
          }

          .etugen-hero-scroll-paused {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <div
          aria-hidden="true"
          className={[
            "etugen-hero-scroll flex h-full w-[200%]",
            paused ? "etugen-hero-scroll-paused" : "",
          ].join(" ")}
        >
          {scrollingImages.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt=""
              width={1920}
              height={1080}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className="h-full w-1/4 shrink-0 object-cover"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          className="absolute bottom-4 right-4 z-20 min-w-[7rem] bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#27301d] shadow-sm transition-colors hover:bg-white"
          aria-pressed={paused}
        >
          {paused ? pausedText : pauseText}
        </button>
      </div>

      <div
        className="absolute inset-0 md:hidden"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <img
          src={HERO_SLIDES[activeIndex]}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/90 text-lg font-bold text-[#27301d] shadow-sm"
          aria-label="Previous image"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/90 text-lg font-bold text-[#27301d] shadow-sm"
          aria-label="Next image"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2.5 w-2.5 rounded-full border border-white transition-colors",
                activeIndex === index ? "bg-white" : "bg-white/30",
              ].join(" ")}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/25" />
    </div>
  );
}

function InfoPanel({
  kicker,
  body,
  actions,
  className = "",
}: {
  kicker: string;
  body: string;
  actions: ActionLink[];
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[20rem] flex-col justify-center bg-white p-7 md:p-10 lg:min-h-[25rem] ${className}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9a7b26]">
        {kicker}
      </p>

      <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#667056] md:text-base md:leading-8">
        {body}
      </p>

      <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
        {actions.map((action, index) => (
          <Link
            key={action.to}
            to={action.to}
            className={[
              "flex min-h-12 w-full items-center justify-center px-5 py-3 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.18em] no-underline transition-colors sm:w-auto sm:min-w-[10.5rem]",
              index === 0
                ? "bg-[#27301d] text-white hover:bg-[#9a7b26]"
                : "border border-[#27301d]/30 text-[#27301d] hover:bg-[#27301d] hover:text-white",
            ].join(" ")}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SingleImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[20rem] items-center justify-center bg-white p-3 lg:min-h-[25rem] ${className}`}
    >
      <img
        src={HERO_IMAGE}
        alt=""
        width={1000}
        height={650}
        loading="lazy"
        decoding="async"
        className="h-auto max-h-[20rem] w-full object-cover lg:max-h-[22rem]"
      />
    </div>
  );
}

function FeaturedVideo({ className = "" }: { className?: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const hasVideo = FEATURED_VIDEO_ID !== "YOUR_FEATURED_EVENT_VIDEO_ID";

  return (
    <div
      className={`flex min-h-[20rem] items-center justify-center bg-white p-3 lg:min-h-[25rem] ${className}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#27301d]">
        {showVideo && hasVideo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO_ID}?autoplay=1&rel=0`}
            title="Etugen Mongols featured event video"
            loading="lazy"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => hasVideo && setShowVideo(true)}
            className="group h-full w-full"
            aria-label="Play featured event video"
          >
            <img
              src={HERO_IMAGE}
              alt=""
              width={960}
              height={540}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#27301d] shadow-lg">
                <span className="ml-1 text-base">▶</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(Hero);