"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

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

type Quote = {
  text: string;
  by: string;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const gridMotion: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const COPY = {
  en: {
    eyebrow: "Our Impact",
    title: "Community Building in Action",
    intro:
      "Our impact is seen through shared cultural moments, family participation, volunteer work, and community-led celebrations.",

    items: [
      {
        title: "Bringing Calgary and Mongolian Culture Together",
        body:
          "A shared celebration connecting the Calgary Stampede Breakfast spirit with Mongolian Naadam.",
        image: "/about/impact/stampede-naadam.webp",
        href: "/events",
      },
      {
        title: "55-Person Community Performance",
        body:
          "Children, parents, performers, and volunteers came together through song, rehearsal, and performance.",
        image: "/about/impact/community-song.webp",
        href: "/events",
      },
      {
        title: "Culture Practiced Together",
        body:
          "Events create spaces where language, food, music, and tradition can be experienced across generations.",
        image: "/about/impact/stampede-naadam-small-1.webp",
        href: "/gallery",
      },
      {
        title: "People Showing Up",
        body:
          "Our work continues because families, volunteers, sponsors, and supporters keep building together.",
        image: "/about/impact/community-song-small-1.webp",
        href: "/about/team",
      },
      {
        title: "Creating Spaces for Children and Youth",
        body:
          "Programs and gatherings help young people experience Mongolian culture as something active, visible, and shared.",
        image: "/about/impact/youth-culture.webp",
        href: "/gallery",
      },
    ],

    quotes: [
      { text: "Culture represented in real life.", by: "Community member" },
      { text: "Families feel more connected.", by: "Parent" },
      { text: "People keep showing up.", by: "Volunteer" },
      { text: "A place to feel proud.", by: "Community supporter" },
    ],

    voicesTitle: "Small moments that show the bigger picture.",
    moreTitle: "See the Events Behind the Impact",
    moreBody:
      "Every gathering tells part of the story. Explore upcoming events, past celebrations, and gallery moments to see how the community continues to build this impact together.",

    events: "View Events",
    gallery: "View Gallery",
    viewMore: "View More",
  },

  mn: {
    eyebrow: "Бидний нөлөө",
    title: "Хамт олноор бүтсэн нөлөө",
    intro:
      "Бидний нөлөө нь соёлын мөчүүд, гэр бүлийн оролцоо, сайн дурын ажил болон хамтын баяраар харагддаг.",

    items: [
      {
        title: "Калгари болон Монгол соёлыг холбосон",
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
        title: "Соёлоо хамтдаа амьд байлгах",
        body:
          "Хэл, хоол, дуу хөгжим, уламжлалаа үе үеэрээ мэдрэх орон зайг бий болгодог.",
        image: "/about/impact/stampede-naadam-small-1.webp",
        href: "/gallery",
      },
      {
        title: "Хүмүүс хамтдаа оролцдог",
        body:
          "Гэр бүлүүд, сайн дурынхан, ивээн тэтгэгчид болон дэмжигчид хамтдаа бүтээдэг.",
        image: "/about/impact/community-song-small-1.webp",
        href: "/about/team",
      },
      {
        title: "Хүүхэд залууст зориулсан орон зай",
        body:
          "Хөтөлбөр, уулзалтууд нь хүүхэд залууст Монгол соёлыг бодитоор, хамтдаа мэдрэх боломж өгдөг.",
        image: "/about/impact/youth-culture.webp",
        href: "/gallery",
      },
    ],

    quotes: [
      { text: "Соёлоо бодитоор харах боломж.", by: "Хамт олны гишүүн" },
      { text: "Гэр бүлүүд илүү холбогддог.", by: "Эцэг эх" },
      { text: "Хүмүүс үргэлж дэмждэг.", by: "Сайн дурынхан" },
      { text: "Бахархах орон зай.", by: "Дэмжигч" },
    ],

    voicesTitle: "Жижиг мөчүүд том нөлөөг харуулдаг.",
    moreTitle: "Нөлөөг бүтээсэн арга хэмжээнүүд",
    moreBody:
      "Арга хэмжээ бүр энэ түүхийн нэг хэсэг юм. Ирэх арга хэмжээ, өнгөрсөн баярууд болон галерейн дурсамжуудаас хамт олон энэ нөлөөг хэрхэн бүтээснийг хараарай.",

    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",
    viewMore: "Дэлгэрэнгүй",
  },
} as const;

function ImpactTile({
  item,
  className = "",
  large = false,
  compact = false,
  eager = false,
  viewMore,
}: {
  item: ImpactItem;
  className?: string;
  large?: boolean;
  compact?: boolean;
  eager?: boolean;
  viewMore: string;
}) {
  return (
    <motion.div variants={cardMotion} className={className}>
      <Link
        to={item.href}
        className="
          group relative block h-full min-h-[18rem] overflow-hidden rounded-lg
          border border-[#e1d2a6]/45 bg-[#27301d]
          shadow-[0_24px_70px_rgba(0,0,0,0.3)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b04c]
        "
      >
        <img
          src={item.image}
          alt={item.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.045]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/42 to-black/8" />
        <div className="absolute inset-0 bg-linear-to-r from-black/36 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <h2
            className={[
              "max-w-2xl font-semibold leading-tight tracking-tight text-[#fffaf0]",
              large
                ? "text-3xl sm:text-4xl lg:text-[2.85rem]"
                : compact
                  ? "text-lg sm:text-xl"
                  : "text-xl sm:text-2xl",
            ].join(" ")}
          >
            {item.title}
          </h2>

          {!compact && (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/86">
              {item.body}
            </p>
          )}

          <span className="mt-5 inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d6b04c]">
            {viewMore} →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function QuoteCard({
  quote,
  featured = false,
}: {
  quote: Quote;
  featured?: boolean;
}) {
  return (
    <motion.figure
      variants={cardMotion}
      className={[
        "relative overflow-hidden rounded-lg border bg-white shadow-[0_16px_44px_rgba(39,48,29,0.09)]",
        featured ? "border-[#b39135]/55 p-8 md:p-10" : "border-[#d8caa5] p-6",
      ].join(" ")}
    >
      <div className="absolute -right-2 -top-7 font-serif text-[9rem] leading-none text-[#b39135]/10">
        “
      </div>

      <blockquote
        className={[
          "relative z-10 font-semibold italic text-[#27301d]",
          featured
            ? "text-2xl leading-10 md:text-3xl md:leading-[3rem]"
            : "text-lg leading-8",
        ].join(" ")}
      >
        {quote.text}
      </blockquote>

      <figcaption className="relative z-10 mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
        — {quote.by}
      </figcaption>
    </motion.figure>
  );
}

function OurImpactMain({ lang }: OurImpactMainProps) {
  const copy = COPY[lang];
  const topItems = copy.items.slice(0, 3);
  const lowerItems = copy.items.slice(3);

  return (
    <section className="relative overflow-hidden text-[#27301d]">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-6 sm:pt-40 md:px-10 lg:px-12 lg:pb-24 lg:pt-44">
        <motion.header
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="
            mb-8 rounded-lg border border-[#e1d2a6]/55
            bg-[#fffaf0]/94 px-6 py-7
            shadow-[0_24px_70px_rgba(0,0,0,0.34)]
            backdrop-blur-sm md:px-8 md:py-8
          "
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.65rem]">
                {copy.title}
              </h1>
            </div>

            <p className="max-w-xl border-t border-[#d8caa5]/90 pt-5 text-sm leading-7 text-[#4e593c] md:border-l md:border-t-0 md:pl-7 md:pt-0 md:text-[15px]">
              {copy.intro}
            </p>
          </div>
        </motion.header>

        <motion.div
          variants={gridMotion}
          initial="hidden"
          animate="show"
          className="grid gap-5 lg:grid-cols-6 lg:auto-rows-[13.5rem]"
        >
          <ImpactTile
            item={topItems[0]}
            large
            eager
            viewMore={copy.viewMore}
            className="lg:col-span-4 lg:row-span-3"
          />

          <ImpactTile
            item={topItems[1]}
            viewMore={copy.viewMore}
            className="lg:col-span-2 lg:row-span-2"
          />

          <ImpactTile
            item={topItems[2]}
            compact
            viewMore={copy.viewMore}
            className="lg:col-span-2 lg:row-span-1"
          />
        </motion.div>
      </div>

      <section className="relative bg-[#fffaf0] px-5 py-20 text-[#27301d] sm:px-6 md:px-10 lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/12 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
            className="mb-12 max-w-3xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9a7b26]">
              Shared Voices
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {copy.voicesTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={gridMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <QuoteCard quote={copy.quotes[0]} featured />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <QuoteCard quote={copy.quotes[1]} />
              <QuoteCard quote={copy.quotes[2]} />
            </div>
          </motion.div>

          <motion.div
            variants={gridMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-5 lg:grid-cols-2"
          >
            {lowerItems.map((item) => (
              <ImpactTile
                key={item.title}
                item={item}
                viewMore={copy.viewMore}
              />
            ))}
          </motion.div>

          <motion.div
            variants={gridMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <QuoteCard quote={copy.quotes[3]} />

            <motion.section
              variants={cardMotion}
              className="
                rounded-lg border border-[#d8caa5]
                bg-white px-6 py-9
                shadow-[0_18px_48px_rgba(39,48,29,0.1)]
                md:px-10
              "
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {copy.moreTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4e593c]">
                {copy.moreBody}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/events"
                  className="
                    inline-flex rounded-sm border border-[#27301d] bg-[#27301d]
                    px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]
                    text-[#fffaf0] transition-colors
                    hover:bg-transparent hover:text-[#27301d]
                  "
                >
                  {copy.events}
                </Link>

                <Link
                  to="/gallery"
                  className="
                    inline-flex rounded-sm border border-[#b39135]/55
                    px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]
                    text-[#27301d] transition-colors
                    hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]
                  "
                >
                  {copy.gallery}
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </section>
    </section>
  );
}

export default memo(OurImpactMain);