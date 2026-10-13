import { TeamSection } from "./team/components/TeamSection";
import {
  COMMUNITY_IMAGES,
  COPY,
  type CommunityImage,
  type Copy,
  type Lang,
} from "./content/MeetTeamMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import { mediaReveal } from "./animations";

type MeetTeamMainProps = {
  lang: Lang;
};

const smoothEase = cubicBezier(0.22, 1, 0.36, 1);

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <TeamSection lang={lang} />

      <CommunityGallery copy={copy} lang={lang} />

      <ImpactSection copy={copy} />
    </main>
  );
}

function SectionIntro({
  title,
  body,
  large = false,
  first = false,
  embedded = false,
}: {
  title: string;
  body: string;
  large?: boolean;
  first?: boolean;
  embedded?: boolean;
}) {
  return (
    <section
      className={[
        embedded ? "" : "px-5 text-center sm:px-6 md:px-10",
        first ? "pb-12 pt-32 md:pb-16 md:pt-40" : "",
      ].join(" ")}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1
          className={[
            "font-semibold leading-[1.08] tracking-[-0.025em] text-[#27301d]",
            large
              ? "text-4xl sm:text-5xl md:text-6xl"
              : "text-3xl sm:text-4xl md:text-5xl",
          ].join(" ")}
        >
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#68705c] md:text-base md:leading-8">
          {body}
        </p>
      </motion.div>
    </section>
  );
}

function CommunityGallery({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          title={copy.communityTitle}
          body={copy.communityBody}
          embedded
        />

        <motion.div
          variants={mediaReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-12"
        >
          {COMMUNITY_IMAGES.map((image, index) => (
            <CommunityImageCard
              key={image.id}
              image={image}
              lang={lang}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CommunityImageCard({
  image,
  lang,
  index,
}: {
  image: CommunityImage;
  lang: Lang;
  index: number;
}) {
  const layout = index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5";

  const height =
    index === 0 ? "h-[24rem] md:h-[41rem]" : "h-[20rem] md:h-[20rem]";

  return (
    <figure
      className={["relative overflow-hidden bg-[#27301d]", layout, height].join(
        " ",
      )}
    >
      <img
        src={image.src}
        alt={image.alt[lang]}
        loading="lazy"
        decoding="async"
        style={{
          objectPosition: image.imagePosition ?? "center",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#27301d]/20 via-transparent to-transparent" />
    </figure>
  );
}

function ImpactSection({ copy }: { copy: Copy }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#27301d] px-5 py-24 text-center sm:px-6 md:px-10 md:py-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[70%] max-w-5xl -translate-x-1/2 bg-white/10"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 bg-[#9a7b26]/10 blur-3xl"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl md:text-5xl">
          {copy.impactTitle}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#d3d8ca] md:text-base md:leading-8">
          {copy.impactBody}
        </p>

        <Link
          to="/about/impact"
          className={[
            "mt-9 inline-flex min-h-12 items-center justify-center",
            "border border-white bg-white px-8 py-3.5",
            "text-[10px] font-bold uppercase tracking-[0.22em] text-[#27301d]",
            "no-underline",
            "transition-colors duration-300",
            "hover:bg-transparent hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-white focus-visible:ring-offset-4",
            "focus-visible:ring-offset-[#27301d]",
          ].join(" ")}
        >
          {copy.impactButton}
        </Link>
      </motion.div>
    </section>
  );
}

export default memo(MeetTeamMain);
