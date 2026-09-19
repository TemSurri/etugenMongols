type Props = { lang: "en" | "mn"; toggleLang: () => void };
export default function LanguageToggle({ lang, toggleLang }: Props) {
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="grid h-11 w-[8.75rem] grid-cols-2 border border-[#e6dcc3] bg-[#fffaf0] p-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#27301d] transition-colors hover:border-[#d8caa5]"
      aria-label="Toggle language"
    >
      <span
        className={[
          "flex h-full w-full items-center justify-center transition-colors",

          lang === "en"
            ? "bg-white text-[#9a7b26] shadow-sm"
            : "text-[#27301d]/55",
        ].join(" ")}
      >
        EN
      </span>

      <span
        className={[
          "flex h-full w-full items-center justify-center transition-colors",

          lang === "mn"
            ? "bg-white text-[#9a7b26] shadow-sm"
            : "text-[#27301d]/55",
        ].join(" ")}
      >
        MN
      </span>
    </button>
  );
}
