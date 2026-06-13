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


const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const COPY = {
  en: {
    eyebrow: "What We Are Proud Of",
    title: "Things We Have Built Together",
    intro:
      "Over the years, Etugen Mongols has created spaces where culture, family, language, volunteering, and community pride can be seen in real life.",

    quoteIntro: "Community voices",
    legendTitle: "See highlights",

    quotes: [
      { text: "Culture represented in real life.", by: "Community member" },
      { text: "Families feel more connected.", by: "Parent" },
      { text: "People keep showing up.", by: "Volunteer" },
    ],

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

    finalTitle: "See the Events Behind the Work",
    finalBody:
      "Explore the events, gallery moments, and community gatherings that shaped what we are proud to have built together.",
    events: "View Events",
    gallery: "View Gallery",
    viewMore: "View More",
  },

  mn: {
    eyebrow: "Бидний бахархал",
    title: "Хамтдаа бүтээсэн зүйлс",
    intro:
      "Олон жилийн турш Этүгэн Монголчууд соёл, гэр бүл, хэл, сайн дурын оролцоо, хамтын бахархлыг бодитоор мэдрэх орон зайг бүтээсээр ирсэн.",

    quoteIntro: "Хамт олны дуу хоолой",
    legendTitle: "Онцлох хэсгүүд",

    quotes: [
      { text: "Соёлоо бодитоор харах боломж.", by: "Хамт олны гишүүн" },
      { text: "Гэр бүлүүд илүү холбогддог.", by: "Эцэг эх" },
      { text: "Хүмүүс үргэлж дэмждэг.", by: "Сайн дурынхан" },
    ],

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

    finalTitle: "Бүтээсэн ажлын ард буй арга хэмжээнүүд",
    finalBody:
      "Бидний хамтдаа бүтээсэн бахархалт ажлуудын ард буй арга хэмжээ, дурсамж, хамтын мөчүүдийг үзээрэй.",
    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",
    viewMore: "Дэлгэрэнгүй",
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

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <main>
        <HeaderSection copy={copy} items={copy.items} />

        {copy.items.map((item, index) => (
          <ImpactRow
            key={item.title}
            id={`impact-${index}`}
            item={item}
            viewMore={copy.viewMore}
            reverse={index % 2 === 1}
            tone={index === 1 || index === 3 ? "green" : "cream"}
            useBackground={index === 2}
          />
        ))}

        <BackgroundCta copy={copy} />

        <FinalCta copy={copy} />
      </main>
    </section>
  );
}

function HeaderSection({
  copy,
  items,
}: {
  copy: (typeof COPY)[Lang];
  items: readonly ImpactItem[];
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:pt-32">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/34" />
      <div className="absolute inset-0 bg-linear-to-b from-black/32 via-[#27301d]/20 to-[#fffaf0]/92" />

      <motion.header
        variants={sectionMotion}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-start"
      >
        <div className="bg-[#fffaf0]/92 px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:px-8 lg:px-10 lg:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#4e593c]">
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-8 text-[#fffaf0] lg:grid-cols-[1fr_0.82fr] lg:pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#e1d2a6]">
              {copy.quoteIntro}
            </p>

            <div className="mt-5 space-y-5">
              {copy.quotes.map((quote) => (
                <figure key={quote.text}>
                  <blockquote className="text-xl font-semibold italic leading-8 md:text-2xl md:leading-9">
                    “{quote.text}”
                  </blockquote>

                  <figcaption className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e1d2a6]/85">
                    — {quote.by}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <nav aria-label="Impact sections" className="lg:pt-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#e1d2a6]">
              {copy.legendTitle}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {items.map((item, index) => (
                <a
                  key={item.title}
                  href={`#impact-${index}`}
                  className="group flex items-start gap-3 text-left text-sm leading-6 text-[#fffaf0]/86 no-underline transition-colors duration-200 hover:text-[#fffaf0]"
                >
                  <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 bg-[#e1d2a6] transition-transform duration-200 group-hover:scale-125" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </motion.header>
    </section>
  );
}

function ImpactRow({
  id,
  item,
  viewMore,
  reverse = false,
  tone = "cream",
  useBackground = false,
}: {
  id: string;
  item: ImpactItem;
  viewMore: string;
  reverse?: boolean;
  tone?: "cream" | "green";
  useBackground?: boolean;
}) {
  const isGreen = tone === "green";

  const sectionClass = useBackground
    ? "relative overflow-hidden"
    : isGreen
      ? "bg-[#27301d]"
      : "bg-[#fffaf0]";

  return (
    <section id={id} className={`${sectionClass} scroll-mt-24`}>
      {useBackground && (
        <>
          <img
            src="/landingpage.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#fffaf0]/86" />
          <div className="absolute inset-0 bg-linear-to-r from-[#fffaf0]/92 via-[#fffaf0]/82 to-[#27301d]/20" />
        </>
      )}

      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto grid max-w-6xl items-center lg:min-h-[34rem] lg:grid-cols-2"
      >
        <div
          className={`flex h-full items-center px-6 py-14 md:px-10 lg:px-12 lg:py-16 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="max-w-xl">
            <h2
              className={`text-3xl font-semibold leading-tight md:text-5xl ${
                isGreen ? "text-[#fffaf0]" : "text-[#27301d]"
              }`}
            >
              {item.title}
            </h2>

            <p
              className={`mt-6 text-[15px] leading-8 ${
                isGreen ? "text-[#f3ead2]" : "text-[#4e593c]"
              }`}
            >
              {item.body}
            </p>

            <Link
              to={item.href}
              className={`mt-8 inline-flex px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] no-underline transition-colors duration-200 ${
                isGreen
                  ? "bg-[#fffaf0] text-[#27301d] hover:bg-[#e1d2a6]"
                  : "bg-[#27301d] text-[#fffaf0] hover:bg-[#b39135]"
              }`}
            >
              {viewMore}
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>

        <motion.div
          variants={imageMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className={`relative h-[22rem] overflow-hidden bg-[#27301d] sm:h-[28rem] lg:h-full ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
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

function BackgroundCta({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center md:px-10">
      <img
        src="/landingpage.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 bg-linear-to-b from-black/42 via-black/34 to-black/52" />

      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
          {copy.eyebrow}
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#fffaf0] md:text-5xl">
          {copy.finalTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#f3ead2]">
          {copy.finalBody}
        </p>
      </motion.div>
    </section>
  );
}

function FinalCta({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="bg-[#fffaf0] px-6 py-16 text-center md:px-10">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className="mx-auto max-w-4xl"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/events"
            className="inline-flex bg-[#27301d] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
          >
            {copy.events}
          </Link>

          <Link
            to="/gallery"
            className="inline-flex border border-[#b39135]/45 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#27301d] hover:text-[#fffaf0]"
          >
            {copy.gallery}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(OurImpactMain);