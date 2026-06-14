"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type OurImpactMainProps = {
  lang: Lang;
};

type ImpactItem = {
  title: string;
  body: string;
  image: string;
  href: string;
};

type CultureActivity = {
  title: string;
  body: string;
  image: string;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const COPY = {
  en: {
    eyebrow: "What We Are Proud Of",
    title: "Our Impact",
    intro:
      "A direct look at some of the notable moments, special parts, and meaningful events we are proud to have created with the community.",
    viewMore: "View More",
    events: "View Events",
    gallery: "View Gallery",

    quoteA: "Culture represented in real life.",
    quoteB: "Families feel more connected.",
    quoteC: "People keep showing up.",

    cultureEyebrow: "Celebrate Culture",
    cultureTitle: "Culture Practiced Together",
    cultureIntro:
      "Our events create space for Mongolian culture to be experienced directly through activity, movement, stories, food, music, and shared participation.",

    cultureActivities: [
      {
        title: "Archery and Traditional Games",
        body:
          "Activities like archery and traditional games help make culture visible, active, and memorable for families and youth.",
        image: "/about/impact/archery.webp",
      },
      {
        title: "Wrestling and Physical Activity",
        body:
          "Wrestling and physical activities bring energy into events while connecting people to familiar cultural traditions.",
        image: "/about/impact/wrestling.webp",
      },
      {
        title: "Stories and Shared Memory",
        body:
          "Stories, language, and shared memory help connect generations and keep cultural knowledge alive.",
        image: "/about/impact/stories.webp",
      },
      {
        title: "Dance, Music, and Performance",
        body:
          "Dance, music, food, and performance turn gatherings into cultural spaces people can feel and remember.",
        image: "/about/impact/dance.webp",
      },
    ],

    items: [
      {
        title: "Stampede and Naadam Together",
        body:
          "A shared celebration connecting Calgary’s Stampede Breakfast spirit with Mongolian Naadam.",
        image: "/about/impact/stampede-naadam.webp",
        href: "/events",
      },
      {
        title: "55-Person Community Performance",
        body:
          "Children, parents, performers, and volunteers came together through rehearsal, song, and performance.",
        image: "/about/impact/community-song.webp",
        href: "/events",
      },
      {
        title: "Spaces for Children and Youth",
        body:
          "Programs and gatherings help young people experience Mongolian culture as something active and shared.",
        image: "/about/impact/youth-culture.webp",
        href: "/gallery",
      },
    ],
  },

  mn: {
    eyebrow: "Бидний бахархал",
    title: "Бидний нөлөө",
    intro:
      "Бидний хамт олонтойгоо хамт бүтээсэн онцгой мөчүүд, бахархалт хэсгүүд болон утга учиртай арга хэмжээнүүдийн шууд тойм.",
    viewMore: "Дэлгэрэнгүй",
    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",

    quoteA: "Соёлоо бодитоор харах боломж.",
    quoteB: "Гэр бүлүүд илүү холбогддог.",
    quoteC: "Хүмүүс үргэлж дэмждэг.",

    cultureEyebrow: "Соёлоо тэмдэглэх",
    cultureTitle: "Соёлоо хамтдаа амьд байлгах",
    cultureIntro:
      "Манай арга хэмжээнүүд Монгол соёлыг хөдөлгөөн, түүх, хоол, хөгжим, тоглолт болон хамтын оролцоогоор бодитоор мэдрэх орон зайг бий болгодог.",

    cultureActivities: [
      {
        title: "Сур харваа болон уламжлалт тоглоом",
        body:
          "Сур харваа болон уламжлалт тоглоомууд соёлыг хүүхэд залуус, гэр бүлүүдэд илүү бодит, идэвхтэй, дурсамжтай болгодог.",
        image: "/about/impact/archery.webp",
      },
      {
        title: "Бөх болон хөдөлгөөнт үйл ажиллагаа",
        body:
          "Бөх болон хөдөлгөөнт үйл ажиллагаа нь арга хэмжээнд эрч хүч нэмж, уламжлалтай холбодог.",
        image: "/about/impact/wrestling.webp",
      },
      {
        title: "Түүх, хэл, дурсамж",
        body:
          "Түүх, хэл, хамтын дурсамж нь үе үеийг холбож, соёлын мэдлэгийг амьд байлгадаг.",
        image: "/about/impact/stories.webp",
      },
      {
        title: "Бүжиг, хөгжим болон тоглолт",
        body:
          "Бүжиг, хөгжим, хоол болон тоглолт нь уулзалтыг хүмүүсийн мэдэрч, санаж үлдэх соёлын орон зай болгодог.",
        image: "/about/impact/dance.webp",
      },
    ],

    items: [
      {
        title: "Stampede болон Наадам хамтдаа",
        body:
          "Calgary Stampede Breakfast-ийн уур амьсгалыг Монгол Наадамтай холбосон хамтын баяр.",
        image: "/about/impact/stampede-naadam.webp",
        href: "/events",
      },
      {
        title: "55 хүнтэй хамтын тоглолт",
        body:
          "Хүүхдүүд, эцэг эхчүүд, уран бүтээлчид болон сайн дурынхан хамтдаа бэлтгэл хийж, тоглосон.",
        image: "/about/impact/community-song.webp",
        href: "/events",
      },
      {
        title: "Хүүхэд залууст зориулсан орон зай",
        body:
          "Хүүхэд залууст Монгол соёлыг бодитоор, хамтдаа мэдрэх боломж өгдөг.",
        image: "/about/impact/youth-culture.webp",
        href: "/gallery",
      },
    ],
  },
} as const;

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

function OurImpactMain({ lang }: OurImpactMainProps) {
  const copy = COPY[lang];
  const [main, performance, youth] = copy.items;

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <main>
        <Hero copy={copy} />

        <FeaturedImpact item={main} quote={copy.quoteA} viewMore={copy.viewMore} />

        <PerformanceBand
          item={performance}
          quote={copy.quoteB}
          viewMore={copy.viewMore}
        />

        <CultureSection copy={copy} />

        <YouthBlock item={youth} quote={copy.quoteC} viewMore={copy.viewMore} />

        <FinalLinks events={copy.events} gallery={copy.gallery} />
      </main>
    </section>
  );
}

