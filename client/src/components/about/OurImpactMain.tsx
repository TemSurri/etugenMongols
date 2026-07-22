"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type OurImpactMainProps = {
  lang: Lang;
};

type ImpactImageKey =
  | "landing"
  | "archery"
  | "wrestling"
  | "stories"
  | "dance"
  | "stampedeNaadam"
  | "performanceCover"
  | "youthCulture";


type CollageLayout =
  | "featured-left"
  | "featured-right"
  | "staggered";



type ImpactItem = {
  id: string;
  title: string;
  body: string;
  imageKey: ImpactImageKey;
  href: string;
  youtubeUrl?: string;
};

type CultureActivity = {
  id: string;
  title: string;
  body: string;
  imageKey: ImpactImageKey;
};

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  viewMore: string;
  events: string;
  gallery: string;
  featuredLabel: string;
  performanceLabel: string;
  youthLabel: string;
  quoteA: string;
  quoteB: string;
  quoteC: string;
  cultureEyebrow: string;
  cultureTitle: string;
  cultureIntro: string;
  cultureActivities: readonly CultureActivity[];
  items: readonly [ImpactItem, ImpactItem, ImpactItem];
};

const IMAGE_PATHS: Record<ImpactImageKey, readonly string[]> = {
  landing: [
    "/landingpage.webp",
    "/impact/landing-2.webp",
    "/impact/landing-3.webp",
    "/impact/landing-4.webp",
  ],

  archery: [
    "/impact/archery/1.webp",
    "/impact/archery/2.webp",
    "/impact/archery/3.webp",
    "/impact/archery/4.webp",
  ],

  wrestling: [
    "/impact/wrestling/1.webp",
    "/impact/wrestling/2.webp",
    "/impact/wrestling/3.webp",
    "/impact/wrestling/4.webp",
  ],

  stories: [
    "/impact/culture/1.webp",
    "/impact/culture/2.webp",
    "/impact/culture/3.webp",
    "/impact/culture/4.webp"
  ],

  dance: [
    "/impact/dance/1.webp",
    "/impact/dance/2.webp",
    "/impact/dance/3.webp",
   
  ],

  stampedeNaadam: [
    "/impact/stampede-naadam.webp",
    "/impact/stampede-naadam-2.webp",
    "/impact/stampede-naadam-3.webp",
    "/impact/stampede-naadam-4.webp",
  ],

  performanceCover: [
  "/impact/perf.JPG",
],
  youthCulture: [
    "/impact/youth/1.webp",
    "/impact/youth/2.webp",
    "/impact/youth/3.webp",
    "/impact/youth/4.webp",
  ],
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

const imageMotion: Variants = {
  hidden: { opacity: 0, scale: 1.015 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: easeOut },
  },
};

