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

const HERO_IMAGE = "/home/whoweare.webp";

const FEATURED_VIDEO_ID = "SW_iujvUAzQ";

const HERO_SLIDES = [
  "/home/slideshow/1.webp",
  "/home/slideshow/2.webp",
  "/home/slideshow/3.webp",
  "/home/slideshow/4.webp",
] as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOut,
    },
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

    if (!target) {
      return;
    }

    const offset = 40;

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <section className="flex min-h-screen flex-col bg-white pt-16 md:pt-20">
        <HeroSlowScroll
          pauseText={copy.pause}
          pausedText={copy.paused}
        />

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 py-6 text-center md:px-10"
        >
          <div className="flex justify-center gap-3">
            <img
              src={mongoliaFlag}
              alt="Mongolia flag"
              width={72}
              height={36}
              decoding="async"
              className="h-7 w-auto md:h-9"
            />

            <img
              src={canadaFlag}
              alt="Canada flag"
              width={72}
              height={36}
              decoding="async"
              className="h-7 w-auto md:h-9"
            />
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
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto grid max-w-6xl lg:grid-cols-2"
        >
          <FeaturedVideo className="order-1" />

          <InfoPanel
            className="order-2"
            kicker={copy.whatKicker}
            body={copy.whatBody}
            actions={[
              {
                label: copy.eventsButton,
                to: "/events",
              },
              {
                label: copy.programsButton,
                to: "/programs",
              },
            ]}
          />

          <SingleImage className="order-3 lg:order-4" />

          <InfoPanel
            className="order-4 lg:order-3"
            kicker={copy.whoKicker}
            body={copy.whoBody}
            actions={[
              {
                label: copy.storyButton,
                to: "/about/story",
              },
              {
                label: copy.teamButton,
                to: "/about/team",
              },
              {
                label: copy.impactButton,
                to: "/about/impact",
              },
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

  /*
   * The second copy is required for the infinite loop.
   *
   * Visual sequence:
   * 1 2 3 4 | 1 2 3 4
   *
   * When the strip reaches -50%, the second set is positioned exactly
   * where the first set began, making the animation restart invisible.
   */
  const scrollingImages = [...HERO_SLIDES, ...HERO_SLIDES];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? HERO_SLIDES.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === HERO_SLIDES.length - 1 ? 0 : current + 1,
    );
  };

  const handleTouchEnd = (x: number) => {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - x;

    if (distance > 45) {
      goToNext();
    } else if (distance < -45) {
      goToPrevious();
    }

    setTouchStart(null);
  };

  return (
    <div className="relative h-[43vh] min-h-[21rem] overflow-hidden bg-[#27301d] md:h-[49vh] md:min-h-[25rem]">
      <style>
        {`
          @keyframes etugenHeroScroll {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .etugen-hero-scroll {
            animation: etugenHeroScroll 48s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform-style: preserve-3d;
          }

          .etugen-hero-scroll-paused {
            animation-play-state: paused;
          }

          .etugen-hero-image {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            image-rendering: auto;
            filter: saturate(1.04) contrast(1.02);
          }

          @media (prefers-reduced-motion: reduce) {
            .etugen-hero-scroll {
              animation-play-state: paused;
            }
          }
        `}
      </style>

      {/* Desktop continuous scrolling strip */}
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
              width={1280}
              height={850}
              loading={(index === 0 || index === 1) ? "eager" : "lazy"}
              fetchPriority={(index === 0 || index === 1) ? "high" : "auto"}
              decoding="async"
              draggable={false}
              className="etugen-hero-image h-full w-1/4 shrink-0 select-none object-cover object-center"
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

      {/* Mobile manual slideshow */}
      <div
        className="absolute inset-0 md:hidden"
        onTouchStart={(event) => {
          setTouchStart(event.touches[0]?.clientX ?? null);
        }}
        onTouchEnd={(event) => {
          const x = event.changedTouches[0]?.clientX;

          if (x !== undefined) {
            handleTouchEnd(x);
          }
        }}
      >
        <img
          src={HERO_SLIDES[activeIndex]}
          alt=""
          width={1280}
          height={850}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="etugen-hero-image h-full w-full select-none object-cover object-center"
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
                activeIndex === index
                  ? "bg-white"
                  : "bg-white/30",
              ].join(" ")}
              aria-label={`Go to image ${index + 1}`}
              aria-current={
                activeIndex === index ? "true" : undefined
              }
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/5" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-black/5 via-transparent to-black/10" />
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

function SingleImage({
  className = "",
}: {
  className?: string;
}) {
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
        className="h-auto max-h-[20rem] w-full object-cover saturate-[1.03] contrast-[1.02] lg:max-h-[22rem]"
      />
    </div>
  );
}

function FeaturedVideo({
  className = "",
}: {
  className?: string;
}) {
  const [showVideo, setShowVideo] = useState(false);

  const hasVideo =
    FEATURED_VIDEO_ID.trim().length > 0;

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
              src={`https://i.ytimg.com/vi/${FEATURED_VIDEO_ID}/maxresdefault.jpg`}
              alt="Etugen Mongols featured event video"
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              onError={(event) => {
                event.currentTarget.src = HERO_IMAGE;
              }}
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