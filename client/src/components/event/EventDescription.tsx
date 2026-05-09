type EventDescriptionProps = {
  lang: "mn" | "en";
  description: string;
  descriptionEn: string;
};

export default function EventDescription({
  lang,
  description,
  descriptionEn,
}: EventDescriptionProps) {
  const activeDescription = lang === "mn" ? description : descriptionEn;

  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-black/45">
          Description
        </h2>
      </div>

      <div className="mt-4 max-h-[420px] overflow-y-auto whitespace-pre-line pr-1 text-sm leading-relaxed text-black/74">
        {activeDescription}
      </div>
    </section>
  );
}