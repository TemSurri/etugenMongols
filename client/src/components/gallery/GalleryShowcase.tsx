"use client";

import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import heroBg from "../../assets/landingpage.webp";
import {
  events as galleryEvents,
  getCardInfos,
} from "../../static_gallery";

type Lang = "en" | "mn";

type GalleryShowcaseProps = {
  lang?: Lang;
};

/**
 * Localized text for the gallery page.
 * Keep both language objects structurally identical.
 */
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
    pastEventsTitle: "Өмнөх арга хэмжээнүүд",
    search: "Цомог хайх",
    searchPlaceholder: "Гарчиг, тайлбар, жилээр хайх...",
    index: "Цомгийн жагсаалт",
    viewAlbum: "Цомог үзэх",
    noResults: "Тохирох цомог олдсонгүй.",
    emptyTitle: "Одоогоор зураг алга",
    emptyBody: "Өмнөх арга хэмжээний зургууд нэмэгдмэгц энд харагдана.",
  },
} as const;

type GalleryCopy = (typeof COPY)[Lang];
type GalleryCardItem = ReturnType<typeof getCardInfos>[number];

/**
 * Page entrance animation.
 * Only used on the main wrapper so filtering does not break card visibility.
 */
const entranceVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/**
 * Photo album aspect-ratio variety.
 * Used only when there are enough items to justify a mixed layout.
 */
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

/**
 * Extracts a year from title, description, or id.
 * This lets search work for years like 2022, 2023, 2024, etc.
 */
function getYearFromItem(item: GalleryCardItem) {
  const text = `${item.title} ${item.desc} ${item.id}`;
  return text.match(/\b(20\d{2}|19\d{2})\b/)?.[0] ?? "";
}

/**
 * Layout changes based on how many results are visible.
 * Small result sets look larger and cleaner; bigger sets become album-style.
 */
function getLayoutClass(count: number) {
  if (count <= 1) return "mx-auto max-w-3xl";
  if (count === 2) return "grid gap-10 md:grid-cols-2";
  if (count <= 5) return "grid gap-8 sm:grid-cols-2 xl:grid-cols-3";
  return "columns-1 gap-7 sm:columns-2 xl:columns-3";
}

function GalleryCard({
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
  // More varied aspect ratios for larger gallery sets.
  const frame = isLargeSet
    ? ALBUM_STYLES[index % ALBUM_STYLES.length]
    : index % 2 === 0
      ? "aspect-[4/3]"
      : "aspect-[5/4]";

  return (
    <Link
      to={item.link}
      aria-label={`${viewAlbum}: ${item.title}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8caa5] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
    >
      <article>
        {/* Image block */}
        <div
          className={`${frame} relative overflow-hidden bg-black/30 shadow-[0_22px_70px_rgba(0,0,0,0.38)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.5)]`}
        >
          <img
            src={`/gallery/${item.id}/albumphotos/1.png`}
            alt={item.title}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Bottom readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          <span className="absolute bottom-3 right-3 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm">
            {viewAlbum} →
          </span>
        </div>

        {/* Text under image */}
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
}

function GalleryLegend({
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

      {/* Search */}
      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4e593c]/70">
          {copy.search}
        </span>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="mt-2 w-full border border-[#d8caa5] bg-white/75 px-3 py-2 text-sm text-[#27301d] outline-none transition focus:border-[#9a7b26]"
        />
      </label>

      {/* Index links */}
      <div className="mt-5 flex max-h-[22rem] flex-col gap-3 overflow-y-auto pr-1">
        {items.map((item) => {
          const year = getYearFromItem(item);

          return (
            <Link
              key={item.id}
              to={item.link}
              className="text-sm leading-5 text-[#4e593c]/82 transition-colors hover:text-[#27301d]"
            >
              <span className="block font-medium">{item.title}</span>

              {year && (
                <span className="mt-0.5 block text-xs text-[#9a7b26]/80">
                  {year}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function EmptyGallery({ copy }: { copy: GalleryCopy }) {
  return (
    <div className="mx-auto max-w-xl border border-white/12 bg-white/[0.08] p-7 text-center backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-white">{copy.emptyTitle}</h2>
      <p className="mt-3 text-sm leading-7 text-white/65">{copy.emptyBody}</p>
    </div>
  );
}

function GalleryShowcase({ lang = "mn" }: GalleryShowcaseProps) {
  // Safety fallback prevents undefined copy crashes.
  const safeLang: Lang = lang === "en" || lang === "mn" ? lang : "mn";
  const copy = COPY[safeLang];

  const [query, setQuery] = useState("");

  // Convert full gallery data into display cards once.
  const galleryItems = useMemo(() => getCardInfos(galleryEvents), []);

  // Filter by title, description, id, or year.
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return galleryItems;

    return galleryItems.filter((item) => {
      const year = getYearFromItem(item);
      const searchableText =
        `${item.title} ${item.desc} ${item.id} ${year}`.toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [galleryItems, query]);

  const hasItems = galleryItems.length > 0;
  const hasResults = filteredItems.length > 0;
  const layoutClass = getLayoutClass(filteredItems.length);
  const isLargeSet = filteredItems.length > 5;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20 text-white">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/82" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,145,53,0.24),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.92))]" />

      {/* Page content */}
      <motion.div
        variants={entranceVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-10 lg:px-12"
      >
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d8caa5]">
            {copy.eyebrow}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {copy.pastEventsTitle}
          </h1>
        </div>

        {!hasItems ? (
          <EmptyGallery copy={copy} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-start">
            {/* Right-side legend/search */}
            <div className="lg:order-2">
              <GalleryLegend
                copy={copy}
                query={query}
                setQuery={setQuery}
                items={galleryItems}
              />
            </div>

            {/* Main gallery */}
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
                <p className="border border-white/12 bg-white/[0.08] p-6 text-sm text-white/70 backdrop-blur-sm">
                  {copy.noResults}
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default memo(GalleryShowcase);