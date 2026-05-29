"use client";

type Lang = "en" | "mn";

type OurImpactMainProps = {
  lang: Lang;
};

const COPY = {
  en: {
    eyebrow: "Our Impact",
    title: "Strengthening Culture Through Community",
    intro:
      "Etugen Mongols supports cultural connection, language preservation, youth involvement, and community belonging through events, programs, and shared traditions.",
    stats: [
      {
        value: "200+",
        label: "Families reached through cultural events and gatherings.",
      },
      {
        value: "10+",
        label: "Community programs, celebrations, and cultural activities.",
      },
      {
        value: "2",
        label: "Languages supported across the website and event information.",
      },
    ],
    bodyTitle: "Why It Matters",
    body:
      "Our work helps create spaces where Mongolian families, youth, and community members can stay connected to their heritage while building relationships across generations.",
  },
  mn: {
    eyebrow: "Бидний нөлөө",
    title: "Хамт олноор дамжуулан соёлоо бэхжүүлэх",
    intro:
      "Этүгэн Монголчууд нь арга хэмжээ, хөтөлбөр, уламжлалаар дамжуулан соёл, хэл, залуучуудын оролцоо, хамтын холбоог дэмждэг.",
    stats: [
      {
        value: "200+",
        label: "Соёлын арга хэмжээ, уулзалтаар хүрсэн гэр бүлүүд.",
      },
      {
        value: "10+",
        label: "Олон нийтийн хөтөлбөр, баяр, соёлын үйл ажиллагаа.",
      },
      {
        value: "2",
        label: "Вэбсайт болон арга хэмжээний мэдээлэлд ашиглагдах хэл.",
      },
    ],
    bodyTitle: "Яагаад чухал вэ",
    body:
      "Бидний ажил нь Монгол гэр бүл, хүүхэд залуус, хамт олны гишүүдийг өв соёлтой нь холбож, үе үеийн харилцааг бэхжүүлэх орон зайг бий болгодог.",
  },
} as const;

export default function OurImpactMain({ lang }: OurImpactMainProps) {
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

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {copy.stats.map((stat) => (
            <article
              key={stat.value}
              className="rounded-2xl border border-[#d8caa5]/75 bg-[#fffaf0]/90 p-6 shadow-[0_14px_38px_rgba(88,72,38,0.10)]"
            >
              <p className="text-4xl font-semibold tracking-tight text-[#27301d]">
                {stat.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-[#4e593c]/80">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#d8caa5]/75 bg-[#fffaf0]/90 p-6 shadow-[0_14px_38px_rgba(88,72,38,0.10)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            {copy.bodyTitle}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4e593c]/85">
            {copy.body}
          </p>
        </div>
      </div>
    </section>
  );
}