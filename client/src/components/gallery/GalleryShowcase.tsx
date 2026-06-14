"use client";

import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import { events } from "../../static_events";

type Lang = "en" | "mn";

type GalleryShowcaseProps = {
  lang?: Lang;
};

type GalleryImageKey = "hero";

type GalleryCardItem = {
  id: string;
  title: string;
  desc: string;
  date: string;
  year: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
};

type GalleryCopy = {
  eyebrow: string;
  pastEventsTitle: string;
  search: string;
  searchPlaceholder: string;
  index: string;
  viewAlbum: string;
  noResults: string;
  emptyTitle: string;
  emptyBody: string;
};

const IMAGE_PATHS: Record<GalleryImageKey, string> = {
  hero: "/landingpage.webp",
};

const ALBUM_STYLES = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[3/2]",
  "aspect-[5/6]",
  "aspect-[2/3]",
  "aspect-[6/5]",
  "aspect-[7/5]",
  "aspect-[5/7]",
] as const;

const COPY = {
  en: {
    eyebrow: "Gallery",
    pastEventsTitle: "Past Events",
    search: "Search gallery",
    searchPlaceholder: "Search title, description, or year...",
    index: "Gallery Index",
    viewAlbum: "View Album",
    noResults: "No matching galleries found.",
    emptyTitle: "No gallery items yet",
    emptyBody: "Past event galleries will appear here once they are added.",
  },
  mn: {
    eyebrow: "Цомог",
    pastEventsTitle: "Өнгөрсөн арга хэмжээнүүд",
    search: "Цомог хайх",
    searchPlaceholder: "Гарчиг, тайлбар эсвэл жилээр хайх...",
    index: "Цомгийн жагсаалт",
    viewAlbum: "Цомог үзэх",
    noResults: "Тохирох цомог олдсонгүй.",
    emptyTitle: "Одоогоор цомог алга",
    emptyBody:
      "Өнгөрсөн арга хэмжээний цомгууд нэмэгдмэгц энд харагдана.",
  },
} as const satisfies Record<Lang, GalleryCopy>;

const entranceVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function getYearFromDate(date: string) {
  return date.match(/\b(20\d{2}|19\d{2})\b/)?.[0] ?? "";
}

function getLayoutClass(count: number) {
  if (count <= 1) return "mx-auto max-w-3xl";
  if (count === 2) return "grid gap-10 md:grid-cols-2";
  if (count <= 5) return "grid gap-8 sm:grid-cols-2 xl:grid-cols-3";

  return "columns-1 gap-7 sm:columns-2 xl:columns-3";
}

function getAlbumFrame(index: number, isLargeSet: boolean) {
  if (isLargeSet) return ALBUM_STYLES[index % ALBUM_STYLES.length];

  return index % 2 === 0 ? "aspect-[4/3]" : "aspect-[5/4]";
}

