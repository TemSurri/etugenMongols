"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, cubicBezier, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type AboutUsProps = {
  lang: Lang;
};

const ABOUT_COPY = {
  en: {
    brand: "Etugen Mongols",
    title: "How It All Began",
    subtitle: "The story that started it all",
    quote: "We wanted every child to know: your roots are your wings.",
    paragraphs: [
      "We are first-generation immigrant parents from Mongolia. A few of us arrived in Calgary, Alberta, in 2006, drawn here in part because it felt familiar — a similar climate, mountains and rivers that remind us of our homeland, and vast open fields dotted with livestock that echo our nomadic roots. Above all, it is a country that welcomes not only people from every corner of the world, but the cultures and traditions they bring with them. Here we found our footing, grew our careers, and raised our families far from the land where we were born.",
      "There is an old Mongolian saying: when you drink the water of a land, you honour its traditions and live by its values. We carry that wisdom with us every day, weaving our lives, our values, and our hearts into Canadian soil, as every Canadian does. At the same time, we hold our heritage close to our hearts, cherishing where we come from.",
      "Back then, the Mongolian community in Calgary numbered fewer than a hundred people. We knew nearly every face. And whenever our small community held an event, we showed up — each of us doing a small piece to help, to organize, and to take part with pride, simply as neighbours who didn't want our traditions to fade so far from home.",
      'In June 2011, a group of mothers organized our very first Children\'s Day festival, "Mom, Dad and Me," at Bowness Park. With no budget and no grand plan, we simply shared a dream of building a home away from home.',
      "From that single day, Etugen Mongols was born — not on paper, but in our shared goals and dreams. For years, we poured our open hearts into it — organizing events, bringing families together, and keeping our kids connected to their roots. As our community grew, so did the need for a true foundation. That's why we officially stepped up to establish our non-profit organization, giving us a lasting way to lead, gather, and pass our heritage on to every generation to come.",
    ],
    foundingCaption: "Founding members of Etugen Mongols",
    photoCaption:
      "Memories from the early community gatherings that shaped Etugen Mongols.",
    team: "Meet the Bigger Team",
  },
  mn: {
    brand: "Этүгэн Монголчууд",
    title: "Бидний эхлэл",
    subtitle: "Бүхнийг эхлүүлсэн түүх",
    quote: "Хүүхэд бүр мэдээсэй гэж бид хүссэн: чиний үндэс бол чиний жигүүр.",
    paragraphs: [
      "Бид бол Монголоос ирсэн анхны үеийн цагаач эцэг эхчүүд. Бидний зарим нь 2006 онд Альберта мужийн Калгари хотод ирсэн. Эндхийн цаг агаар, уулс, гол мөрөн, мал бэлчсэн уудам тал нутаг нь эх орноо санагдуулам танил мэдрэмж төрүүлсэн. Хамгийн гол нь Канад улс дэлхийн өнцөг булан бүрээс ирсэн хүмүүсийг төдийгүй тэдний соёл, уламжлалыг хүндэтгэн хүлээн авдаг орон байлаа. Энд бид амьдралаа төвхнүүлж, ажил мэргэжлээ хөгжүүлж, төрсөн нутгаасаа хол гэр бүлээ өсгөсөн.",
      "Монголчуудын дунд нэгэн үг бий: нутгийн ус уувал ёсыг нь дагана. Бид энэ ухааныг өдөр бүр сэтгэлдээ тээж, Канадын үнэт зүйлсийг хүндэтгэн амьдрахын зэрэгцээ өөрсдийн өв соёл, эх нутгаа зүрхэндээ нандигнан хадгалсаар ирсэн.",
      "Тэр үед Калгари дахь Монголчуудын тоо зуугаас ч цөөн байлаа. Бид бараг хүн бүрийг таньдаг байсан. Жижигхэн хамт олон маань ямар нэгэн арга хэмжээ зохион байгуулахад хүн бүр өөрийн чадах зүйлээр тусалж, оролцож, уламжлалаа эх нутгаасаа холдсон ч мартагдуулахгүй гэсэн сэтгэлээр нэгддэг байсан.",
      "2011 оны зургаадугаар сард хэсэг ээжүүд Боунис Паркт анхны Хүүхдийн баярын арга хэмжээ болох “Ээж, аав бид гурав”-ыг зохион байгуулсан. Төсөв ч үгүй, том төлөвлөгөө ч үгүй байсан ч бидэнд Монгол гэр бүлүүдэд зориулсан эх орноосоо хол дахь гэр мэт орон зайг бий болгох нэгэн мөрөөдөл байсан.",
      "Тэр нэг өдрөөс Этүгэн Монголчууд төрсөн — цаасан дээр биш, харин бидний хамтын зорилго, мөрөөдөл дунд. Олон жилийн турш бид нээлттэй сэтгэлээрээ арга хэмжээ зохион байгуулж, гэр бүлүүдийг нэгтгэж, хүүхдүүдээ үндэс угсаатай нь холбосоор ирсэн. Хамт олон маань өсөхийн хэрээр бат бөх суурь хэрэгтэй болсон. Тиймээс бид ашгийн бус байгууллагаа албан ёсоор байгуулж, хойч үедээ өв соёлоо өвлүүлэн үлдээх, хамтдаа цуглах, манлайлах тогтвортой замыг бий болгосон.",
    ],
    foundingCaption: "Этүгэн Монголчуудын үүсгэн байгуулагч гишүүд",
    photoCaption: "Этүгэн Монголчуудыг бүтээсэн анхны уулзалт, дурсамжууд.",
    team: "Багтай танилцах",
  },
} as const;

