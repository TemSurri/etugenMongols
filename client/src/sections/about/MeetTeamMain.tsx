import {
  BOARD_MEMBERS,
  COMMUNITY_IMAGES,
  COPY,
  CREATIVE_TEAM,
  MAJOR_CONTRIBUTORS,
  type CommunityImage,
  type Copy,
  type Lang,
  type TeamMember,
} from "./content/MeetTeamMainContent";

import { cubicBezier, motion, type Variants } from "framer-motion";
import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";

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

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <SectionIntro
        eyebrow={copy.eyebrow}
        title={copy.boardTitle}
        body={copy.boardBody}
        large
        first
      />

      <MemberGrid members={BOARD_MEMBERS} lang={lang} layout="board" />

      <ContentSection>
        <SectionIntro
          eyebrow={copy.eyebrow}
          title={copy.creativeTitle}
          body={copy.creativeBody}
          embedded
        />

        <MemberGrid
          members={CREATIVE_TEAM}
          lang={lang}
          layout="standard"
          embedded
        />
      </ContentSection>

      <ContentSection muted>
        <SectionIntro
          eyebrow={copy.appreciationEyebrow}
          title={copy.contributorsTitle}
          body={copy.contributorsBody}
          embedded
        />

        <MemberGrid
          members={MAJOR_CONTRIBUTORS}
          lang={lang}
          layout="contributors"
          embedded
        />
      </ContentSection>

      <CommunityGallery copy={copy} lang={lang} />

      <ImpactSection copy={copy} />
    </main>
  );
}

function ContentSection({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      className={[
        "px-5 py-20 sm:px-6 md:px-10 md:py-28",
        muted ? "bg-[#f6f5ef]" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
  large = false,
  first = false,
  embedded = false,
  hideEyebrow = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  large?: boolean;
  first?: boolean;
  embedded?: boolean;
  hideEyebrow?: boolean;
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
        {!hideEyebrow && eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#9a7b26] sm:text-[11px]">
            {eyebrow}
          </p>
        ) : null}

        <h1
          className={[
            "font-semibold leading-[1.08] tracking-[-0.025em] text-[#27301d]",
            hideEyebrow ? "mt-0" : "mt-4",
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

function MemberGrid({
  members,
  lang,
  layout,
  embedded = false,
}: {
  members: TeamMember[];
  lang: Lang;
  layout: "board" | "standard" | "contributors";
  embedded?: boolean;
}) {
  return (
    <section
      className={
        embedded ? "mt-14 md:mt-16" : "px-5 pb-20 sm:px-6 md:px-10 md:pb-28"
      }
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        className={[
          "mx-auto grid max-w-7xl gap-x-8 gap-y-14 md:gap-x-10 md:gap-y-16",
          getGridColumns(layout, members.length),
        ].join(" ")}
      >
        {members.map((member) => (
          <MemberCard key={member.id} member={member} lang={lang} />
        ))}
      </motion.div>
    </section>
  );
}

function getGridColumns(
  layout: "board" | "standard" | "contributors",
  count: number,
) {
  if (layout === "board") {
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  }

  if (layout === "contributors" && count === 3) {
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }

  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

const MemberCard = memo(function MemberCard({
  member,
  lang,
}: {
  member: TeamMember;
  lang: Lang;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="group mx-auto flex w-full max-w-[16rem] flex-col items-center text-center"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#27301d] shadow-[0_14px_36px_rgba(39,48,29,0.12)] ring-1 ring-[#27301d]/10">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          style={{
            objectPosition: member.imagePosition ?? "center",
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          className={[
            "absolute inset-0 bg-[#27301d]/0",
            "transition-colors duration-300",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:bg-[#27301d]/82",
          ].join(" ")}
        />

        <div
          className={[
            "absolute inset-0 flex items-center justify-center p-7",
            "opacity-0",
            "transition-opacity duration-300",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:opacity-100",
          ].join(" ")}
        >
          <p className="text-sm leading-6 text-white">{member.bio[lang]}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7b26]">
          {member.role[lang]}
        </p>

        <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.015em] text-[#27301d]">
          {member.name}
        </h3>
      </div>
    </motion.article>
  );
});

function CommunityGallery({ copy, lang }: { copy: Copy; lang: Lang }) {
  return (
    <section className="bg-white px-5 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          title={copy.communityTitle}
          body={copy.communityBody}
          hideEyebrow
          embedded
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
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
    <motion.figure
      variants={fadeUp}
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
    </motion.figure>
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
