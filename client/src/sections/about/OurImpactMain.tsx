import {
  COPY,
  type Copy,
  type CultureActivity,
  type ImpactItem,
  type Lang,
} from "./content/OurImpactMainContent";
import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import { aboutMedia } from "./media";

type OurImpactMainProps = {
  lang: Lang;
};

type CollageLayout = "featured-left" | "featured-right" | "staggered";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0, scale: 1.015 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: easeOut },
  },
};

function OurImpactMain({ lang }: OurImpactMainProps) {
  const copy = COPY[lang];
  const [main, performance, youth] = copy.items;

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <Hero copy={copy} />

      <FeaturedImpact
        item={main}
        quote={copy.quoteA}
        label={copy.featuredLabel}
        viewMore={copy.viewMore}
      />

      <PerformanceBand
        item={performance}
        quote={copy.quoteB}
        label={copy.performanceLabel}
        viewMore={copy.viewMore}
      />

      <CultureSection copy={copy} />

      <YouthBlock
        item={youth}
        quote={copy.quoteC}
        label={copy.youthLabel}
        viewMore={copy.viewMore}
      />

      <FinalLinks events={copy.events} gallery={copy.gallery} />
    </main>
  );
}

const Hero = memo(function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="bg-white px-6 pb-14 pt-32 text-center md:px-10 md:pt-36">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
          {copy.eyebrow}
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#27301d] md:text-6xl">
          {copy.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#667056]">
          {copy.intro}
        </p>
      </motion.div>
    </section>
  );
});

const FeaturedImpact = memo(function FeaturedImpact({
  item,
  quote,
  label,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  label: string;
  viewMore: string;
}) {
  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-20">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center"
      >
        <div className="max-w-xl">
          <Label>{label}</Label>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#667056]">
            {item.body}
          </p>

          <Quote>{quote}</Quote>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>

        <ImageVideoBlock
          image={aboutMedia.impact[item.imageKey][0]}
          youtubeUrl={item.youtubeUrl}
          alt={item.title}
        />
      </motion.article>
    </section>
  );
});

