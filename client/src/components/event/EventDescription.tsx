import LightCard from "./LightCard";

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
  const activeOverview = lang === "mn" ? description : descriptionEn;

  return (
    <LightCard
      title="Description"
      className="md:col-span-7 lg:col-span-6"
      rightSlot={
        <button
          onClick={onToggleLang}
          className="border border-black/10 bg-black/0.03 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-black/68 transition hover:bg-black/0.06 hover:text-black"
        >
          {lang === "mn" ? "English" : "Монгол"}
        </button>
      }
    >
      <div className="border-b border-black/8 pb-2 text-[11px] uppercase tracking-[0.14em] text-black/40">
        Overview
      </div>

      <div className="mt-3 h-[280px] overflow-y-auto pr-1 text-[13px] leading-relaxed whitespace-pre-line text-black/76 sm:h-[340px] sm:text-sm lg:h-[420px]">
        {activeOverview}
      </div>
    </LightCard>
  );
}