function Hero({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:pt-32">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-linear-to-r from-black/76 via-black/42 to-black/16" />
      <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/58" />

      <motion.div
        variants={sectionMotion}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-6xl text-[#fffaf0]"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
          {copy.eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {copy.title}
        </h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#f3ead2] md:text-base">
          {copy.intro}
        </p>
      </motion.div>
    </section>
  );
}

function FeaturedImpact({
  item,
  quote,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center"
      >
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            Featured
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
            {item.body}
          </p>

          <p className="mt-8 text-2xl font-semibold italic leading-9 text-[#27301d]">
            “{quote}”
          </p>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>

        <ImageBlock src={item.image} alt={item.title} tall />
      </motion.article>
    </section>
  );
}

function PerformanceBand({
  item,
  quote,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#27301d] px-6 py-20 text-[#fffaf0] md:px-10">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        <ImageBlock src={item.image} alt={item.title} tall />

        <div className="max-w-xl lg:justify-self-end">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
            Performance
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#f3ead2]">
            {item.body}
          </p>

          <p className="mt-8 text-2xl font-semibold italic leading-9 text-[#fffaf0]">
            “{quote}”
          </p>

          <Link
            to={item.href}
            className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
          >
            {viewMore}
            <span className="ml-3">→</span>
          </Link>
        </div>
      </motion.article>
    </section>
  );
}

function CultureSection({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="bg-[#fffaf0]">
      <div className="px-6 py-20 text-center md:px-10">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {copy.cultureEyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">
            {copy.cultureTitle}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#4e593c]">
            {copy.cultureIntro}
          </p>
        </motion.div>
      </div>

      {copy.cultureActivities.map((activity, index) => (
        <CultureActivityRow
          key={activity.title}
          activity={activity}
          reverse={index % 2 === 1}
          large={index === 0 || index === 3}
          muted={index === 1}
        />
      ))}
    </section>
  );
}

function CultureActivityRow({
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
    <section className={muted ? "bg-[#efefec]" : "bg-[#fffaf0]"}>
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

            <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
              {activity.body}
            </p>
          </div>
        </div>

        <motion.div
          variants={imageMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className={[
            "relative overflow-hidden bg-[#27301d]",
            large ? "h-[26rem] lg:h-full" : "h-[21rem] lg:h-full",
            reverse ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <img
            src={activity.image}
            alt={activity.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </motion.article>
    </section>
  );
}

function YouthBlock({
  item,
  quote,
  viewMore,
}: {
  item: ImpactItem;
  quote: string;
  viewMore: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-10">
      <img
        src="/landingpage.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 bg-linear-to-r from-black/68 via-black/42 to-black/20" />

      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <div className="text-[#fffaf0]">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
            Youth
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#f3ead2]">
            {item.body}
          </p>

          <p className="mt-8 max-w-xl text-2xl font-semibold italic leading-9 text-[#fffaf0]">
            “{quote}”
          </p>

          <Link
            to={item.href}
            className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
          >
            {viewMore}
            <span className="ml-3">→</span>
          </Link>
        </div>

        <ImageBlock src={item.image} alt={item.title} tall />
      </motion.article>
    </section>
  );
}

function FinalLinks({ events, gallery }: { events: string; gallery: string }) {
  return (
    <section className="bg-[#27301d] px-6 py-14 text-center md:px-10">
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/events"
          className="inline-flex bg-[#fffaf0] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
        >
          {events}
        </Link>

        <Link
          to="/gallery"
          className="inline-flex border border-[#fffaf0]/35 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#fffaf0] hover:text-[#27301d]"
        >
          {gallery}
        </Link>
      </div>
    </section>
  );
}

function ImageBlock({
  src,
  alt,
  tall = false,
}: {
  src: string;
  alt: string;
  tall?: boolean;
}) {
  return (
    <motion.div
      variants={imageMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={[
        "relative overflow-hidden bg-[#27301d]",
        tall ? "h-[24rem] lg:h-[36rem]" : "h-[18rem]",
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
    </motion.div>
  );
}

function TextLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="mt-7 inline-flex bg-[#27301d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
    >
      {children}
      <span className="ml-3">→</span>
    </Link>
  );
}

export default memo(OurImpactMain);