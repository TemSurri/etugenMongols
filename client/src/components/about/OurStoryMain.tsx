"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type OurStoryMainProps = {
  lang: Lang;
};

type StoryImageKey =
  | "community"
  | "culture"
  | "founding"
  | "children"
  | "landing";

type StoryItem = {
  body: string;
  imageKey: StoryImageKey;
};

type Copy = {
  brand: string;
  storyTitle: string;
  viewEvents: string;
  viewPrograms: string;
  meetTeam: string;
  closing: string;
  story: readonly StoryItem[];
};

type StoryRowProps = {
  body: string;
  image: string;
  reverse?: boolean;
  tone?: "cream" | "green";
  imageLarge?: boolean;
};

const IMAGE_PATHS: Record<StoryImageKey, string> = {
  community: "/about/story-community.webp",
  culture: "/about/story-culture.webp",
  founding: "/about/founding-group.webp",
  children: "/about/story-children.webp",
  landing: "/landingpage.webp",
};

const STORY_ROW_CONFIG = [
  { reverse: false, tone: "cream", imageLarge: false },
  { reverse: true, tone: "green", imageLarge: false },
  { reverse: false, tone: "cream", imageLarge: true },
  { reverse: true, tone: "cream", imageLarge: false },
] as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

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

const COPY = {
  en: {
    brand: "Etugen Mongols",
    storyTitle: "Our Story",
    viewEvents: "View Events",
    viewPrograms: "View Programs",
    meetTeam: "Meet the Team",
    closing:
      "We officially host events and programs for the Mongolian community in Calgary.",
    story: [
      {
        body:
          "We are first-generation immigrant parents from Mongolia. A few of us arrived in Calgary, Alberta, in 2006, drawn here in part because it felt familiar — a similar climate, mountains and rivers that remind us of our homeland, and vast open fields dotted with livestock that echo our nomadic roots. Above all, it is a country that welcomes not only people from every corner of the world, but the cultures and traditions they bring with them. Here we found our footing, grew our careers, and raised our families far from the land where we were born.",
        imageKey: "community",
      },
      {
        body:
          "There is an old Mongolian saying: when you drink the water of a land, you honour its traditions and live by its values. We carry that wisdom with us every day, weaving our lives, our values, and our hearts into Canadian soil, as every Canadian does. At the same time, we hold our heritage close to our hearts, cherishing where we come from.",
        imageKey: "culture",
      },
      {
        body:
          "Back then, the Mongolian community in Calgary numbered fewer than a hundred people. We knew nearly every face. And whenever our small community held an event, we showed up — each of us doing a small piece to help, to organize, and to take part with pride, simply as neighbours who didn't want our traditions to fade so far from home.",
        imageKey: "founding",
      },
      {
        body:
          'In June 2011, a group of mothers organized our very first Children’s Day festival, "Mom, Dad and Me," at Bowness Park. With no budget and no grand plan, we simply shared a dream of building a home away from home.',
        imageKey: "children",
      },
      {
        body:
          "From that single day, Etugen Mongols was born — not on paper, but in our shared goals and dreams. For years, we poured our open hearts into it — organizing events, bringing families together, and keeping our kids connected to their roots. As our community grew, so did the need for a true foundation. That's why we officially stepped up to establish our non-profit organization, giving us a lasting way to lead, gather, and pass our heritage on to every generation to come.",
        imageKey: "landing",
      },
    ],
  },
  mn: {
    brand: "Этүгэн Монголчууд",
    storyTitle: "Бидний түүх",
    viewEvents: "Арга хэмжээнүүд",
    viewPrograms: "Хөтөлбөрүүд",
    meetTeam: "Багтай танилцах",
    closing:
      "Бид Калгари дахь Монгол хамт олонд зориулсан арга хэмжээ, хөтөлбөрүүдийг албан ёсоор зохион байгуулдаг.",
    story: [
      {
        body:
          "Бид бол Монголоос ирсэн анхны үеийн цагаач эцэг эхчүүд. Бидний зарим нь 2006 онд Альберта мужийн Калгари хотод ирсэн. Эндхийн цаг агаар, уулс, гол мөрөн, мал бэлчсэн уудам тал нутаг нь эх орноо санагдуулам танил мэдрэмж төрүүлсэн. Хамгийн гол нь Канад улс дэлхийн өнцөг булан бүрээс ирсэн хүмүүсийг төдийгүй тэдний соёл, уламжлалыг хүндэтгэн хүлээн авдаг орон байлаа. Энд бид амьдралаа төвхнүүлж, ажил мэргэжлээ хөгжүүлж, төрсөн нутгаасаа хол гэр бүлээ өсгөсөн.",
        imageKey: "community",
      },
      {
        body:
          "Монголчуудын дунд нэгэн үг бий: нутгийн ус уувал ёсыг нь дагана. Бид энэ ухааныг өдөр бүр сэтгэлдээ тээж, Канадын үнэт зүйлсийг хүндэтгэхийн зэрэгцээ өөрсдийн өв соёл, эх нутгаа зүрхэндээ нандигнан хадгалсаар ирсэн.",
        imageKey: "culture",
      },
      {
        body:
          "Тэр үед Калгари дахь Монголчуудын тоо зуугаас ч цөөн байлаа. Бид бараг хүн бүрийг таньдаг байсан. Жижигхэн хамт олон маань ямар нэгэн арга хэмжээ зохион байгуулахад хүн бүр өөрийн чадах зүйлээр тусалж, оролцож, уламжлалаа эх нутгаасаа холдсон ч мартагдуулахгүй гэсэн сэтгэлээр нэгддэг байсан.",
        imageKey: "founding",
      },
      {
        body:
          "2011 оны зургаадугаар сард хэсэг ээжүүд Боунис Паркт анхны Хүүхдийн баярын арга хэмжээ болох “Ээж, аав бид гурав”-ыг зохион байгуулсан. Төсөв ч үгүй, том төлөвлөгөө ч үгүй байсан ч бидэнд эх орноосоо хол Монгол гэр бүлүүдэд зориулсан гэр мэт орон зайг бий болгох нэгэн мөрөөдөл байсан.",
        imageKey: "children",
      },
      {
        body:
          "Тэр нэг өдрөөс Этүгэн Монголчууд төрсөн — цаасан дээр биш, харин бидний хамтын зорилго, мөрөөдөл дунд. Олон жилийн турш бид нээлттэй сэтгэлээрээ арга хэмжээ зохион байгуулж, гэр бүлүүдийг нэгтгэж, хүүхдүүдээ үндэс угсаатай нь холбосоор ирсэн. Хамт олон маань өсөхийн хэрээр бат бөх суурь хэрэгтэй болсон. Тиймээс бид ашгийн бус байгууллагаа албан ёсоор байгуулж, хойч үедээ өв соёлоо өвлүүлэн үлдээх, хамтдаа цуглах, манлайлах тогтвортой замыг бий болгосон.",
        imageKey: "landing",
      },
    ],
  },
} as const satisfies Record<Lang, Copy>;

