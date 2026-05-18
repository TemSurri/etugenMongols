"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landingpage.webp";

type Lang = "en" | "mn";

type AboutEventsProps = {
  lang: Lang;
};

const NAADAM_URL =
  "https://ich.unesco.org/en/RL/naadam-mongolian-traditional-festival-00395";

const ABOUT_EVENTS_COPY = {
  en: {
    eyebrow: "Cultural Events",
    title: "Events",
    intro:
      "Our events create spaces where Mongolian culture can be shared, experienced, and passed forward through celebration, food, language, performance, and community gathering.",
    naadam: "Naadam",
    upcoming: "View Upcoming Events",
    galleries: "View Past Events",
    getInvolved: "See How to Get Involved",
    whyTitle: "Why We Organize Events",
    whyBody:
      "Events make culture visible and participatory. They bring families, youth, elders, volunteers, performers, and guests together in one place to experience traditions that are often passed down through memory, practice, and shared celebration.",
    howTitle: "How We Create Them",
    howBody:
      "Each event is built through community effort. Volunteers help organize, performers share their talents, families support the preparation, and guests help create the energy of the day.",
    preserveTitle: "Preserving Heritage",
    preserveBody:
      "Celebrations like Naadam remind us that culture is not only something we remember. It is something we continue to practice, teach, and share with the next generation.",
    accessTitle: "Open Cultural Access",
    accessBody:
      "We want Mongolian culture to feel accessible to everyone, whether they grew up with it or are learning about it for the first time.",
    volunteerTitle: "How to Get Involved",
    volunteerBody:
      "Upcoming events may include volunteer roles such as setup, food preparation, guest support, performance coordination, cleanup, and general event assistance.",
    volunteerNote:
      "When you open an upcoming event, available roles will be listed with their respective contact information so you can reach the right organizer directly.",
  },
  mn: {
    eyebrow: "Соёлын арга хэмжээ",
    title: "Арга хэмжээ",
    intro:
      "Манай арга хэмжээнүүд нь Монгол соёлыг баяр ёслол, хоол, хэл, тоглолт, хамтын оролцоогоор дамжуулан хуваалцах, мэдрэх, дараагийн үедээ өвлүүлэх орон зайг бий болгодог.",
    naadam: "Наадам",
    upcoming: "Удахгүй болох арга хэмжээ",
    galleries: "Өмнөх арга хэмжээнүүд",
    getInvolved: "Хэрхэн оролцох вэ",
    whyTitle: "Бид яагаад арга хэмжээ зохион байгуулдаг вэ",
    whyBody:
      "Арга хэмжээ нь соёлыг илүү бодит, хамтын оролцоотой болгодог. Гэр бүл, залуус, ахмад үе, сайн дурынхан, уран бүтээлчид, зочид нэг дор цуглаж, уламжлалыг өөрийн биеэр мэдрэх боломжтой болдог.",
    howTitle: "Бид хэрхэн зохион байгуулдаг вэ",
    howBody:
      "Арга хэмжээ бүр нийгэмлэгийн хамтын оролцоогоор бүтдэг. Сайн дурынхан зохион байгуулалтад тусалж, уран бүтээлчид авьяасаа хуваалцаж, гэр бүлүүд бэлтгэлд оролцож, зочид тухайн өдрийн уур амьсгалыг бүрдүүлдэг.",
    preserveTitle: "Өв соёлоо хадгалах",
    preserveBody:
      "Наадам зэрэг баярууд нь соёл бол зөвхөн санаж явах зүйл биш гэдгийг харуулдаг. Соёл бол үргэлжлүүлэн хийж, зааж, хуваалцаж байж амьдардаг зүйл юм.",
    accessTitle: "Хүн бүрт нээлттэй соёл",
    accessBody:
      "Монгол соёлыг багаасаа мэддэг хүмүүст ч, анх удаа сонирхож буй хүмүүст ч ойлгомжтой, нээлттэй байлгахыг бид зорьдог.",
    volunteerTitle: "Хэрхэн оролцох вэ",
    volunteerBody:
      "Удахгүй болох арга хэмжээнүүдэд тайз засалт, хоол бэлтгэл, зочин угтах, тоглолтын зохицуулалт, цэвэрлэгээ болон ерөнхий туслалцааны сайн дурын үүргүүд байж болно.",
    volunteerNote:
      "Удахгүй болох арга хэмжээг нээх үед боломжтой сайн дурын үүргүүд болон холбогдох хүний мэдээлэл тус бүрээрээ харагдах болно.",
  },
} as const;

