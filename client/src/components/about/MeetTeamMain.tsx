"use client";

import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  type Variants,
} from "framer-motion";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

type PreviewImage = {
  src: string;
  alt: string;
};

type TeamMember = {
  name: string;
  role: {
    en: string;
    mn: string;
  };
  image: string;
};

const COPY = {
  en: {
    eyebrow: "Our Community",
    title: "Meet the Bigger Team",
    body:
      "Etugen Mongols is organized by our board members and organizers, but strengthened by the wider community around us. Volunteers, performers, families, elders, photographers, sponsors, and supporters share their time, skills, and care to help turn plans into real gatherings. Together, this support helps preserve culture and create spaces for the next generation.",
    teamButton: "Meet the Team",

    foundingTitle: "The Organizing Team",
    foundingIntro:
      "These are some of the people who help coordinate events, support families, organize programs, and keep Etugen Mongols moving forward throughout the year.",

    contributorsTitle: "With Deep Appreciation",
    contributorsIntro:
      "We are deeply grateful to the many community members who continue to support Etugen Mongols with their time, skills, care, and encouragement. Every event is made possible by many hands.",

    galleryButton: "Explore the Gallery",

    impactTitle: "See the Impact",
    impactBody:
      "See the impact we were able to achieve together through years of culture, community, volunteering, and shared care.",
    impactButton: "View Our Impact",

    sponsorsTitle: "Sponsors & Supporters",
    sponsorsIntro:
      "This section can later recognize the organizations, businesses, and individuals who support Etugen Mongols through sponsorships, donations, and partnerships.",

    close: "Close",
  },
  mn: {
    eyebrow: "Манай хамт олон",
    title: "Манай том багтай танилцах",
    body:
      "Этүгэн Монголчуудын арга хэмжээ, хөтөлбөрийг удирдах зөвлөл болон зохион байгуулагчид зохион байгуулдаг ч өргөн хамт олны дэмжлэг бидний ажлыг улам хүчтэй болгодог. Сайн дурынхан, уран бүтээлчид, гэр бүлүүд, ахмадууд, зурагчид, ивээн тэтгэгчид болон дэмжигчид цаг зав, ур чадвар, сэтгэлээ зориулдаг.",
    teamButton: "Багтай танилцах",

    foundingTitle: "Зохион байгуулах баг",
    foundingIntro:
      "Эдгээр хүмүүс нь жилийн турш Этүгэн Монголчуудын арга хэмжээ, хөтөлбөрүүдийг зохион байгуулах, гэр бүлүүдийг дэмжих, олон нийтийн үйл ажиллагааг урагшлуулахад идэвхтэй оролцдог.",

    contributorsTitle: "Талархалтайгаар",
    contributorsIntro:
      "Этүгэн Монголчуудыг цаг зав, ур чадвар, сэтгэл, дэмжлэгээрээ үргэлж хүчирхэг болгож байдаг олон хамт олны гишүүддээ бид гүнээ талархаж байна.",

    galleryButton: "Галерей үзэх",

    impactTitle: "Бидний нөлөө",
    impactBody:
      "Соёл, хамтын ажиллагаа, сайн дурын оролцоо, халуун сэтгэлээр хамтдаа бүтээсэн нөлөөг хараарай.",
    impactButton: "Нөлөөг үзэх",

    sponsorsTitle: "Ивээн тэтгэгчид ба дэмжигчид",
    sponsorsIntro:
      "Цаашид энэ хэсэгт ивээн тэтгэгч байгууллага, хувь хүмүүс болон хамтын ажиллагааг харуулах боломжтой.",

    close: "Хаах",
  },
} as const;

const FOUNDING_MEMBERS: TeamMember[] = [
  { name: "Member One", role: { en: "Organizer", mn: "Зохион байгуулагч" }, image: "/about/founding-1.webp" },
  { name: "Member Two", role: { en: "Organizer", mn: "Зохион байгуулагч" }, image: "/about/founding-2.webp" },
  { name: "Member Three", role: { en: "Organizer", mn: "Зохион байгуулагч" }, image: "/about/founding-3.webp" },
  { name: "Member Four", role: { en: "Organizer", mn: "Зохион байгуулагч" }, image: "/about/founding-4.webp" },
  { name: "Member Five", role: { en: "Organizer", mn: "Зохион байгуулагч" }, image: "/about/founding-5.webp" },
];

