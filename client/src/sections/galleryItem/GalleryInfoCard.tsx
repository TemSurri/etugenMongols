import type { EventVideo, PerformanceItem } from "../../static_events";

type Lang = "en" | "mn";
type SectionKey = "general" | "performances" | "behindTheScenes";

type GalleryInfoCardProps = {
  lang: Lang;
  sectionKey: SectionKey;
  sectionTitle?: string;
  description?: string;
  montageVideo?: EventVideo;
  performances: PerformanceItem[];
  activePerformance?: PerformanceItem;
  performanceVideos?: EventVideo[];
  onSelectPerformance: (id: string) => void;
  thankYouVideo?: EventVideo;
};

const COPY = {
  en: {
    section: "Gallery Section",
    montage: "Montage",
    performances: "Performance List",
    videos: "Performance Video",
    appreciation: "Appreciation",
  },
  mn: {
    section: "Цомгийн хэсэг",
    montage: "Эвлүүлэг",
    performances: "Тоглолтын жагсаалт",
    videos: "Тоглолтын бичлэг",
    appreciation: "Талархал",
  },
} as const;

export default function GalleryInfoCard({
  lang,
  sectionKey,
  sectionTitle,
  description,
  montageVideo,
  performances,
  activePerformance,
  performanceVideos,
  onSelectPerformance,
  thankYouVideo,
}: GalleryInfoCardProps) {
  const copy = COPY[lang];

  return (
    <div className="border border-[#d8caa5]/70 bg-[#fffaf0]/95 p-5 shadow-[0_14px_38px_rgba(88,72,38,0.10)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
        {copy.section}
      </p>

      {sectionTitle && (
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#27301d]">
          {sectionTitle}
        </h2>
      )}

      {description && (
        <p className="mt-3 text-sm leading-7 text-[#4e593c]/85">
          {description}
        </p>
      )}

      {montageVideo && sectionKey === "general" && (
        <div className="mt-6 border-t border-[#d8caa5]/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.montage}
          </p>

          <div className="mt-3 aspect-video overflow-hidden border border-[#d8caa5]/70 bg-black">
            <iframe
              className="h-full w-full"
              src={montageVideo.url}
              title={montageVideo.title[lang]}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {sectionKey === "performances" && performances.length > 0 && (
        <div className="mt-6 border-t border-[#d8caa5]/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.performances}
          </p>

          <div className="mt-3 space-y-2">
            {performances.map((performance) => {
              const isActive = performance.id === activePerformance?.id;

              return (
                <button
                  key={performance.id}
                  type="button"
                  onClick={() => onSelectPerformance(performance.id)}
                  className={`w-full border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-[#27301d] bg-[#27301d] text-[#fffaf0]"
                      : "border-[#d8caa5]/80 bg-white/60 text-[#27301d] hover:border-[#9a7b26]"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {performance.title[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sectionKey === "performances" &&
        performanceVideos &&
        performanceVideos.length > 0 && (
          <div className="mt-6 border-t border-[#d8caa5]/70 pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
              {copy.videos}
            </p>

            <div className="mt-3 space-y-3">
              {performanceVideos.map((video) => (
                <div
                  key={video.url}
                  className="aspect-video overflow-hidden border border-[#d8caa5]/70 bg-black"
                >
                  <iframe
                    className="h-full w-full"
                    src={video.url}
                    title={video.title[lang]}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      {thankYouVideo && (
        <div className="mt-6 border-t border-[#d8caa5]/70 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
            {copy.appreciation}
          </p>

          <div className="mt-3 aspect-video overflow-hidden border border-[#d8caa5]/70 bg-black">
            <iframe
              className="h-full w-full"
              src={thankYouVideo.url}
              title={thankYouVideo.title[lang]}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}