function OurStoryMain({ lang }: OurStoryMainProps) {
  const copy = COPY[lang];
  const mainStoryRows = copy.story.slice(0, 4);
  const finalStoryRow = copy.story[4];

  return (
    <main
      id="story"
      className="scroll-mt-20 overflow-hidden bg-[#fffaf0] text-[#27301d]"
    >
      <section className="bg-white px-6 pb-12 pt-32 text-center md:px-10 md:pt-36">
        <motion.div
          variants={rowMotion}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {copy.brand}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#27301d] md:text-6xl">
            {copy.storyTitle}
          </h1>
        </motion.div>
      </section>

      {mainStoryRows.map((item, index) => {
        const config = STORY_ROW_CONFIG[index];

        return (
          <StoryRow
            key={item.imageKey}
            body={item.body}
            image={IMAGE_PATHS[item.imageKey]}
            reverse={config.reverse}
            tone={config.tone}
            imageLarge={config.imageLarge}
          />
        );
      })}

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
              {finalStoryRow.body}
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
              src={IMAGE_PATHS[finalStoryRow.imageKey]}
              alt=""
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#27301d]/10" />
          </motion.div>
        </motion.article>
      </section>

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
              to="/programs"
              className="inline-flex border border-[#b39135]/45 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#b39135] hover:text-[#fffaf0]"
            >
              {copy.viewPrograms}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

const StoryRow = memo(function StoryRow({
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
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#27301d]/10" />
        </motion.div>
      </motion.article>
    </section>
  );
});

export default memo(OurStoryMain);