const CONTRIBUTORS: TeamMember[] = [
  { name: "Contributor One", role: { en: "Community Supporter", mn: "Хамт олны дэмжигч" }, image: "/about/community-1.webp" },
  { name: "Contributor Two", role: { en: "Volunteer", mn: "Сайн дурын ажилтан" }, image: "/about/community-2.webp" },
  { name: "Contributor Three", role: { en: "Performer / Artist", mn: "Уран бүтээлч" }, image: "/about/community-3.webp" },
];

const HERO_PHOTOS: PreviewImage[] = [
  { src: "/about/community-1.webp", alt: "Community members supporting Etugen Mongols" },
  { src: "/about/community-2.webp", alt: "Volunteers and families preparing events" },
  { src: "/about/community-3.webp", alt: "Performers and supporters celebrating culture" },
];

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const textMotion: Variants = {
  hidden: { opacity: 0, x: 34 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const collageMotion: Variants = {
  hidden: { opacity: 0, x: -34 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.76,
      ease: easeOut,
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const photoMotion: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: easeOut },
  },
};

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOut },
  },
};

function scrollToTeam() {
  document
    .getElementById("team-members")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#2f3320] text-[#27301d]">
      {/* Independent page background */}
      <img
        src="/landingpage.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="fixed inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="fixed inset-0 -z-10 bg-black/45" />
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-black/38 via-[#2f3320]/62 to-[#2f3320]" />

      {/* HERO */}
      <section className="relative min-h-screen">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 pb-12 pt-32 sm:px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pt-36">
          <motion.div
            variants={collageMotion}
            initial="hidden"
            animate="show"
            className="relative order-2 mx-auto h-[30rem] w-full max-w-[40rem] lg:order-1 lg:h-[34rem]"
          >
            {HERO_PHOTOS.map((photo, index) => {
              const styles = [
                "left-0 top-5 z-20 w-[76%]",
                "right-0 top-[10.25rem] z-30 w-[52%] rotate-[2deg]",
                "bottom-4 left-[16%] z-10 w-[56%] -rotate-[1.5deg]",
              ];

              const heights = [
                "h-[17rem] sm:h-[19rem] lg:h-[21rem]",
                "h-[11.5rem] sm:h-[13rem] lg:h-[14rem]",
                "h-[10.5rem] sm:h-[12rem] lg:h-[13rem]",
              ];

              return (
                <motion.button
                  key={photo.src}
                  type="button"
                  variants={photoMotion}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => setPreviewImage(photo)}
                  className={`absolute ${styles[index]} bg-[#e8dcc2] p-2.5 text-left shadow-[0_22px_58px_rgba(0,0,0,0.22)] transition-shadow hover:shadow-[0_26px_70px_rgba(0,0,0,0.3)]`}
                  aria-label={photo.alt}
                >
                  <span className="block overflow-hidden border border-[#d8caa5]/80 bg-[#fffaf0] p-2">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className={`${heights[index]} w-full object-cover object-center`}
                    />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="order-1 flex flex-col items-start lg:order-2">
            <motion.div
              variants={textMotion}
              initial="hidden"
              animate="show"
              className="w-full max-w-xl border border-[#e1d2a6]/55 bg-[#fffaf0]/94 p-8 text-[#27301d] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-sm md:p-9 lg:p-10"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9a7b26]">
                {copy.eyebrow}
              </p>

              <h1 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#27301d] sm:text-4xl lg:text-[2.7rem]">
                {copy.title}
              </h1>

              <div className="my-6 h-px w-full bg-[#d8caa5]/90" />

              <p className="max-w-lg text-sm leading-7 text-[#4e593c] md:text-[15px] md:leading-8">
                {copy.body}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={scrollToTeam}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: easeOut }}
              className="mt-4 inline-flex items-center border border-[#fffaf0]/45 bg-[#fffaf0]/12 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fffaf0] backdrop-blur-sm transition-colors duration-200 hover:bg-[#fffaf0] hover:text-[#27301d]"
            >
              {copy.teamButton}
              <span className="ml-3 text-sm leading-none">↓</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section
        id="team-members"
        className="scroll-mt-20 bg-[#fffaf0] px-5 py-16 text-[#27301d] sm:px-6 md:px-10 lg:py-20"
      >
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-6xl"
        >
          <SectionHeader title={copy.foundingTitle} body={copy.foundingIntro} />

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {FOUNDING_MEMBERS.map((member) => (
              <TeamCard
                key={member.name}
                member={member}
                lang={lang}
                onPreview={setPreviewImage}
                variant="circle"
              />
            ))}
          </div>

          <div className="my-14 h-px bg-[#d8caa5]" />

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeader
                title={copy.contributorsTitle}
                body={copy.contributorsIntro}
              />

              <Link
                to="/gallery"
                className="mt-5 inline-flex items-center border border-[#b39135]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#27301d] no-underline transition-colors duration-200 hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
              >
                {copy.galleryButton}
                <span className="ml-3 text-base leading-none">→</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONTRIBUTORS.map((member) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  lang={lang}
                  onPreview={setPreviewImage}
                  variant="photo"
                />
              ))}
            </div>
          </div>

          <div className="my-14 h-px bg-[#d8caa5]" />

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <SectionHeader title={copy.impactTitle} body={copy.impactBody} />

            <Link
              to="/about/impact"
              className="inline-flex items-center justify-center border border-[#b39135]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#27301d] no-underline transition-colors duration-200 hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
            >
              {copy.impactButton}
              <span className="ml-3 text-base leading-none">→</span>
            </Link>
          </div>

          <div className="mt-14 bg-[#27301d] p-7 text-[#fffaf0] sm:p-8">
            <div className="max-w-2xl border-l-4 border-[#d6b85d] pl-4">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {copy.sponsorsTitle}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#fffaf0]/82">
                {copy.sponsorsIntro}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <ImagePreview
        image={previewImage}
        closeText={copy.close}
        onClose={() => setPreviewImage(null)}
      />
    </section>
  );
}

