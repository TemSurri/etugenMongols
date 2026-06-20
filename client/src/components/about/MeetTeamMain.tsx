"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

type LocalizedText = Record<Lang, string>;
type TeamImageKey = "landing";

type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  description: LocalizedText;
  imageKey: TeamImageKey;
};

type Copy = {
  eyebrow: string;
  boardTitle: string;
  boardBody: string;
  contributorsTitle: string;
  contributorsBody: string;
  communityTitle: string;
  communityBody: string;
  galleryButton: string;
};

const IMAGE_PATHS: Record<TeamImageKey, string> = {
  landing: "/landingpage.webp",
};

const COPY = {
  en: {
    eyebrow: "Our Community",
    boardTitle: "Board Members",
    boardBody:
      "Our board members organize and guide the work behind Etugen Mongols. They help plan events, coordinate programs, support volunteers, and make sure the community has a steady foundation throughout the year.",
    contributorsTitle: "With Deep Appreciation",
    contributorsBody:
      "These are people who pour a significant amount of their time, energy, and skill into helping make our events, performances, programs, and community work possible.",
    communityTitle: "The Wider Community",
    communityBody:
      "Etugen Mongols is only possible because of everyone who shows up: families, volunteers, performers, artists, organizers, photographers, supporters, and community members. Every bit of help matters. You can explore our work in the gallery and see the moments, preparation, and behind-the-scenes effort that bring our community together.",
    galleryButton: "View Gallery",
  },
  mn: {
    eyebrow: "Манай хамт олон",
    boardTitle: "Удирдах зөвлөлийн гишүүд",
    boardBody:
      "Манай удирдах зөвлөлийн гишүүд Этүгэн Монголчуудын ажлыг зохион байгуулж, чиглүүлдэг. Тэд арга хэмжээ төлөвлөх, хөтөлбөр зохицуулах, сайн дурынхныг дэмжих, хамт олны ажлыг жилийн турш тогтвортой байлгахад тусалдаг.",
    contributorsTitle: "Гүн талархал илэрхийлье",
    contributorsBody:
      "Эдгээр хүмүүс арга хэмжээ, тоглолт, хөтөлбөр болон хамтын ажлыг боломжтой болгохын тулд цаг зав, эрч хүч, ур чадвараа харамгүй зориулдаг.",
    communityTitle: "Өргөн хамт олон",
    communityBody:
      "Этүгэн Монголчууд нь оролцож, дэмжиж, сайн дураар тусалж, тоглож, зохион байгуулж, зураг авч, хамт олноо нэгтгэдэг бүх хүмүүсийн хүчээр оршдог. Хүн бүрийн тус нэмэр үнэ цэнтэй. Та бидний ажлыг зургийн цомгоос харж, арга хэмжээний мөчүүд, бэлтгэл болон арын ажлыг үзэх боломжтой.",
    galleryButton: "Зургийн цомог",
  },
} as const satisfies Record<Lang, Copy>;

const BOARD_MEMBERS: TeamMember[] = [
  {
    id: "board-1",
    name: "Member One",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    description: {
      en: "Helps organize events, guide planning, support volunteers, and keep the organization moving forward.",
      mn: "Арга хэмжээ зохион байгуулах, төлөвлөлт чиглүүлэх, сайн дурынхныг дэмжихэд тусалдаг.",
    },
    imageKey: "landing",
  },
  {
    id: "board-2",
    name: "Member Two",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    description: {
      en: "Supports coordination, communication, programming, and the behind-the-scenes work of the organization.",
      mn: "Зохицуулалт, харилцаа, хөтөлбөр болон байгууллагын арын ажлыг дэмждэг.",
    },
    imageKey: "landing",
  },
  {
    id: "board-3",
    name: "Member Three",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    description: {
      en: "Contributes leadership, care, and steady support for cultural events and community programs.",
      mn: "Соёлын арга хэмжээ, хөтөлбөрүүдэд манлайлал, сэтгэл, тогтвортой дэмжлэг үзүүлдэг.",
    },
    imageKey: "landing",
  },
  {
    id: "board-4",
    name: "Member Four",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    description: {
      en: "Helps make sure events, volunteers, and community needs are organized with care.",
      mn: "Арга хэмжээ, сайн дурынхан, хамтын хэрэгцээг нямбай зохион байгуулахад тусалдаг.",
    },
    imageKey: "landing",
  },
  {
    id: "board-5",
    name: "Member Five",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    description: {
      en: "Supports the structure and planning needed to keep Etugen Mongols active throughout the year.",
      mn: "Этүгэн Монголчуудыг жилийн турш идэвхтэй байлгах бүтэц, төлөвлөлтийг дэмждэг.",
    },
    imageKey: "landing",
  },
];

