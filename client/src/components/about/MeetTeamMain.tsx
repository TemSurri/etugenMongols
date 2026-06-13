"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { cubicBezier, motion, type Variants } from "framer-motion";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

type TeamMember = {
  name: string;
  role: { en: string; mn: string };
  image: string;
};

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const COPY = {
  en: {
    eyebrow: "Our Community",
    title: "Meet the Bigger Team",
    body:
      "Etugen Mongols is led by board members who organize, guide, and support our events and programs. Around them is a bigger team of volunteers, performers, families, elders, photographers, sponsors, and supporters who help bring each gathering to life.",
    boardTitle: "Board Members",
    appreciationTitle: "With Deep Appreciation",
    appreciationIntro:
      "Every event is made possible by many hands. We are grateful to the people who continue to share their time, care, skills, and encouragement with the community.",
    impactTitle: "See the Impact",
    impactBody:
      "See the impact we were able to achieve together through years of culture, community, volunteering, and shared care.",
    impactButton: "View Our Impact",
  },
  mn: {
    eyebrow: "Манай хамт олон",
    title: "Манай том багтай танилцах",
    body:
      "Этүгэн Монголчуудын арга хэмжээ, хөтөлбөрүүдийг удирдах зөвлөлийн гишүүд зохион байгуулж, чиглүүлж, дэмждэг. Харин тэдний эргэн тойронд сайн дурынхан, уран бүтээлчид, гэр бүлүүд, ахмадууд, зурагчид, ивээн тэтгэгчид болон дэмжигчдээс бүрдсэн өргөн хамт олон байдаг.",
    boardTitle: "Удирдах зөвлөлийн гишүүд",
    appreciationTitle: "Талархалтайгаар",
    appreciationIntro:
      "Арга хэмжээ бүр олон хүний хамтын оролцоогоор бүтдэг. Цаг зав, сэтгэл, ур чадвар, дэмжлэгээ зориулдаг хамт олондоо бид талархаж байна.",
    impactTitle: "Бидний нөлөө",
    impactBody:
      "Соёл, хамтын ажиллагаа, сайн дурын оролцоо, халуун сэтгэлээр хамтдаа бүтээсэн нөлөөг хараарай.",
    impactButton: "Нөлөөг үзэх",
  },
} as const;

const BOARD_MEMBERS: TeamMember[] = [
  { name: "Member One", role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" }, image: "/about/founding-1.webp" },
  { name: "Member Two", role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" }, image: "/about/founding-2.webp" },
  { name: "Member Three", role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" }, image: "/about/founding-3.webp" },
  { name: "Member Four", role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" }, image: "/about/founding-4.webp" },
  { name: "Member Five", role: { en: "Board Member", mn: "Удирдах зөвлөлийн гишүүн" }, image: "/about/founding-5.webp" },
];

const COMMUNITY_MEMBERS: TeamMember[] = [
  { name: "Contributor One", role: { en: "Volunteer", mn: "Сайн дурын ажилтан" }, image: "/about/community-1.webp" },
  { name: "Contributor Two", role: { en: "Performer / Artist", mn: "Уран бүтээлч" }, image: "/about/community-2.webp" },
  { name: "Contributor Three", role: { en: "Community Supporter", mn: "Хамт олны дэмжигч" }, image: "/about/community-3.webp" },
  { name: "Contributor Four", role: { en: "Photographer", mn: "Зурагчин" }, image: "/about/community-4.webp" },
];

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <section className="overflow-hidden bg-[#fffaf0] text-[#27301d]">
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-10 lg:pt-32">
          <img
            src="/landingpage.webp"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#fffaf0]/93" />
          <div className="absolute inset-0 bg-linear-to-b from-[#fffaf0]/98 via-[#fffaf0]/94 to-[#eef0e6]/96" />

          <motion.div
            variants={sectionMotion}
            initial="hidden"
            animate="show"
            className="relative z-10 mx-auto max-w-7xl"
          >
            <div className="grid gap-8 py-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-center lg:py-14">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9a7b26]">
                  {copy.eyebrow}
                </p>

                <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {copy.title}
                </h1>
              </div>

              <p className="max-w-3xl text-[15px] leading-8 text-[#4e593c] lg:justify-self-end lg:text-base">
                {copy.body}
              </p>
            </div>

            <section className="pt-6">
              <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
                {copy.boardTitle}
              </h2>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {BOARD_MEMBERS.map((member) => (
                  <BoardHoverCard key={member.name} member={member} lang={lang} />
                ))}
              </div>
            </section>
          </motion.div>
        </section>

        <section className="bg-[#fffaf0] px-6 py-20 md:px-10">
          <motion.div
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
          >
            <div className="max-w-xl">
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

            <div className="grid gap-5 sm:grid-cols-2">
              {COMMUNITY_MEMBERS.map((member) => (
                <ContributorCard key={member.name} member={member} lang={lang} />
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative overflow-hidden px-6 py-20 md:px-10">
          <img
            src="/landingpage.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#27301d]/88" />

          <motion.article
            variants={sectionMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="max-w-xl text-[#fffaf0]">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#d6b85d]">
                {copy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
                {copy.impactTitle}
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#f3ead2]">
                {copy.impactBody}
              </p>

              <Link
                to="/about/impact"
                className="mt-8 inline-flex bg-[#fffaf0] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#27301d] no-underline transition-colors duration-200 hover:bg-[#e1d2a6]"
              >
                {copy.impactButton}
                <span className="ml-3">→</span>
              </Link>
            </div>

            <div className="relative h-[24rem] overflow-hidden bg-[#27301d] sm:h-[30rem] lg:h-[34rem]">
              <img
                src="/about/story-children.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#27301d]/10" />
            </div>
          </motion.article>
        </section>
      </main>
    </section>
  );
}

function BoardHoverCard({ member, lang }: { member: TeamMember; lang: Lang }) {
  return (
    <motion.article
      variants={sectionMotion}
      className="group relative aspect-[4/5] overflow-hidden bg-[#e8ebe3]"
    >
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#27301d]/88 via-[#27301d]/18 to-transparent opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-4 text-[#fffaf0] transition-transform duration-300 lg:translate-y-5 lg:group-hover:translate-y-0">
        <h3 className="text-lg font-semibold leading-tight">{member.name}</h3>

        <p className="mt-1 text-xs font-medium text-[#e1d2a6]">
          {member.role[lang]}
        </p>
      </div>
    </motion.article>
  );
}

function ContributorCard({ member, lang }: { member: TeamMember; lang: Lang }) {
  return (
    <motion.article
      variants={sectionMotion}
      whileHover={{ y: -3 }}
      className="grid grid-cols-[7rem_1fr] items-center gap-5 bg-[#efefec] p-3 sm:grid-cols-1"
    >
      <div className="aspect-square overflow-hidden bg-[#e8dcc2]">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="sm:px-2 sm:pb-2">
        <h3 className="text-xl font-semibold leading-tight text-[#27301d]">
          {member.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#4e593c]">
          {member.role[lang]}
        </p>
      </div>
    </motion.article>
  );
}

export default memo(MeetTeamMain);