const COPY = {
  en: {
    eyebrow: "What We Are Proud Of",
    title: "Our Impact",
    intro:
      "A direct look at some of the notable moments, special parts, and meaningful events we are proud to have created with the community.",
    viewMore: "View More",
    events: "View Events",
    gallery: "View Gallery",

    featuredLabel: "Featured",
    performanceLabel: "Performance",
    youthLabel: "Youth",

    quoteA: "Culture represented in real life.",
    quoteB: "Families feel more connected.",
    quoteC: "People keep showing up.",

    cultureEyebrow: "Celebrate Culture",
    cultureTitle: "Culture Practiced Together",
    cultureIntro:
      "Our events create space for Mongolian culture to be experienced directly through activity, movement, stories, food, music, and shared participation.",

    cultureActivities: [
      {
        id: "wrestling-activity",
        title: "Wrestling and Physical Activity",
        body:
          "Wrestling and physical activities bring energy into events while connecting people to familiar cultural traditions.",
        imageKey: "wrestling",
      },
      {
        id: "stories-memory",
        title: "Stories and Shared Heritage",
        body:
          "Dress, language, and shared memory help connect generations and keep cultural knowledge alive.",
        imageKey: "stories",
      },
      {
        id: "dance-music-performance",
        title: "Dance, Music, and Performance",
        body:
          "Dance, music, food, and performance turn gatherings into cultural spaces people can feel and remember.",
        imageKey: "dance",
      },
      {
        id: "archery-games",
        title: "Archery and Traditional Games",
        body:
          "Activities like archery and traditional games help make culture visible, active, and memorable for families and youth.",
        imageKey: "archery",
      },
    ],

    items: [
      {
        id: "stampede-naadam",
        title: "Stampede and Naadam Together",
        body:
          "A shared celebration connecting Calgary’s Stampede Breakfast spirit with Mongolian Naadam.",
        imageKey: "stampedeNaadam",
        href: "/events",
      },
      {
        id: "community-performance",
        title: "55-Person Community Performance",
        body:
        "Presented during Naadam 2022, this performance brought together 55 children, parents, performers, and volunteers through music, storytelling, and shared preparation.",
        imageKey: "performanceCover",
        href: "/gallery",
        youtubeUrl: "https://www.youtube.com/watch?v=NcmXN1s5kS8",
      },
      {
        id: "youth-spaces",
        title: "Spaces for Children and Youth",
        body:
          "Programs and gatherings help young people experience Mongolian culture as something active and shared.",
        imageKey: "youthCulture",
        href: "/gallery",
      },
    ],
  },

  mn: {
    eyebrow: "Бидний бахархал",
    title: "Бидний нөлөө",
    intro:
      "Хамт олонтойгоо хамт бүтээсэн онцгой мөчүүд, утга учиртай хэсгүүд болон бахархалт арга хэмжээнүүдийн шууд тойм.",
    viewMore: "Дэлгэрэнгүй",
    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",

    featuredLabel: "Онцлох",
    performanceLabel: "Тоглолт",
    youthLabel: "Хүүхэд залуус",

    quoteA: "Соёл бодит амьдрал дээр харагддаг.",
    quoteB: "Гэр бүлүүд илүү холбоотой болдог.",
    quoteC: "Хүмүүс үргэлж оролцож, дэмждэг.",

    cultureEyebrow: "Соёлоо тэмдэглэх",
    cultureTitle: "Соёлоо хамтдаа хэрэгжүүлэх",
    cultureIntro:
      "Манай арга хэмжээнүүд Монгол соёлыг хөдөлгөөн, түүх, хоол, хөгжим, тоглолт болон хамтын оролцоогоор шууд мэдрэх орон зайг бий болгодог.",

    cultureActivities: [
      {
        id: "wrestling-activity",
        title: "Бөх болон хөдөлгөөнт үйл ажиллагаа",
        body:
          "Бөх болон хөдөлгөөнт үйл ажиллагаа нь арга хэмжээнд эрч хүч нэмж, хүмүүсийг танил соёлын уламжлалтай холбодог.",
        imageKey: "wrestling",
      },
      {
        id: "stories-memory",
        title: "Түүх, хэл, хамтын дурсамж",
        body:
          "Түүх, хэл, хамтын дурсамж нь үе үеийг холбож, соёлын мэдлэгийг амьд байлгахад тусалдаг.",
        imageKey: "stories",
      },
      {
        id: "dance-music-performance",
        title: "Бүжиг, хөгжим болон тоглолт",
        body:
          "Бүжиг, хөгжим, хоол болон тоглолт нь уулзалтыг хүмүүсийн мэдэрч, санаж үлдэх соёлын орон зай болгодог.",
        imageKey: "dance",
      },
      {
        id: "archery-games",
        title: "Сур харваа болон уламжлалт тоглоом",
        body:
          "Сур харваа болон уламжлалт тоглоомууд соёлыг гэр бүл, хүүхэд залууст илүү бодит, идэвхтэй, дурсамжтай болгодог.",
        imageKey: "archery",
      },
    ],

    items: [
      {
        id: "stampede-naadam",
        title: "Stampede болон Наадам хамтдаа",
        body:
          "Calgary Stampede Breakfast-ийн уур амьсгалыг Монгол Наадамтай холбосон хамтын баяр.",
        imageKey: "stampedeNaadam",
        href: "/events",
      },
      {
        id: "community-performance",
        title: "55 хүний хамтын тоглолт",
        body:
          "Наадам 2022 арга хэмжээний үеэр толилуулсан энэхүү тоглолтод 55 хүүхэд, эцэг эх, уран бүтээлч, сайн дурынхан хөгжим, түүх болон хамтын бэлтгэлээр нэгдсэн.",
        imageKey: "performanceCover",
        href: "/gallery",
        youtubeUrl: "https://www.youtube.com/watch?v=NcmXN1s5kS8",
      },
      {
        id: "youth-spaces",
        title: "Хүүхэд залууст зориулсан орон зай",
        body:
          "Хөтөлбөрүүд болон цугларалтууд нь залууст Монгол соёлыг идэвхтэй, хамтын зүйл болгон мэдрэхэд тусалдаг.",
        imageKey: "youthCulture",
        href: "/gallery",
      },
    ],
  },
} as const satisfies Record<Lang, Copy>;

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

        <ImageBlock images={IMAGE_PATHS[item.imageKey]} alt={item.title} tall layout="featured-left"/>
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
  return (
    <section className="bg-[#f7f7f4] px-6 py-16 md:px-10 md:py-20">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
      {item.youtubeUrl && (
        <a
          href={item.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${item.title} on YouTube`}
          className="group relative block h-[24rem] overflow-hidden bg-[#27301d] lg:h-[34rem]"
        >
          <img
            src={IMAGE_PATHS[item.imageKey][0]}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-[#27301d] shadow-xl transition-transform duration-300 group-hover:scale-105">
              <span className="ml-1 text-3xl" aria-hidden="true">
                ▶
              </span>
            </div>
          </div>
        </a>
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

const CultureSection = memo(function CultureSection({ copy }: { copy: Copy }) {
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
          images={IMAGE_PATHS[activity.imageKey]}
          alt={activity.title}
          tall={large}
          reverse={reverse}
          layout={reverse ? "featured-right" : large ? "featured-left" : "staggered"}
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
    className="overflow-hidden bg-[#27301d] p-2 h-[26rem] lg:h-[36rem]"
>
    <img
        src={IMAGE_PATHS[item.imageKey][0]}
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
  layout === "staggered"
    ? images.slice(0, 3)
    : images.slice(0, 4);

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
    /*
      Layout 1

      ┌──────────────────────────┬─────────────┐
      │                          │      2      │
      │                          ├─────────────┤
      │            1             │      3      │
      │                          ├─────────────┤
      │                          │      4      │
      └──────────────────────────┴─────────────┘
    */
    case "featured-left":
      if (index === 0) {
        return "col-span-2 row-span-3";
      }

      return "col-span-1 row-span-1";

    /*
      Layout 2

      ┌─────────────┬──────────────────────────┐
      │      2      │                          │
      ├─────────────┤                          │
      │      3      │            1             │
      ├─────────────┤                          │
      │      4      │                          │
      └─────────────┴──────────────────────────┘
    */
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

    /*
  Staggered layout — 3 images

  ┌──────────────────────────┬─────────────┐
  │                          │      2      │
  │                          │             │
  │            1             ├─────────────┤
  │                          │      3      │
  │                          │             │
  └──────────────────────────┴─────────────┘

  Grid:
  - Photo 1: large highlighted image on the left
  - Photo 2: square image on the top-right
  - Photo 3: square image on the bottom-right
*/
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

function TextLink({ to, children }: { to: string; children: string }) {
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