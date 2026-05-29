"use client";

type Lang = "en" | "mn";

type MeetTeamMainProps = {
  lang: Lang;
};

const COPY = {
  en: {
    eyebrow: "Meet the Larger Team",
    title: "Built by Volunteers, Families, and Community Leaders",
    intro:
      "Etugen Mongols is supported by people who contribute their time, skills, and care to help preserve culture and create meaningful community events.",
    groups: [
      {
        title: "Organizers",
        body:
          "Plan events, coordinate programs, communicate with families, and help guide the organization’s direction.",
      },
      {
        title: "Volunteers",
        body:
          "Support setup, registration, food, performances, youth activities, cleanup, and event-day operations.",
      },
      {
        title: "Community Supporters",
        body:
          "Contribute through donations, participation, photography, media, outreach, and cultural knowledge.",
      },
    ],
  },
  mn: {
    eyebrow: "Өргөн хүрээний баг",
    title: "Сайн дурынхан, гэр бүлүүд, хамт олны удирдагчдаар бүтдэг",
    intro:
      "Этүгэн Монголчууд нь соёлоо хадгалах, утга учиртай арга хэмжээ зохион байгуулахын төлөө цаг, чадвар, сэтгэлээ зориулдаг хүмүүсээр дэмжигддэг.",
    groups: [
      {
        title: "Зохион байгуулагчид",
        body:
          "Арга хэмжээ төлөвлөж, хөтөлбөр зохицуулж, гэр бүлүүдтэй харилцаж, байгууллагын чиглэлийг дэмждэг.",
      },
      {
        title: "Сайн дурынхан",
        body:
          "Бэлтгэл, бүртгэл, хоол, үзүүлбэр, хүүхдийн үйл ажиллагаа, цэвэрлэгээ болон арга хэмжээний явцыг дэмждэг.",
      },
      {
        title: "Хамт олны дэмжигчид",
        body:
          "Хандив, оролцоо, зураг бичлэг, мэдээлэл түгээх болон соёлын мэдлэгээр хувь нэмэр оруулдаг.",
      },
    ],
  },
} as const;

export default function MeetTeamMain({ lang }: MeetTeamMainProps) {
  const copy = COPY[lang];

  return (
    <section className="min-h-screen bg-[#f4ecd9] pt-28 text-[#27301d]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:px-10 lg:px-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#9a7b26]">
          {copy.eyebrow}
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-[#4e593c]/85">
          {copy.intro}
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.groups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-[#d8caa5]/75 bg-[#fffaf0]/90 p-6 shadow-[0_14px_38px_rgba(88,72,38,0.10)] transition duration-300 hover:-translate-y-0.5 hover:border-[#b39135]/70 hover:shadow-[0_20px_52px_rgba(88,72,38,0.15)]"
            >
              <h2 className="text-2xl font-semibold tracking-tight">
                {group.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#4e593c]/85">
                {group.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}