const MEMORY_IMAGES = [
  {
    src: "/about/story-children.webp",
    alt: "Children and families at a cultural gathering",
    className: "ml-auto w-[78%] rotate-[2deg]",
    imageClassName: "h-[16rem]",
  },
  {
    src: "/about/story-community.webp",
    alt: "Community members gathered together",
    className: "-mt-5 w-[72%] rotate-[-2deg]",
    imageClassName: "h-[15rem]",
  },
  {
    src: "/about/story-culture.webp",
    alt: "Mongolian cultural celebration",
    className: "-mt-5 ml-auto w-[84%] rotate-[1.5deg]",
    imageClassName: "h-[17rem]",
  },
] as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const storyMotion: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const photoMotion: Variants = {
  hidden: { opacity: 0, x: 34, y: 24, scale: 0.96 },
  show: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      delay: index * 0.08,
      ease: easeOut,
    },
  }),
};

function AboutUs({ lang }: AboutUsProps) {
  const copy = ABOUT_COPY[lang];

  return (
    <section className="relative px-5 pb-24 pt-36 text-[#27301d] sm:px-6 sm:pt-40 md:px-10 lg:px-12 lg:pt-44">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(22rem,0.82fr)] lg:items-start">
        <motion.article
          variants={storyMotion}
          initial="hidden"
          animate="show"
          className="rounded-md border border-[#e1d2a6]/55 bg-[#fffaf0]/96 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#9a7b26]">
            {copy.brand}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-5xl lg:text-[3.35rem]">
            {copy.title}
          </h1>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.subtitle}
          </p>

          <blockquote className="mt-7 max-w-3xl border-l-2 border-[#b39135] pl-5 text-xl font-medium italic leading-9 text-[#354126] sm:text-2xl sm:leading-10">
            “{copy.quote}”
          </blockquote>

          <div className="my-8 h-px w-full bg-[#d8caa5]" />

          <div className="max-w-3xl space-y-6 text-[15px] leading-8 text-[#4e593c] sm:text-base sm:leading-8">
            {copy.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-[#9a7b26]"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9 border-t border-[#d8caa5] pt-6">
            <Link
              to="/about/team"
              className="inline-flex items-center rounded-sm border border-[#b39135]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#27301d] transition-colors duration-200 hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
            >
              {copy.team}
              <span className="ml-3 text-base leading-none">→</span>
            </Link>
          </div>
        </motion.article>

        <aside className="hidden h-full lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <motion.figure
                variants={photoMotion}
                custom={0}
                initial="hidden"
                animate="show"
                className="rounded-md bg-[#e8dcc2] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-4"
              >
                <div className="overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2">
                  <img
                    src="/about/founding-group.webp"
                    alt={copy.foundingCaption}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="h-[27rem] w-full object-cover object-[center_38%]"
                  />
                </div>

                <figcaption className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
                  {copy.foundingCaption}
                </figcaption>
              </motion.figure>

              <div className="mt-8 space-y-0">
                {MEMORY_IMAGES.map((image, index) => (
                  <motion.figure
                    key={image.src}
                    custom={index + 1}
                    variants={photoMotion}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className={`relative rounded-md bg-[#e8dcc2] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-4 ${image.className}`}
                  >
                    <div className="overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className={`w-full object-cover ${image.imageClassName}`}
                      />
                    </div>
                  </motion.figure>
                ))}
              </div>
            </div>

            <motion.p
              variants={storyMotion}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="mx-auto mt-6 max-w-sm text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#e1d2a6]"
            >
              {copy.photoCaption}
            </motion.p>
          </div>
        </aside>

        <motion.div
          variants={photoMotion}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-5 lg:hidden"
        >
          <figure className="rounded-md bg-[#e8dcc2] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-4">
            <div className="overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2">
              <img
                src="/about/founding-group.webp"
                alt={copy.foundingCaption}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-[22rem] w-full object-cover object-[center_38%]"
              />
            </div>

            <figcaption className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
              {copy.foundingCaption}
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-4">
            {MEMORY_IMAGES.map((image) => (
              <figure
                key={image.src}
                className="rounded-md bg-[#e8dcc2] p-2 shadow-[0_16px_44px_rgba(0,0,0,0.24)]"
              >
                <div className="overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-1.5">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-36 w-full object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>

          <p className="mx-auto max-w-sm text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#e1d2a6]">
            {copy.photoCaption}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AboutUs);