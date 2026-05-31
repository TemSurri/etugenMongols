"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type OurImpactMainProps = {
  lang: Lang;
};

type ImpactItem = {
  tag: string;
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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
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
        tag: "Cultural Connection",
        title: "Bringing Calgary and Mongolian Culture Together",
        body:
          "A shared celebration connecting the Calgary Stampede Breakfast spirit with Mongolian Naadam.",
        image: "/about/impact/stampede-naadam.webp",
        href: "/events",
      },
      {
        tag: "Community Performance",
        title: "55-Person Community Performance",
        body:
          "Children, parents, performers, and volunteers came together through song, rehearsal, and performance.",
        image: "/about/impact/community-song.webp",
        href: "/events",
      },
      {
        tag: "Shared Traditions",
        title: "Culture Practiced Together",
        body:
          "Events create spaces where language, food, music, and tradition can be experienced across generations.",
        image: "/about/impact/stampede-naadam-small-1.webp",
        href: "/gallery",
      },
      {
        tag: "Volunteer Support",
        title: "People Showing Up",
        body:
          "Our work continues because families, volunteers, sponsors, and supporters keep building together.",
        image: "/about/impact/community-song-small-1.webp",
        href: "/about/team",
      },
      {
        tag: "Next Generation",
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
        tag: "Соёлын холбоо",
        title: "Калгари болон Монгол соёлыг холбосон",
        body:
          "Calgary Stampede Breakfast-ийн уур амьсгалыг Монгол Наадамтай холбосон хамтын баяр.",
        image: "/about/impact/stampede-naadam.webp",
        href: "/events",
      },
      {
        tag: "Хамтын тоглолт",
        title: "55 хүнтэй хамтын тоглолт",
        body:
          "Хүүхдүүд, эцэг эхчүүд, уран бүтээлчид болон сайн дурынхан хамтдаа бэлтгэл хийж, тоглосон.",
        image: "/about/impact/community-song.webp",
        href: "/events",
      },
      {
        tag: "Уламжлал",
        title: "Соёлоо хамтдаа амьд байлгах",
        body:
          "Хэл, хоол, дуу хөгжим, уламжлалаа үе үеэрээ мэдрэх орон зайг бий болгодог.",
        image: "/about/impact/stampede-naadam-small-1.webp",
        href: "/gallery",
      },
      {
        tag: "Дэмжлэг",
        title: "Хүмүүс хамтдаа оролцдог",
        body:
          "Гэр бүлүүд, сайн дурынхан, ивээн тэтгэгчид болон дэмжигчид хамтдаа бүтээдэг.",
        image: "/about/impact/community-song-small-1.webp",
        href: "/about/team",
      },
      {
        tag: "Дараагийн үе",
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

    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",
    viewMore: "Дэлгэрэнгүй",
  },
} as const;

