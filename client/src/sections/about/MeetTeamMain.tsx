"use client";

import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

type LocalizedText = Record<Lang, string>;

type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  image: string;
  imagePosition?: string;
};

type CommunityImage = {
  id: string;
  src: string;
  alt: LocalizedText;
  imagePosition?: string;
};

type Copy = {
  eyebrow: string;

  boardTitle: string;
  boardBody: string;

  creativeTitle: string;
  creativeBody: string;

  appreciationEyebrow: string;
  contributorsTitle: string;
  contributorsBody: string;

  communityTitle: string;
  communityBody: string;

  impactTitle: string;
  impactBody: string;
  impactButton: string;
};

const COPY = {
  en: {
    eyebrow: "Our Community",

    boardTitle: "Board Members",
    boardBody:
      "Our board provides leadership, supports our programs, and guides the long-term growth of Etugen Mongols.",

    creativeTitle: "Etugen Creative Team",
    creativeBody:
      "Our creative team brings our work to life through design, photography, media, storytelling, performance, and culture.",

    appreciationEyebrow: "With Deep Appreciation",
    contributorsTitle: "Major Contributors",
    contributorsBody:
      "We recognize the people whose time, knowledge, care, and dedication have made a lasting contribution to our work and community.",

    communityTitle: "The Wider Community",
    communityBody:
      "Etugen Mongols is built by everyone who attends, volunteers, performs, organizes, supports, and celebrates with us.",

    impactTitle: "See the impact we have made together",
    impactBody:
      "Explore the programs, events, initiatives, and shared experiences made possible by our community.",

    impactButton: "See Our Impact",
  },

  mn: {
    eyebrow: "Манай хамт олон",

    boardTitle: "Удирдах зөвлөлийн гишүүд",
    boardBody:
      "Манай удирдах зөвлөл манлайлал үзүүлж, хөтөлбөрүүдийг дэмжин, Этүгэн Монголчуудын урт хугацааны хөгжлийг чиглүүлдэг.",

    creativeTitle: "Этүгэн бүтээлч баг",
    creativeBody:
      "Манай бүтээлч баг дизайн, гэрэл зураг, медиа, түүх өгүүлэмж, тоглолт болон соёлоор дамжуулан бидний ажлыг амьдруулдаг.",

    appreciationEyebrow: "Гүн талархал илэрхийлье",
    contributorsTitle: "Онцгой хувь нэмэр оруулагчид",
    contributorsBody:
      "Манай ажил болон хамт олонд үнэтэй цаг, мэдлэг, сэтгэл, тууштай хөдөлмөрөө зориулсан хүмүүстээ талархал илэрхийлье.",

    communityTitle: "Өргөн хамт олон",
    communityBody:
      "Этүгэн Монголчууд нь оролцож, сайн дураар ажиллаж, тоглож, зохион байгуулж, дэмжиж, хамтдаа баярладаг хүн бүрийн хүчээр бүрддэг.",

    impactTitle: "Хамтдаа бий болгосон үр нөлөөгөө харна уу",
    impactBody:
      "Манай хамт олны дэмжлэгээр хэрэгжсэн хөтөлбөр, арга хэмжээ, санаачилга болон дурсамжуудыг үзээрэй.",

    impactButton: "Үр нөлөөг харах",
  },
} as const satisfies Record<Lang, Copy>;

