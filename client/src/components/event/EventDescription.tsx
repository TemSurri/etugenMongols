type EventDescriptionProps = {
  lang: "mn" | "en";
  description: string;
  descriptionEn: string;
  onToggleLang: () => void;
};

export default function EventDescription({
  lang,
  description,
  descriptionEn,
  onToggleLang,
}: EventDescriptionProps) {
  const activeDescription = lang === "mn" ? description : descriptionEn;

  return (
    <section className="rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.16)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-black/45">
          Description
        </h2>

        <button
          type="button"
          onClick={onToggleLang}
          className="rounded-full border border-black/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-black/62 transition hover:bg-black/[0.04]"
        >
          {lang === "mn" ? "English" : "Монгол"}
        </button>
      </div>

      <div className="mt-4 max-h-[420px] overflow-y-auto whitespace-pre-line pr-1 text-sm leading-relaxed text-black/74">
        {activeDescription}
      </div>
    </section>
  );
}