function TextBlock({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-t border-[#b39135]/25 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
        {number}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-3xl text-base leading-8 text-[#4e593c] md:text-lg md:leading-9">
        {body}
      </p>
    </section>
  );
}

function AboutEvents({ lang }: AboutEventsProps) {
  const copy = ABOUT_EVENTS_COPY[lang];

  const scrollToVolunteer = () => {
    document.getElementById("event-volunteer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#efe4cc] pt-20 text-[#27301d]">
      <img
        src={landingImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
      />

      <div className="absolute inset-0 bg-[#fff7e7]/86" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 md:px-10 lg:px-12">
        <header className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9a7b26]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[#27301d] md:text-7xl">
            {copy.title}
          </h1>

          <p className="mt-8 text-lg leading-9 text-[#4e593c] md:text-xl md:leading-10">
            {copy.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/events"
              className="w-fit text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.upcoming} →
            </Link>

            <Link
              to="/gallery"
              className="w-fit text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.galleries} →
            </Link>

            <button
              type="button"
              onClick={scrollToVolunteer}
              className="w-fit text-left text-sm font-semibold text-[#6f571a] underline decoration-[#b39135]/35 underline-offset-4 transition-colors hover:text-[#27301d]"
            >
              {copy.getInvolved} →
            </button>
          </div>
        </header>

        <div className="my-14 h-px w-full bg-[#b39135]/25" />

        <main className="space-y-12">
          <TextBlock
            number="01"
            title={copy.whyTitle}
            body={copy.whyBody}
          />

          <TextBlock
            number="02"
            title={copy.howTitle}
            body={copy.howBody}
          />

          <section className="border-y border-[#b39135]/25 py-10">
            <p className="max-w-3xl text-2xl font-medium leading-10 tracking-tight text-[#27301d] md:text-3xl md:leading-[3rem]">
              “Events turn culture into something people can see, hear, taste,
              and take part in.”
            </p>

            <p className="mt-5 text-sm leading-7 text-[#4e593c]">
              {lang === "en" ? (
                <>
                  Celebrations like{" "}
                  <a
                    href={NAADAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
                  >
                    {copy.naadam}
                  </a>{" "}
                  help connect tradition with shared community experience.
                </>
              ) : (
                <>
                  <a
                    href={NAADAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#9a7b26] underline decoration-[#b39135]/40 underline-offset-4 transition-colors hover:text-[#27301d]"
                  >
                    {copy.naadam}
                  </a>{" "}
                  зэрэг баярууд нь уламжлалыг хамтын туршлагатай холбодог.
                </>
              )}
            </p>
          </section>

          <TextBlock
            number="03"
            title={copy.preserveTitle}
            body={copy.preserveBody}
          />

          <TextBlock
            number="04"
            title={copy.accessTitle}
            body={copy.accessBody}
          />

          <section
            id="event-volunteer"
            className="scroll-mt-28 border-t border-[#b39135]/25 pt-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
              05
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#27301d] md:text-3xl">
              {copy.volunteerTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-[#4e593c] md:text-lg md:leading-9">
              {copy.volunteerBody}
            </p>

            <p className="mt-5 max-w-3xl border-l border-[#b39135]/40 pl-5 text-sm leading-7 text-[#4e593c]/90 md:text-base md:leading-8">
              {copy.volunteerNote}
            </p>

            <Link
              to="/events"
              className="mt-7 inline-flex w-fit items-center justify-center border border-[#b39135]/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#27301d] transition-colors hover:border-[#27301d] hover:bg-[#27301d] hover:text-[#fffaf0]"
            >
              {copy.upcoming}
              <span className="ml-3">→</span>
            </Link>
          </section>
        </main>
      </div>
    </section>
  );
}

export default memo(AboutEvents);