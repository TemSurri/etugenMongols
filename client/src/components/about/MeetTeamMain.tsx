"use client";

import { memo } from "react";
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
  imageKey: TeamImageKey;
};

type TeamImageKey =
  | "landing"
  | "founding1"
  | "founding2"
  | "founding3"
  | "founding4"
  | "founding5"
  | "community1"
  | "community2"
  | "community3"
  | "community4"
  | "communityWide1"
  | "communityWide2"
  | "communityWide3";

type Copy = {
  eyebrow: string;
  boardTitle: string;
  boardBody: string;
  appreciationTitle: string;
  appreciationIntro: string;
  contributorBody: string;
  communityTitle: string;
  communityBody: string;
  impactTitle: string;
  impactBody: string;
  impactButton: string;
};

const IMAGE_PATHS: Record<TeamImageKey, string> = {
  landing: "/landingpage.webp",

  founding1: "/about/founding-1.webp",
  founding2: "/about/founding-2.webp",
  founding3: "/about/founding-3.webp",
  founding4: "/about/founding-4.webp",
  founding5: "/about/founding-5.webp",

  community1: "/about/community-1.webp",
  community2: "/about/community-2.webp",
  community3: "/about/community-3.webp",
  community4: "/about/community-4.webp",

  communityWide1: "/about/community-wide-1.webp",
  communityWide2: "/about/community-wide-2.webp",
  communityWide3: "/about/community-wide-3.webp",
};

const COMMUNITY_WIDE_IMAGE_KEYS: TeamImageKey[] = [
  "communityWide1",
  "communityWide2",
  "communityWide3",
];

const COPY = {
  en: {
    eyebrow: "Our Community",
    boardTitle: "Board Members",
    boardBody:
      "Our board members organize, guide, and support the work behind Etugen Mongols. They help coordinate events, build programs, connect families, and keep our community efforts moving forward throughout the year.",
    appreciationTitle: "With Deep Appreciation",
    appreciationIntro:
      "A closer look at the people who have dedicated large amounts of their time, energy, care, and significant effort to making what we do special for the community.",
    contributorBody:
      "Part of the wider team that helps bring events, performances, media, coordination, and community support to life.",
    communityTitle: "Our Community",
    communityBody:
      "Dedicated to everyone who shows up, supports, volunteers, performs, organizes, and helps keep our community connected.",
    impactTitle: "See the Impact",
    impactBody:
      "See what we have been able to build together through culture, volunteering, family participation, and shared community care.",
    impactButton: "View Our Impact",
  },
  mn: {
    eyebrow: "Манай хамт олон",
    boardTitle: "Удирдах зөвлөлийн гишүүд",
    boardBody:
      "Манай удирдах зөвлөлийн гишүүд Этүгэн Монголчуудын үйл ажиллагааг зохион байгуулж, чиглүүлж, дэмждэг. Тэд арга хэмжээ зохицуулах, хөтөлбөр хөгжүүлэх, гэр бүлүүдийг холбох болон хамтын ажлыг жилийн турш урагшлуулахад хувь нэмэр оруулдаг.",
    appreciationTitle: "Гүн талархал илэрхийлье",
    appreciationIntro:
      "Манай үйл ажиллагааг хамт олонд онцгой болгохын төлөө цаг зав, эрч хүч, сэтгэл, хөдөлмөрөө зориулсан хүмүүст гүн талархал илэрхийлье.",
    contributorBody:
      "Арга хэмжээ, тоглолт, медиа, зохион байгуулалт болон хамтын дэмжлэгийг амьдруулахад хувь нэмэр оруулдаг өргөн багийн нэг хэсэг.",
    communityTitle: "Манай хамт олон",
    communityBody:
      "Оролцож, дэмжиж, сайн дураар тусалж, тоглож, зохион байгуулж, хамт олноо холбоотой байлгахад хувь нэмэр оруулдаг бүх хүнд зориулав.",
    impactTitle: "Бидний нөлөөг харах",
    impactBody:
      "Соёл, сайн дурын оролцоо, гэр бүлийн оролцоо болон хамтын халамжаар бид хамтдаа юу бүтээснийг хараарай.",
    impactButton: "Бидний нөлөөг үзэх",
  },
} as const satisfies Record<Lang, Copy>;

const BOARD_MEMBERS: TeamMember[] = [
  {
    id: "board-1",
    name: "Member One",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    imageKey: "founding1",
  },
  {
    id: "board-2",
    name: "Member Two",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    imageKey: "founding2",
  },
  {
    id: "board-3",
    name: "Member Three",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    imageKey: "founding3",
  },
  {
    id: "board-4",
    name: "Member Four",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    imageKey: "founding4",
  },
  {
    id: "board-5",
    name: "Member Five",
    role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" },
    imageKey: "founding5",
  },
];

