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
import {
  CultureImageBlock,
  ImageVideoBlock,
  ImpactVideo,
  YouthImage,
} from "./components/ImpactMedia";
import { aboutMedia } from "./media";

type OurImpactMainProps = {
  lang: Lang;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
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
        viewMore={copy.viewMore}
      />

      <PerformanceBand
        item={performance}
        quote={copy.quoteB}
        viewMore={copy.viewMore}
      />

      <CultureSection copy={copy} />

      <YouthBlock
        item={youth}
        quote={copy.quoteC}
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
        <h1 className="text-4xl font-semibold leading-tight text-[#27301d] md:text-6xl">
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
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
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
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
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
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#f7f7f4] px-6 py-16 md:px-10 md:py-20">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        <ImpactVideo youtubeUrl={item.youtubeUrl} title={item.title} />

        <div className="max-w-xl lg:justify-self-end">
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
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
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
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

        <CultureImageBlock
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
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
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
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#667056]">
            {item.body}
          </p>

          <Quote>{quote}</Quote>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>

        <YouthImage
          image={aboutMedia.impact[item.imageKey][0]}
          alt={item.title}
        />
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