function getEventImage(event: (typeof events)[number]) {
  return event.coverImage.lowRes || event.coverImage.highRes;
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function GalleryShowcase({ lang = "mn" }: GalleryShowcaseProps) {
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = COPY[safeLang];

  const [query, setQuery] = useState("");

  const galleryItems = useMemo<GalleryCardItem[]>(
    () =>
      events
        .filter((event) => event.status === "past" && event.gallery)
        .map((event) => {
          const year = getYearFromDate(event.date);

          return {
            id: event.id,
            title: event.title[safeLang],
            desc: event.description[safeLang],
            date: event.date,
            year,
            link: `/gallery/${event.id}`,
            imageSrc: getEventImage(event),
            imageAlt: event.coverImage.alt[safeLang],
          };
        }),
    [safeLang]
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) return galleryItems;

    return galleryItems.filter((item) => {
      const searchableText =
        `${item.title} ${item.desc} ${item.date} ${item.year} ${item.id}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [galleryItems, query]);

  const hasItems = galleryItems.length > 0;
  const hasResults = filteredItems.length > 0;
  const layoutClass = getLayoutClass(filteredItems.length);
  const isLargeSet = filteredItems.length > 5;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20 text-white">
      <PageBackground />

      <motion.div
        variants={entranceVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12"
      >
        <GalleryHeader copy={copy} />

        {!hasItems ? (
          <EmptyGallery copy={copy} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-start">
            <div className="lg:order-2">
              <GalleryLegend
                copy={copy}
                query={query}
                setQuery={setQuery}
                items={galleryItems}
              />
            </div>

            <div className="lg:order-1">
              {hasResults ? (
                <div className={layoutClass}>
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={isLargeSet ? "mb-12 break-inside-avoid" : ""}
                    >
                      <GalleryCard
                        item={item}
                        viewAlbum={copy.viewAlbum}
                        index={index}
                        isLargeSet={isLargeSet}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <NoResults copy={copy} />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

const PageBackground = memo(function PageBackground() {
  return (
    <>
      <img
        src={IMAGE_PATHS.hero}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/82" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,145,53,0.24),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.92))]" />
    </>
  );
});

const GalleryHeader = memo(function GalleryHeader({
  copy,
}: {
  copy: GalleryCopy;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d8caa5]">
        {copy.eyebrow}
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">
        {copy.pastEventsTitle}
      </h1>
    </div>
  );
});

const GalleryCard = memo(function GalleryCard({
  item,
  viewAlbum,
  index,
  isLargeSet,
}: {
  item: GalleryCardItem;
  viewAlbum: string;
  index: number;
  isLargeSet: boolean;
}) {
  const frame = getAlbumFrame(index, isLargeSet);

  return (
    <Link
      to={item.link}
      aria-label={`${viewAlbum}: ${item.title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8caa5] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <article>
        <div
          className={`${frame} relative overflow-hidden bg-black/30 shadow-[0_22px_70px_rgba(0,0,0,0.38)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)]`}
        >
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            width={960}
            height={720}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          <span className="absolute bottom-3 right-3 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm">
            {viewAlbum} →
          </span>
        </div>

        <div className="mt-4 px-1">
          <h2 className="text-lg font-semibold leading-tight tracking-tight text-white">
            {item.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/68">
            {item.desc}
          </p>
        </div>
      </article>
    </Link>
  );
});

const GalleryLegend = memo(function GalleryLegend({
  copy,
  query,
  setQuery,
  items,
}: {
  copy: GalleryCopy;
  query: string;
  setQuery: (value: string) => void;
  items: GalleryCardItem[];
}) {
  return (
    <aside className="bg-[#fffaf0] p-5 text-[#27301d] shadow-[0_20px_60px_rgba(0,0,0,0.32)] lg:sticky lg:top-28">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9a7b26]">
        {copy.index}
      </p>

      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4e593c]/70">
          {copy.search}
        </span>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          autoComplete="off"
          className="mt-2 w-full border border-[#d8caa5] bg-white/75 px-3 py-2 text-sm text-[#27301d] outline-none transition focus:border-[#9a7b26]"
        />
      </label>

      <div className="mt-5 flex max-h-[22rem] flex-col gap-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="text-sm leading-5 text-[#4e593c]/82 transition-colors hover:text-[#27301d]"
          >
            <span className="block font-medium">{item.title}</span>

            {item.year && (
              <span className="mt-0.5 block text-xs text-[#9a7b26]/80">
                {item.year}
              </span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
});

const EmptyGallery = memo(function EmptyGallery({
  copy,
}: {
  copy: GalleryCopy;
}) {
  return (
    <div className="mx-auto max-w-xl border border-white/12 bg-white/[0.08] p-7 text-center backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-white">{copy.emptyTitle}</h2>
      <p className="mt-3 text-sm leading-7 text-white/65">{copy.emptyBody}</p>
    </div>
  );
});

const NoResults = memo(function NoResults({ copy }: { copy: GalleryCopy }) {
  return (
    <p className="border border-white/12 bg-white/[0.08] p-6 text-sm text-white/70 backdrop-blur-sm">
      {copy.noResults}
    </p>
  );
});

export default memo(GalleryShowcase);