const COMMUNITY_MEMBERS: TeamMember[] = [
  {
    id: "contributor-1",
    name: "Contributor One",
    role: { en: "Volunteer", mn: "Сайн дурын ажилтан" },
    imageKey: "community1",
  },
  {
    id: "contributor-2",
    name: "Contributor Two",
    role: { en: "Performer / Artist", mn: "Уран бүтээлч" },
    imageKey: "community2",
  },
  {
    id: "contributor-3",
    name: "Contributor Three",
    role: { en: "Community Supporter", mn: "Хамт олны дэмжигч" },
    imageKey: "community3",
  },
  {
    id: "contributor-4",
    name: "Contributor Four",
    role: { en: "Photographer", mn: "Зурагчин" },
    imageKey: "community4",
  },
];

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

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

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-10 lg:pt-32">
          <img
            src={IMAGE_PATHS.landing}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#fffaf0]/92" />
          <div className="absolute inset-0 bg-linear-to-b from-[#fffaf0]/97 via-[#fffaf0]/93 to-[#eef0e6]/96" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto max-w-7xl"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {copy.boardTitle}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[#4e593c]">
                {copy.boardBody}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
              {BOARD_MEMBERS.map((member) => (
                <BoardCard key={member.id} member={member} lang={lang} />
              ))}
            </div>
          </motion.div>
        </section>

        <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {copy.appreciationTitle}
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
                {copy.appreciationIntro}
              </p>
            </div>
          </motion.div>
        </section>

        {COMMUNITY_MEMBERS.map((member, index) => (
          <ContributorStoryRow
            key={member.id}
            member={member}
            lang={lang}
            body={copy.contributorBody}
            reverse={index % 2 === 1}
            muted={index % 2 === 1}
          />
        ))}

        <CommunityDedication copy={copy} />

        <ImpactCta copy={copy} />
      </main>
    </section>
  );
}

const BoardCard = memo(function BoardCard({
  member,
  lang,
}: {
  member: TeamMember;
  lang: Lang;
}) {
  return (
    <motion.article
      variants={sectionMotion}
      className="group relative aspect-[4/5] overflow-hidden bg-[#e8ebe3] shadow-[0_14px_34px_rgba(39,48,29,0.10)]"
    >
      <img
        src={IMAGE_PATHS[member.imageKey]}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#27301d]/86 via-[#27301d]/16 to-transparent opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-4 text-[#fffaf0] transition-transform duration-200 lg:translate-y-5 lg:group-hover:translate-y-0">
        <h3 className="text-lg font-semibold leading-tight">{member.name}</h3>

        <p className="mt-1 text-xs font-medium text-[#e1d2a6]">
          {member.role[lang]}
        </p>
      </div>
    </motion.article>
  );
});

const ContributorStoryRow = memo(function ContributorStoryRow({
  member,
  lang,
  body,
  reverse = false,
  muted = false,
}: {
  member: TeamMember;
  lang: Lang;
  body: string;
  reverse?: boolean;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-[#efefec]" : "bg-[#fffaf0]"}>
      <motion.article
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-6xl items-center lg:min-h-[28rem] lg:grid-cols-2"
      >
        <div
          className={`flex h-full items-center px-6 py-14 md:px-10 lg:px-12 lg:py-16 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
              {member.role[lang]}
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
              {member.name}
            </h3>

            <p className="mt-6 text-[15px] leading-8 text-[#4e593c]">
              {body}
            </p>
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
            src={IMAGE_PATHS[member.imageKey]}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </motion.article>
    </section>
  );
});

const CommunityDedication = memo(function CommunityDedication({
  copy,
}: {
  copy: Copy;
}) {
  return (
    <section className="bg-[#fffaf0] px-6 py-20 text-center md:px-10">
      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
            {copy.eyebrow}
          </p>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#27301d] md:text-5xl">
            {copy.communityTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#4e593c]">
            {copy.communityBody}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {COMMUNITY_WIDE_IMAGE_KEYS.map((imageKey, index) => (
            <div
              key={imageKey}
              className={[
                "relative h-[18rem] overflow-hidden bg-[#e8dcc2]",
                index === 1 ? "md:mt-10" : "",
              ].join(" ")}
            >
              <img
                src={IMAGE_PATHS[imageKey]}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

const ImpactCta = memo(function ImpactCta({ copy }: { copy: Copy }) {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center md:px-10">
      <img
        src={IMAGE_PATHS.landing}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/46" />
      <div className="absolute inset-0 bg-linear-to-b from-black/36 via-black/28 to-black/54" />

      <motion.div
        variants={sectionMotion}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.24 }}
        className="relative z-10 mx-auto max-w-3xl text-[#fffaf0]"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#e1d2a6]">
          {copy.eyebrow}
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          {copy.impactTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-[#f3ead2]">
          {copy.impactBody}
        </p>

        <Link
          to="/about/impact"
          className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
        >
          {copy.impactButton}
          <span className="ml-3" aria-hidden="true">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
});

export default memo(MeetTeamMain);