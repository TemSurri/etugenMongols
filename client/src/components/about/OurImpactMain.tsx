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

type Quote = {
  text: string;
  by: string;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

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

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

function OurImpactMain({ lang }: OurImpactMainProps) {
  const copy = COPY[lang];
  const [stampede, performance, culture, people, youth] = copy.items;

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <Hero copy={copy} />

      <main id="impact" className="scroll-mt-20">
        <FeatureSection
          item={stampede}
          eyebrow={copy.eyebrow}
          viewMore={copy.viewMore}
        />

        <GreenStatement
          item={performance}
          eyebrow={copy.eyebrow}
          viewMore={copy.viewMore}
        />

        <BackgroundGlimpse>
          <TwoColumnImpact
            imageItem={performance}
            cards={[culture, people]}
            viewMore={copy.viewMore}
          />
        </BackgroundGlimpse>

        <VoicesSection copy={copy} />

        <YouthSection item={youth} viewMore={copy.viewMore} />

        <BackgroundCta copy={copy} />

        <FinalCta copy={copy} />
      </main>
    </section>
  );
}

function Hero({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#2f3320]">
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/42" />
      <div className="absolute inset-0 bg-linear-to-r from-black/76 via-black/46 to-black/12" />
      <div className="absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/60" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-16 pt-28 md:px-10 lg:px-12">
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-[#fffaf0] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f3ead2] md:text-lg md:leading-9">
            {copy.intro}
          </p>

          <a
            href="#impact"
            className="mt-9 inline-flex items-center bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-[#e1d2a6]"
          >
            {copy.viewMore}
            <span className="ml-3">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureSection({
  item,
  eyebrow,
  viewMore,
}: {
  item: ImpactItem;
  eyebrow: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"
      >
        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
            {item.title}
          </h2>

          <div className="mt-5 h-px w-24 bg-[#b39135]" />

          <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
            {item.body}
          </p>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>

        <SimpleImage src={item.image} alt={item.title} large />
      </motion.article>
    </section>
  );
}

function GreenStatement({
  item,
  eyebrow,
  viewMore,
}: {
  item: ImpactItem;
  eyebrow: string;
  viewMore: string;
}) {
  return (
    <section className="bg-[#27301d] px-6 py-20 text-[#fffaf0] md:px-10">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"
      >
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#d6b85d]">
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {item.title}
          </h2>
        </div>

        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-[15px] leading-8 text-[#f3ead2]">{item.body}</p>

          <Link
            to={item.href}
            className="mt-7 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
          >
            {viewMore}
            <span className="ml-3">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function BackgroundGlimpse({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10">
      <img
        src="/landingpage.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/52" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function TwoColumnImpact({
  imageItem,
  cards,
  viewMore,
}: {
  imageItem: ImpactItem;
  cards: ImpactItem[];
  viewMore: string;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
      <SimpleImage src={imageItem.image} alt={imageItem.title} tall />

      <div className="grid gap-5">
        {cards.map((item) => (
          <ImpactMiniCard key={item.title} item={item} viewMore={viewMore} />
        ))}
      </div>
    </div>
  );
}

function VoicesSection({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
              Shared Voices
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
              {copy.voicesTitle}
            </h2>
          </div>

          <QuoteCard quote={copy.quotes[0]} featured />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {copy.quotes.slice(1).map((quote) => (
            <QuoteCard key={quote.text} quote={quote} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function YouthSection({
  item,
  viewMore,
}: {
  item: ImpactItem;
  viewMore: string;
}) {
  return (
    <section className="bg-[#efefec] px-6 py-20 md:px-10">
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <SimpleImage src={item.image} alt={item.title} large />

        <div className="max-w-xl lg:justify-self-end">
          <h2 className="text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
            {item.title}
          </h2>

          <div className="mt-5 h-px w-24 bg-[#b39135]" />

          <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
            {item.body}
          </p>

          <TextLink to={item.href}>{viewMore}</TextLink>
        </div>
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

      <div className="absolute inset-0 bg-black/55" />

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
          {copy.moreTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#f3ead2]">
          {copy.moreBody}
        </p>
      </motion.div>
    </section>
  );
}

function FinalCta({ copy }: { copy: (typeof COPY)[Lang] }) {
  return (
    <section className="bg-[#fffaf0] px-6 py-20 text-center md:px-10">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-4xl"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
          {copy.eyebrow}
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
          {copy.moreTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#4e593c]">
          {copy.moreBody}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
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

function SimpleImage({
  src,
  alt,
  large = false,
  tall = false,
}: {
  src: string;
  alt: string;
  large?: boolean;
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
        large ? "h-[24rem] lg:h-[34rem]" : "",
        tall ? "h-[24rem] sm:h-[30rem] lg:h-full" : "",
        !large && !tall ? "h-[22rem] sm:h-[28rem]" : "",
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#27301d]/10" />
    </motion.div>
  );
}

function ImpactMiniCard({
  item,
  viewMore,
}: {
  item: ImpactItem;
  viewMore: string;
}) {
  return (
    <motion.article
      variants={sectionMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#fffaf0] p-6 shadow-[0_16px_44px_rgba(0,0,0,0.18)]"
    >
      <h3 className="text-2xl font-semibold leading-tight text-[#27301d]">
        {item.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#4e593c]">{item.body}</p>

      <Link
        to={item.href}
        className="mt-6 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7b26] no-underline transition-colors duration-200 hover:text-[#27301d]"
      >
        {viewMore}
        <span className="ml-3">→</span>
      </Link>
    </motion.article>
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
      variants={sectionMotion}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={[
        "relative overflow-hidden border bg-white shadow-[0_16px_44px_rgba(39,48,29,0.09)]",
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

function TextLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="mt-8 inline-flex bg-[#27301d] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
    >
      {children}
      <span className="ml-3">→</span>
    </Link>
  );
}

export default memo(OurImpactMain);