"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

import canadaFlag from "../../assets/canada-flag.webp";
import mongoliaFlag from "../../assets/mongolia-flag.webp";

type Lang = "en" | "mn";

type HeroProps = {
  lang: Lang;
};

type StoryItem = {
  body: string;
  image: string;
};

type Copy = {
  brand: string;
  title: string;
  subtitle: string;
  storyButton: string;
  eventHosted: string;
  viewEvents: string;
  viewPrograms: string;
  meetTeam: string;
  closing: string;
  story: readonly StoryItem[];
};

/**
 * RESOURCE:
 * Replace with the YouTube ID for the featured event video.
 * Example: https://www.youtube.com/watch?v=abc123 -> "abc123"
 */
const FEATURED_VIDEO_ID = "YOUR_FEATURED_EVENT_VIDEO_ID";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

/**
 * IMAGE RESOURCES:
 * public/landingpage.webp
 * public/about/story-community.webp
 * public/about/story-culture.webp
 * public/about/founding-group.webp
 * public/about/story-children.webp
 */
const COPY = {
  en: {
    brand: "Etugen Mongols",
    title: "Preserving heritage through culture, language, and tradition.",
    subtitle:
      "A Calgary-based Mongolian non-profit built by families, volunteers, and community members.",
    storyButton: "Our Story",
    eventHosted: "An event we hosted",
    viewEvents: "View Events",
    viewPrograms: "View Programs",
    meetTeam: "Meet the Team",
    closing:
      "We officially host events and programs for the Mongolian community in Calgary.",
    story: [
      {
        body:
          "We are first-generation immigrant parents from Mongolia. A few of us arrived in Calgary, Alberta, in 2006, drawn here in part because it felt familiar — a similar climate, mountains and rivers that remind us of our homeland, and vast open fields dotted with livestock that echo our nomadic roots. Above all, it is a country that welcomes not only people from every corner of the world, but the cultures and traditions they bring with them. Here we found our footing, grew our careers, and raised our families far from the land where we were born.",
        image: "/about/story-community.webp",
      },
      {
        body:
          "There is an old Mongolian saying: when you drink the water of a land, you honour its traditions and live by its values. We carry that wisdom with us every day, weaving our lives, our values, and our hearts into Canadian soil, as every Canadian does. At the same time, we hold our heritage close to our hearts, cherishing where we come from.",
        image: "/about/story-culture.webp",
      },
      {
        body:
          "Back then, the Mongolian community in Calgary numbered fewer than a hundred people. We knew nearly every face. And whenever our small community held an event, we showed up — each of us doing a small piece to help, to organize, and to take part with pride, simply as neighbours who didn't want our traditions to fade so far from home.",
        image: "/about/founding-group.webp",
      },
      {
        body:
          'In June 2011, a group of mothers organized our very first Children’s Day festival, "Mom, Dad and Me," at Bowness Park. With no budget and no grand plan, we simply shared a dream of building a home away from home.',
        image: "/about/story-children.webp",
      },
      {
        body:
          "From that single day, Etugen Mongols was born — not on paper, but in our shared goals and dreams. For years, we poured our open hearts into it — organizing events, bringing families together, and keeping our kids connected to their roots. As our community grew, so did the need for a true foundation. That's why we officially stepped up to establish our non-profit organization, giving us a lasting way to lead, gather, and pass our heritage on to every generation to come.",
        image: "/landingpage.webp",
      },
    ],
  },
  mn: {
    brand: "Этүгэн Монголчууд",
    title: "Соёл, хэл, уламжлалаараа дамжуулан өв соёлоо хадгална.",
    subtitle:
      "Калгари дахь Монгол гэр бүлүүд, сайн дурынхан, хамт олноор бүтсэн ашгийн бус байгууллага.",
    storyButton: "Бидний түүх",
    eventHosted: "Бидний зохион байгуулсан арга хэмжээ",
    viewEvents: "Арга хэмжээнүүд",
    viewPrograms: "Хөтөлбөрүүд",
    meetTeam: "Багтай танилцах",
    closing:
      "Бид Калгари дахь Монгол хамт олонд зориулсан арга хэмжээ, хөтөлбөрүүдийг албан ёсоор зохион байгуулдаг.",
    story: [
      {
        body:
          "Бид бол Монголоос ирсэн анхны үеийн цагаач эцэг эхчүүд. Бидний зарим нь 2006 онд Альберта мужийн Калгари хотод ирсэн. Эндхийн цаг агаар, уулс, гол мөрөн, мал бэлчсэн уудам тал нутаг нь эх орноо санагдуулам танил мэдрэмж төрүүлсэн. Хамгийн гол нь Канад улс дэлхийн өнцөг булан бүрээс ирсэн хүмүүсийг төдийгүй тэдний соёл, уламжлалыг хүндэтгэн хүлээн авдаг орон байлаа. Энд бид амьдралаа төвхнүүлж, ажил мэргэжлээ хөгжүүлж, төрсөн нутгаасаа хол гэр бүлээ өсгөсөн.",
        image: "/about/story-community.webp",
      },
      {
        body:
          "Монголчуудын дунд нэгэн үг бий: нутгийн ус уувал ёсыг нь дагана. Бид энэ ухааныг өдөр бүр сэтгэлдээ тээж, Канадын үнэт зүйлсийг хүндэтгэхийн зэрэгцээ өөрсдийн өв соёл, эх нутгаа зүрхэндээ нандигнан хадгалсаар ирсэн.",
        image: "/about/story-culture.webp",
      },
      {
        body:
          "Тэр үед Калгари дахь Монголчуудын тоо зуугаас ч цөөн байлаа. Бид бараг хүн бүрийг таньдаг байсан. Жижигхэн хамт олон маань ямар нэгэн арга хэмжээ зохион байгуулахад хүн бүр өөрийн чадах зүйлээр тусалж, оролцож, уламжлалаа эх нутгаасаа холдсон ч мартагдуулахгүй гэсэн сэтгэлээр нэгддэг байсан.",
        image: "/about/founding-group.webp",
      },
      {
        body:
          "2011 оны зургаадугаар сард хэсэг ээжүүд Боунис Паркт анхны Хүүхдийн баярын арга хэмжээ болох “Ээж, аав бид гурав”-ыг зохион байгуулсан. Төсөв ч үгүй, том төлөвлөгөө ч үгүй байсан ч бидэнд Монгол гэр бүлүүдэд зориулсан эх орноосоо хол дахь гэр мэт орон зайг бий болгох нэгэн мөрөөдөл байсан.",
        image: "/about/story-children.webp",
      },
      {
        body:
          "Тэр нэг өдрөөс Этүгэн Монголчууд төрсөн — цаасан дээр биш, харин бидний хамтын зорилго, мөрөөдөл дунд. Олон жилийн турш бид нээлттэй сэтгэлээрээ арга хэмжээ зохион байгуулж, гэр бүлүүдийг нэгтгэж, хүүхдүүдээ үндэс угсаатай нь холбосоор ирсэн. Хамт олон маань өсөхийн хэрээр бат бөх суурь хэрэгтэй болсон. Тиймээс бид ашгийн бус байгууллагаа албан ёсоор байгуулж, хойч үедээ өв соёлоо өвлүүлэн үлдээх, хамтдаа цуглах, манлайлах тогтвортой замыг бий болгосон.",
        image: "/landingpage.webp",
      },
    ],
  },
} as const satisfies Record<Lang, Copy>;

const heroMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: easeOut },
  },
};

const rowMotion: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const imageMotion: Variants = {
  hidden: { opacity: 0, scale: 1.025 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

const flagClassName = "h-6 object-contain shadow-lg md:h-8 lg:h-9";

function Hero({ lang }: HeroProps) {
  const copy = COPY[lang];

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      {/* HERO RESOURCE: public/landingpage.webp */}
      <section className="relative min-h-screen overflow-hidden bg-[#2f3320]">
        <img
          src="/landingpage.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-linear-to-r from-black/72 via-black/42 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/18 via-transparent to-black/52" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[0.95fr_0.85fr] lg:px-12">
          <motion.div
            variants={heroMotion}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            {/* FLAG RESOURCES: imported assets */}
            <div className="mb-7 flex items-center gap-3">
              <img
                src={mongoliaFlag}
                alt="Mongolia flag"
                loading="eager"
                decoding="async"
                className={flagClassName}
              />
              <img
                src={canadaFlag}
                alt="Canada flag"
                loading="eager"
                decoding="async"
                className={flagClassName}
              />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
              {copy.brand}
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight text-[#fffaf0] sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#f3ead2] md:text-lg md:leading-9">
              {copy.subtitle}
            </p>

            <a
              href="#story"
              className="mt-9 inline-flex items-center bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition-colors duration-200 hover:bg-[#e1d2a6]"
            >
              {copy.storyButton}
              <span className="ml-3">↓</span>
            </a>
          </motion.div>

          {/* FEATURED VIDEO RESOURCE: replace FEATURED_VIDEO_ID */}
          <motion.aside
            variants={heroMotion}
            initial="hidden"
            animate="show"
            className="hidden justify-self-end lg:block"
          >
            <div className="w-[28rem] border border-[#e1d2a6]/45 bg-[#fffaf0]/94 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur-sm">
              <div className="h-[15.75rem] overflow-hidden bg-[#27301d]">
                <iframe
                  src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}`}
                  title="Etugen Mongols featured event video"
                  loading="lazy"
                  className="h-full w-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex min-h-[3.75rem] items-center justify-between gap-4 px-2 pb-2 pt-4">
                <p className="max-w-[12rem] text-[11px] font-bold uppercase tracking-[0.24em] text-[#9a7b26]">
                  {copy.eventHosted}
                </p>

                <Link
                  to="/events"
                  className="shrink-0 bg-[#27301d] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
                >
                  {copy.viewEvents}
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* STORY TARGET: scroll-mt accounts for fixed header */}
      <main id="story" className="scroll-mt-20 bg-[#fffaf0]">
        {copy.story.slice(0, 4).map((item, index) => (
          <StoryRow
            key={`${lang}-${index}`}
            body={item.body}
            image={item.image}
            reverse={index % 2 === 1}
            tone={index === 1 ? "green" : "cream"}
            imageLarge={index === 2}
          />
        ))}

        {/* FINAL STORY ROW RESOURCE: public/landingpage.webp */}
        <section className="bg-[#efefec]">
          <motion.article
            variants={rowMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
            className="mx-auto grid max-w-6xl items-center lg:min-h-[34rem] lg:grid-cols-2"
          >
            <div className="flex h-full items-center px-6 py-14 text-center md:px-10 lg:px-12 lg:py-18">
              <p className="mx-auto max-w-lg text-[15px] leading-8 text-[#4e593c] sm:text-base sm:leading-8">
                {copy.story[4].body}
              </p>
            </div>

            <motion.div
              variants={imageMotion}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative h-[22rem] overflow-hidden sm:h-[28rem] lg:h-full"
            >
              <img
                src={copy.story[4].image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#27301d]/10" />
            </motion.div>
          </motion.article>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#fffaf0] px-6 py-20 text-center md:px-10">
          <motion.div
            variants={rowMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
              {copy.brand}
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
              {copy.closing}
            </h2>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/about/team"
                className="inline-flex bg-[#27301d] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
              >
                {copy.meetTeam}
              </Link>

              <Link
                to="/events"
                className="inline-flex border border-[#27301d]/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#27301d] hover:text-[#fffaf0]"
              >
                {copy.viewEvents}
              </Link>

              <Link
                to="/about/programs"
                className="inline-flex border border-[#b39135]/45 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#b39135] hover:text-[#fffaf0]"
              >
                {copy.viewPrograms}
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </section>
  );
}

type StoryRowProps = {
  body: string;
  image: string;
  reverse?: boolean;
  tone?: "cream" | "green";
  imageLarge?: boolean;
};

function StoryRow({
  body,
  image,
  reverse = false,
  tone = "cream",
  imageLarge = false,
}: StoryRowProps) {
  const isGreen = tone === "green";

  return (
    <section className={isGreen ? "bg-[#27301d]" : "bg-[#fffaf0]"}>
      <motion.article
        variants={rowMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className={`mx-auto grid max-w-6xl items-center lg:grid-cols-2 ${
          imageLarge ? "lg:min-h-[39rem]" : "lg:min-h-[32rem]"
        }`}
      >
        <div
          className={`flex h-full items-center px-6 py-14 md:px-10 lg:px-12 lg:py-16 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <p
            className={`max-w-lg text-[15px] leading-8 sm:text-base sm:leading-8 ${
              isGreen ? "text-[#f3ead2]" : "text-[#4e593c]"
            }`}
          >
            {body}
          </p>
        </div>

        {/* STORY IMAGE RESOURCE: image path comes from COPY.story */}
        <motion.div
          variants={imageMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={`relative h-[22rem] overflow-hidden sm:h-[28rem] lg:h-full ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#27301d]/10" />
        </motion.div>
      </motion.article>
    </section>
  );
}

export default memo(Hero);