const MAJOR_CONTRIBUTORS: TeamMember[] = [
  {
    id: "contributor-1",
    name: "Contributor One",
    role: { en: "Volunteer", mn: "Сайн дурын ажилтан" },
    description: {
      en: "Gives time and energy to help events run smoothly and support families during gatherings.",
      mn: "Арга хэмжээг амжилттай явуулах, гэр бүлүүдийг дэмжихэд цаг зав, эрч хүчээ зориулдаг.",
    },
    imageKey: "landing",
  },
  {
    id: "contributor-2",
    name: "Contributor Two",
    role: { en: "Performer / Artist", mn: "Уран бүтээлч" },
    description: {
      en: "Uses talent and creativity to bring performances, cultural moments, and celebrations to life.",
      mn: "Тоглолт, соёлын мөчүүд, баярыг амьдруулахад авьяас, бүтээлч чадвараа зориулдаг.",
    },
    imageKey: "landing",
  },
  {
    id: "contributor-3",
    name: "Contributor Three",
    role: { en: "Community Supporter", mn: "Хамт олны дэмжигч" },
    description: {
      en: "Supports planning, setup, coordination, and the practical work that makes events possible.",
      mn: "Төлөвлөлт, бэлтгэл, зохицуулалт болон арга хэмжээг боломжтой болгодог ажлыг дэмждэг.",
    },
    imageKey: "landing",
  },
  {
    id: "contributor-4",
    name: "Contributor Four",
    role: { en: "Media / Photography", mn: "Медиа / Зурагчин" },
    description: {
      en: "Helps capture memories, document the process, and share the work of the community.",
      mn: "Дурсамж хадгалах, үйл явцыг баримтжуулах, хамтын ажлыг хуваалцахад тусалдаг.",
    },
    imageKey: "landing",
  },
];

const COMMUNITY_IMAGES = [
  "/landingpage.webp",
  "/landingpage.webp",
  "/landingpage.webp",
] as const;

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <main className="overflow-hidden bg-white text-[#27301d]">
      <PageIntro copy={copy} />

      <MemberGrid members={BOARD_MEMBERS} lang={lang} columns="board" />

      <section className="bg-white px-6 py-16 text-center md:px-10 md:py-18">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.contributorsTitle}
          body={copy.contributorsBody}
        />
      </section>

      <MemberGrid
        members={MAJOR_CONTRIBUTORS}
        lang={lang}
        columns="contributors"
      />

      <CommunitySection copy={copy} />
    </main>
  );
}

function PageIntro({ copy }: { copy: Copy }) {
  return (
    <section className="bg-white px-6 pb-12 pt-32 text-center md:px-10 md:pt-36">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.boardTitle}
        body={copy.boardBody}
        large
      />
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  large = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  large?: boolean;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="mx-auto max-w-4xl"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
        {eyebrow}
      </p>

      <h1
        className={[
          "mt-4 font-semibold leading-tight text-[#27301d]",
          large ? "text-4xl md:text-6xl" : "text-3xl md:text-5xl",
        ].join(" ")}
      >
        {title}
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#667056]">
        {body}
      </p>
    </motion.div>
  );
}

function MemberGrid({
  members,
  lang,
  columns,
}: {
  members: TeamMember[];
  lang: Lang;
  columns: "board" | "contributors";
}) {
  return (
    <section className="bg-white px-6 pb-16 md:px-10 md:pb-20">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className={[
          "mx-auto grid max-w-7xl gap-3 md:gap-4",
          columns === "board"
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        ].join(" ")}
      >
        {members.map((member) => (
          <MemberCard key={member.id} member={member} lang={lang} />
        ))}
      </motion.div>
    </section>
  );
}

const MemberCard = memo(function MemberCard({
  member,
  lang,
}: {
  member: TeamMember;
  lang: Lang;
}) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden bg-[#27301d]">
      <img
        src={IMAGE_PATHS[member.imageKey]}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#27301d]/90 via-[#27301d]/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-transform duration-300 group-hover:-translate-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e1d2a6]">
          {member.role[lang]}
        </p>

        <h3 className="mt-2 text-lg font-semibold leading-tight">
          {member.name}
        </h3>

        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-[#f3ead2] opacity-0 transition-all duration-300 group-hover:max-h-44 group-hover:opacity-100">
          {member.description[lang]}
        </p>
      </div>
    </article>
  );
});

function CommunitySection({ copy }: { copy: Copy }) {
  return (
    <section className="bg-white px-6 pb-24 pt-8 text-center md:px-10">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {copy.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
            {copy.communityTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#667056]">
            {copy.communityBody}
          </p>

          <Link
            to="/gallery"
            className="mt-8 inline-flex bg-[#27301d] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white no-underline transition-colors hover:bg-[#9a7b26]"
          >
            {copy.galleryButton}
          </Link>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {COMMUNITY_IMAGES.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative h-[18rem] overflow-hidden bg-[#27301d]"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default memo(MeetTeamMain);