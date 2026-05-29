"use client";

type Lang = "en" | "mn";

type VolunteerProps = {
  lang: Lang;
};

const COPY = {
  en: {
    eyebrow: "Get Involved",
    title: "Volunteer With Us",
    body: "Support Etugen Mongols by helping with events, cultural programs, setup, coordination, media, and community outreach.",
    cta: "Contact us to volunteer",
  },
  mn: {
    eyebrow: "Оролцох",
    title: "Сайн дурын ажилтан болох",
    body: "Арга хэмжээ, соёлын хөтөлбөр, зохион байгуулалт, зураг бичлэг, олон нийттэй харилцах ажилд бидэнтэй хамтран оролцоорой.",
    cta: "Сайн дурын ажилтнаар холбогдох",
  },
} as const;

export default function Volunteer({ lang }: VolunteerProps) {
  const copy = COPY[lang];

  return (
    <section className="min-h-screen bg-[#f4ecd9] pt-28 text-[#27301d]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#9a7b26]">
          {copy.eyebrow}
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#4e593c]/85">
          {copy.body}
        </p>

        <a
          href="mailto:contact@etugenmongols.org"
          className="mt-8 inline-flex border border-[#b39135]/60 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#27301d] transition-colors hover:bg-[#27301d] hover:text-[#fffaf0]"
        >
          {copy.cta} →
        </a>
      </div>
    </section>
  );
}