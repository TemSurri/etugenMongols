import { COPY, type Lang } from "./content/OurStoryMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import { mediaReveal } from "./animations";
import { aboutMedia } from "./media";

type OurStoryMainProps = {
  lang: Lang;
};

type StoryRowProps = {
  body: string;
  image: string;
  reverse?: boolean;
  tone?: "cream" | "green";
  imageLarge?: boolean;
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
          <h1 className="text-4xl font-semibold leading-tight text-[#27301d] md:text-6xl">
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
            image={aboutMedia.story[item.imageKey]}
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
            variants={mediaReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-[22rem] overflow-hidden sm:h-[28rem] lg:h-full"
          >
            <img
              src={aboutMedia.story[finalStoryRow.imageKey]}
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
          <h2 className="text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
            {copy.closing}
          </h2>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/about/team"
              className="inline-flex bg-[#27301d] px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fffaf0] no-underline transition-colors duration-200 hover:bg-[#b39135]"
            >
              {copy.meetTeam}
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
          variants={mediaReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
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