const BOARD_MEMBERS: TeamMember[] = [
  {
    id: "board-1",
    name: "Member One",
    role: {
      en: "Board Chair",
      mn: "Удирдах зөвлөлийн дарга",
    },
    bio: {
      en: "Provides leadership and helps guide the long-term direction, priorities, and community work of Etugen Mongols.",
      mn: "Этүгэн Монголчуудын урт хугацааны чиглэл, зорилт болон олон нийтийн ажлыг удирдан чиглүүлдэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "board-2",
    name: "Member Two",
    role: {
      en: "Vice Chair",
      mn: "Удирдах зөвлөлийн дэд дарга",
    },
    bio: {
      en: "Supports planning, coordination, partnerships, and the continued growth of Etugen Mongols.",
      mn: "Төлөвлөлт, зохицуулалт, хамтын ажиллагаа болон байгууллагын хөгжлийг дэмждэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "board-3",
    name: "Member Three",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Helps organize programs, events, volunteer involvement, and community initiatives.",
      mn: "Хөтөлбөр, арга хэмжээ, сайн дурынхны оролцоо болон олон нийтийн ажлыг зохион байгуулахад тусалдаг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "board-4",
    name: "Member Four",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Supports communication, administration, preparation, and the work behind each event.",
      mn: "Харилцаа, захиргаа, бэлтгэл болон арга хэмжээний арын ажлыг дэмждэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "board-5",
    name: "Member Five",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Contributes community knowledge, leadership, and consistent support throughout the year.",
      mn: "Хамт олны мэдлэг, манлайлал болон тогтвортой дэмжлэг үзүүлдэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
];

const CREATIVE_TEAM: TeamMember[] = [
  {
    id: "creative-1",
    name: "Creative Member One",
    role: {
      en: "Creative Direction",
      mn: "Бүтээлч чиглэл",
    },
    bio: {
      en: "Shapes the visual direction and creative presentation of events, campaigns, and community initiatives.",
      mn: "Арга хэмжээ, кампанит ажил болон олон нийтийн санаачилгын бүтээлч дүр төрхийг чиглүүлдэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "creative-2",
    name: "Creative Member Two",
    role: {
      en: "Photography and Media",
      mn: "Гэрэл зураг ба медиа",
    },
    bio: {
      en: "Captures meaningful moments and helps share the people, culture, and stories behind our community.",
      mn: "Чухал мөчүүдийг баримтжуулж, хамт олны хүмүүс, соёл болон түүхийг хуваалцдаг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "creative-3",
    name: "Creative Member Three",
    role: {
      en: "Design and Communications",
      mn: "Дизайн ба харилцаа",
    },
    bio: {
      en: "Creates visual materials and supports clear, consistent communication across our programs.",
      mn: "Дүрслэлийн материал бүтээж, хөтөлбөрүүдийн нэгдсэн харилцааг дэмждэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "creative-4",
    name: "Creative Member Four",
    role: {
      en: "Culture and Performance",
      mn: "Соёл ба тоглолт",
    },
    bio: {
      en: "Supports performances and cultural experiences that preserve traditions and connect generations.",
      mn: "Уламжлалыг хадгалж, үе үеийг холбодог тоглолт болон соёлын үйл ажиллагааг дэмждэг.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
];

const MAJOR_CONTRIBUTORS: TeamMember[] = [
  {
    id: "contributor-1",
    name: "Contributor One",
    role: {
      en: "Community Leadership",
      mn: "Хамт олны манлайлал",
    },
    bio: {
      en: "Has provided meaningful leadership, knowledge, and long-term support to our organization.",
      mn: "Байгууллагад үнэтэй манлайлал, мэдлэг болон урт хугацааны дэмжлэг үзүүлсэн.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "contributor-2",
    name: "Contributor Two",
    role: {
      en: "Cultural Contribution",
      mn: "Соёлын хувь нэмэр",
    },
    bio: {
      en: "Has helped preserve and celebrate Mongolian culture through performance and community participation.",
      mn: "Тоглолт болон олон нийтийн оролцоогоор Монгол соёлыг хадгалж, түгээн дэлгэрүүлэхэд тусалсан.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "contributor-3",
    name: "Contributor Three",
    role: {
      en: "Volunteer Coordination",
      mn: "Сайн дурынхны зохицуулалт",
    },
    bio: {
      en: "Has contributed substantial time and care to volunteer coordination and event preparation.",
      mn: "Сайн дурынхны зохицуулалт болон арга хэмжээний бэлтгэлд ихээхэн цаг, сэтгэлээ зориулсан.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
  {
    id: "contributor-4",
    name: "Contributor Four",
    role: {
      en: "Community Support",
      mn: "Хамт олны дэмжлэг",
    },
    bio: {
      en: "Has consistently supported the people, programs, events, and cultural work of Etugen Mongols.",
      mn: "Этүгэн Монголчуудын хүмүүс, хөтөлбөр, арга хэмжээ болон соёлын ажлыг тогтмол дэмжсэн.",
    },
    image: "/landingpage.webp",
    imagePosition: "center",
  },
];

const COMMUNITY_IMAGES: CommunityImage[] = [
  {
    id: "community-1",
    src: "/landingpage.webp",
    alt: {
      en: "Etugen Mongols community gathering",
      mn: "Этүгэн Монголчуудын хамтын цугларалт",
    },
    imagePosition: "center",
  },
  {
    id: "community-2",
    src: "/landingpage.webp",
    alt: {
      en: "Families attending a community event",
      mn: "Олон нийтийн арга хэмжээнд оролцож буй гэр бүлүүд",
    },
    imagePosition: "center",
  },
  {
    id: "community-3",
    src: "/landingpage.webp",
    alt: {
      en: "Etugen Mongols community group photo",
      mn: "Этүгэн Монголчуудын хамтын зураг",
    },
    imagePosition: "center",
  },
];

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

      <MemberGrid
        members={BOARD_MEMBERS}
        lang={lang}
        layout="board"
      />

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
        embedded
          ? "mt-14 md:mt-16"
          : "px-5 pb-20 sm:px-6 md:px-10 md:pb-28"
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
          <MemberCard
            key={member.id}
            member={member}
            lang={lang}
          />
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
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
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
          <p className="text-sm leading-6 text-white">
            {member.bio[lang]}
          </p>
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

function CommunityGallery({
  copy,
  lang,
}: {
  copy: Copy;
  lang: Lang;
}) {
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
  const layout =
    index === 0
      ? "md:col-span-7 md:row-span-2"
      : "md:col-span-5";

  const height =
    index === 0
      ? "h-[24rem] md:h-[41rem]"
      : "h-[20rem] md:h-[20rem]";

  return (
    <motion.figure
      variants={fadeUp}
      className={[
        "relative overflow-hidden bg-[#27301d]",
        layout,
        height,
      ].join(" ")}
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