const PerformanceBand = memo(function PerformanceBand({
  item,
  quote,
  label,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  label: string;
  viewMore: string;
}) {
  const videoId = item.youtubeUrl
    ? getYouTubeVideoId(item.youtubeUrl)
    : null;

  return (
    <section className="bg-[#f7f7f4] px-6 py-16 md:px-10 md:py-20">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        {videoId && (
          <motion.div
            variants={imageMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="h-[24rem] overflow-hidden bg-[#27301d] p-2 sm:h-[30rem] lg:h-[34rem]"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${item.title} video`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>
        )}

        <div className="max-w-xl lg:justify-self-end">
          <Label>{label}</Label>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#667056]">
            {item.body}
          </p>

          <Quote>{quote}</Quote>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>
      </motion.article>
    </section>
  );
});

const ImageVideoBlock = memo(function ImageVideoBlock({
  image,
  youtubeUrl,
  alt,
}: {
  image: string;
  youtubeUrl?: string;
  alt: string;
}) {
  const videoId = youtubeUrl
    ? getYouTubeVideoId(youtubeUrl)
    : null;

  return (
    <motion.div
      variants={imageMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid h-[34rem] grid-rows-2 gap-2 overflow-hidden bg-[#27301d] p-2 md:h-[26rem] md:grid-cols-2 md:grid-rows-1 lg:h-[36rem]"
    >
      <div className="relative min-h-0 overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {videoId && (
        <div className="min-h-0 overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${alt} video`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </motion.div>
  );
});

const CultureSection = memo(function CultureSection({
  copy,
}: {
  copy: Copy;
}) {
  return (
    <section className="bg-white">
      <div className="px-6 py-16 text-center md:px-10 md:py-20">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Label>{copy.cultureEyebrow}</Label>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            {copy.cultureTitle}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#667056]">
            {copy.cultureIntro}
          </p>
        </motion.div>
      </div>

      {copy.cultureActivities.map((activity, index) => (
        <CultureActivityRow
          key={activity.id}
          activity={activity}
          reverse={index % 2 === 1}
          large={index === 0 || index === 3}
          muted={index === 1}
        />
      ))}
    </section>
  );
});

const CultureActivityRow = memo(function CultureActivityRow({
  activity,
  reverse = false,
  large = false,
  muted = false,
}: {
  activity: CultureActivity;
  reverse?: boolean;
  large?: boolean;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-[#f7f7f4]" : "bg-white"}>
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className={[
          "mx-auto grid max-w-6xl items-center lg:grid-cols-2",
          large ? "lg:min-h-[36rem]" : "lg:min-h-[26rem]",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-full items-center px-6 py-14 md:px-10 lg:px-12",
            large ? "lg:py-20" : "lg:py-14",
            reverse ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <div className="max-w-xl">
            <h3
              className={[
                "font-semibold leading-tight text-[#27301d]",
                large ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl",
              ].join(" ")}
            >
              {activity.title}
            </h3>

            <p className="mt-6 text-[15px] leading-8 text-[#667056]">
              {activity.body}
            </p>
          </div>
        </div>

        <ImageBlock
          images={aboutMedia.impact[activity.imageKey]}
          alt={activity.title}
          tall={large}
          reverse={reverse}
          layout={
            reverse
              ? "featured-right"
              : large
                ? "featured-left"
                : "staggered"
          }
        />
      </motion.article>
    </section>
  );
});

const YouthBlock = memo(function YouthBlock({
  item,
  quote,
  label,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  label: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#f7f7f4] px-6 py-16 md:px-10 md:py-20">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:items-center"
      >
        <div>
          <Label>{label}</Label>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#667056]">
            {item.body}
          </p>

          <Quote>{quote}</Quote>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>

        <motion.div
          variants={imageMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="h-[26rem] overflow-hidden bg-[#27301d] p-2 lg:h-[36rem]"
        >
          <img
            src={aboutMedia.impact[item.imageKey][0]}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.article>
    </section>
  );
});

const FinalLinks = memo(function FinalLinks({
  events,
  gallery,
}: {
  events: string;
  gallery: string;
}) {
  return (
    <section className="bg-white px-6 pb-24 pt-6 text-center md:px-10">
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/events"
          className="inline-flex bg-[#27301d] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white no-underline transition-colors hover:bg-[#9a7b26]"
        >
          {events}
        </Link>

        <Link
          to="/gallery"
          className="inline-flex border border-[#27301d]/30 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors hover:bg-[#27301d] hover:text-white"
        >
          {gallery}
        </Link>
      </div>
    </section>
  );
});

const ImageBlock = memo(function ImageBlock({
  images,
  alt,
  tall = false,
  reverse = false,
  layout = "featured-left",
}: {
  images: readonly string[];
  alt: string;
  tall?: boolean;
  reverse?: boolean;
  layout?: CollageLayout;
}) {
  const visibleImages =
    layout === "staggered" ? images.slice(0, 3) : images.slice(0, 4);

  return (
    <motion.div
      variants={imageMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={[
        "grid overflow-hidden bg-[#27301d] p-2",
        tall ? "h-[26rem] lg:h-[36rem]" : "h-[22rem] lg:h-[30rem]",
        reverse ? "lg:order-1" : "lg:order-2",
        getCollageGrid(layout),
      ].join(" ")}
    >
      {visibleImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={[
            "relative min-h-0 overflow-hidden",
            getCollageItemClass(layout, index),
          ].join(" ")}
        >
          <img
            src={src}
            alt={`${alt} ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      ))}
    </motion.div>
  );
});

function getCollageGrid(layout: CollageLayout) {
  switch (layout) {
    case "featured-left":
    case "featured-right":
      return "grid-cols-3 grid-rows-3 gap-2";

    case "staggered":
      return "grid-cols-3 grid-rows-2 gap-2";

    default:
      return "grid-cols-3 grid-rows-3 gap-2";
  }
}

function getCollageItemClass(
  layout: CollageLayout,
  index: number,
) {
  switch (layout) {
    case "featured-left":
      if (index === 0) {
        return "col-span-2 row-span-3";
      }

      return "col-span-1 row-span-1";

    case "featured-right":
      if (index === 0) {
        return "col-span-2 row-span-3 col-start-2 row-start-1";
      }

      if (index === 1) {
        return "col-span-1 row-span-1 col-start-1 row-start-1";
      }

      if (index === 2) {
        return "col-span-1 row-span-1 col-start-1 row-start-2";
      }

      return "col-span-1 row-span-1 col-start-1 row-start-3";

    case "staggered":
      if (index === 0) {
        return "col-span-2 row-span-2 col-start-1 row-start-1";
      }

      if (index === 1) {
        return "col-span-1 row-span-1 col-start-3 row-start-1";
      }

      return "col-span-1 row-span-1 col-start-3 row-start-2";

    default:
      return "col-span-1 row-span-1";
  }
}

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname === "youtu.be" ||
      parsed.hostname === "www.youtu.be"
    ) {
      return parsed.pathname.slice(1).split("/")[0] ?? "";
    }

    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("/")[0] ?? "";
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("/")[0] ?? "";
      }

      return parsed.searchParams.get("v") ?? "";
    }

    return "";
  } catch {
    return "";
  }
}

function Label({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
      {children}
    </p>
  );
}

function Quote({ children }: { children: string }) {
  return (
    <p className="mt-8 text-2xl font-semibold italic leading-9 text-[#27301d]">
      “{children}”
    </p>
  );
}

function TextLink({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className="mt-7 inline-flex bg-[#27301d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white no-underline transition-colors hover:bg-[#9a7b26]"
    >
      {children}

      <span className="ml-3" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default memo(OurImpactMain);