function SectionHeader({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-3xl border-l-4 border-[#b39135] pl-4">
      <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#4e593c]/90">{body}</p>
    </div>
  );
}

function TeamCard({
  member,
  lang,
  onPreview,
  variant,
}: {
  member: TeamMember;
  lang: Lang;
  onPreview: (image: PreviewImage) => void;
  variant: "circle" | "photo";
}) {
  if (variant === "circle") {
    return (
      <motion.button
        type="button"
        variants={sectionMotion}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => onPreview({ src: member.image, alt: member.name })}
        className="group flex flex-col items-center text-center"
        aria-label={member.name}
      >
        <div className="h-32 w-32 overflow-hidden rounded-full border border-[#d8caa5]/80 bg-[#f4ecd9] p-1 shadow-[0_10px_28px_rgba(39,48,29,0.12)] sm:h-36 sm:w-36 lg:h-40 lg:w-40">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <h3 className="mt-5 text-base font-semibold text-[#27301d]">
          {member.name}
        </h3>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
          {member.role[lang]}
        </p>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      variants={sectionMotion}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onPreview({ src: member.image, alt: member.name })}
      className="group bg-[#fffaf0] p-2 text-left shadow-[0_10px_28px_rgba(39,48,29,0.12)]"
      aria-label={member.name}
    >
      <div className="border border-[#d8caa5]/80 bg-[#f4ecd9] p-1">
        <div className="aspect-[4/5] overflow-hidden bg-[#e5d8b8]">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>
      </div>

      <div className="px-1.5 pb-1.5 pt-3">
        <h3 className="text-sm font-semibold leading-tight text-[#27301d]">
          {member.name}
        </h3>

        <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#9a7b26]">
          {member.role[lang]}
        </p>
      </div>
    </motion.button>
  );
}

function ImagePreview({
  image,
  closeText,
  onClose,
}: {
  image: PreviewImage | null;
  closeText: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/78 px-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="relative w-full max-w-5xl bg-[#fffaf0] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[78vh] w-full object-contain"
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 bg-[#27301d] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#fffaf0]"
            >
              {closeText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(MeetTeamMain);