function QuoteRow({
  quotes,
  compact = false,
  align = "center",
}: {
  quotes: readonly Quote[];
  compact?: boolean;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={sectionMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={[
        "my-8 grid gap-4 rounded-md border border-[#e1d2a6]/45",
        "bg-[#fffaf0]/94 px-5 py-6",
        "shadow-[0_18px_52px_rgba(0,0,0,0.22)] backdrop-blur-sm",
        quotes.length > 1 ? "md:grid-cols-2 md:px-7" : "",
        compact && align === "center" ? "mx-auto max-w-2xl" : "",
        compact && align === "left" ? "ml-0 mr-auto max-w-2xl lg:ml-12" : "",
      ].join(" ")}
    >
      {quotes.map((quote, index) => (
        <figure
          key={`${quote.text}-${index}`}
          className={[
            "min-w-0 px-1",
            index > 0
              ? "border-t border-[#d8caa5] pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0"
              : "",
          ].join(" ")}
        >
          <blockquote className="text-lg font-medium italic leading-8 text-[#27301d]">
            “{quote.text}”
          </blockquote>

          <figcaption className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
            — {quote.by}
          </figcaption>
        </figure>
      ))}
    </motion.div>
  );
}

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
    <Link
      to={item.href}
      className={[
        "group relative block min-h-[16rem] overflow-hidden rounded-md",
        "border border-[#e1d2a6]/40 bg-[#27301d]",
        "shadow-[0_22px_60px_rgba(0,0,0,0.28)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b04c]",
        className,
      ].join(" ")}
    >
      <img
        src={item.image}
        alt={item.title}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/84 via-black/32 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className="mb-3 inline-flex rounded-sm bg-[#fffaf0]/92 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
          {item.tag}
        </p>

        <h2
          className={[
            "max-w-2xl font-semibold leading-tight tracking-tight text-[#fffaf0]",
            large
              ? "text-3xl sm:text-4xl lg:text-[2.65rem]"
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
  );
}

function OurImpactMain({ lang }: OurImpactMainProps) {
  const copy = COPY[lang];

  return (
    <section
      className="
        relative isolate min-h-screen overflow-hidden bg-[#2f3320] text-[#27301d]
        before:fixed before:inset-0 before:-z-10
        before:bg-[url('/landingpage.webp')]
        before:bg-cover before:bg-center before:bg-no-repeat
        after:fixed after:inset-0 after:-z-10 after:bg-black/44
      "
    >
      <div className="fixed inset-0 -z-10 bg-linear-to-r from-black/58 via-black/24 to-black/46" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 sm:pt-28 md:px-10 lg:px-12 lg:pt-32">
        <motion.header
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="
            mb-6 rounded-md border border-[#e1d2a6]/55
            bg-[#fffaf0]/94 px-6 py-6
            shadow-[0_24px_70px_rgba(0,0,0,0.34)]
            backdrop-blur-sm md:px-7
          "
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.45rem]">
                {copy.title}
              </h1>
            </div>

            <p className="max-w-xl border-t border-[#d8caa5]/90 pt-4 text-sm leading-7 text-[#4e593c] md:border-l md:border-t-0 md:pl-6 md:pt-0 md:text-[15px]">
              {copy.intro}
            </p>
          </div>
        </motion.header>

        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="relative grid gap-4 lg:grid-cols-6 lg:auto-rows-[13rem]"
        >
          <ImpactTile
            item={copy.items[0]}
            large
            eager
            viewMore={copy.viewMore}
            className="lg:col-span-4 lg:row-span-3"
          />

          <ImpactTile
            item={copy.items[1]}
            viewMore={copy.viewMore}
            className="lg:col-span-2 lg:row-span-2"
          />

          <ImpactTile
            item={copy.items[2]}
            compact
            viewMore={copy.viewMore}
            className="lg:col-span-2 lg:row-span-1"
          />
        </motion.div>

        <QuoteRow quotes={[copy.quotes[0]]} compact align="left" />

        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="relative grid gap-4 lg:grid-cols-6 lg:auto-rows-[13rem]"
        >
          <ImpactTile
            item={copy.items[3]}
            viewMore={copy.viewMore}
            className="lg:col-span-3 lg:row-span-2"
          />

          <ImpactTile
            item={copy.items[4]}
            viewMore={copy.viewMore}
            className="lg:col-span-3 lg:row-span-2"
          />
        </motion.div>

        <QuoteRow quotes={[copy.quotes[1], copy.quotes[2]]} />

        <QuoteRow quotes={[copy.quotes[3]]} compact />

        <motion.section
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="
            mx-auto mt-10 max-w-4xl rounded-md border border-[#e1d2a6]/55
            bg-[#fffaf0]/94 px-6 py-8 text-center
            shadow-[0_24px_70px_rgba(0,0,0,0.28)]
            backdrop-blur-sm md:px-10
          "
        >
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {copy.title}
          </h2>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/events"
              className="
                inline-flex rounded-sm border border-[#27301d] bg-[#27301d]
                px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]
                text-[#fffaf0] transition-colors
                hover:bg-transparent hover:text-[#27301d]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b04c]
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
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b04c]
              "
            >
              {copy.gallery}
            </Link>
          </div>
        </motion.section>
      </div>
    </section>
  );
}

export default memo(OurImpactMain);