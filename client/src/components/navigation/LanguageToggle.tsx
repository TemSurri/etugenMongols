type Props = { lang: "en" | "mn"; toggleLang: () => void };
export default function LanguageToggle({ lang, toggleLang }: Props) {
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="grid h-10 w-[6.5rem] grid-cols-2 border border-[#e6dcc3] bg-[#fffaf0] p-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#27301d] transition-colors hover:border-[#d8caa5] sm:h-11 sm:w-[7rem]"
      aria-label={lang === "mn" ? "Хэл солих" : "Toggle language"}
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
