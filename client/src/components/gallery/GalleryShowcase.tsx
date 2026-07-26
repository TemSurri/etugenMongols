"use client";

import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import { events } from "../../static_events";

/* =========================================================
   TYPES
========================================================= */

type Lang = "en" | "mn";
type ViewMode = "grid" | "timeline";

type GalleryShowcaseProps = {
  lang?: Lang;
};

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
  galleryTitle: string;
  pastEventsTitle: string;

  search: string;
  searchPlaceholder: string;

  index: string;

  view: string;
  grid: string;
  timeline: string;

  viewAlbum: string;

  noResults: string;

  emptyTitle: string;
  emptyBody: string;

  pastEvent: string;
};

/* =========================================================
   CONSTANTS
========================================================= */

const BACKGROUND_IMAGE = "/landingpage.webp";

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
    galleryTitle: "Gallery",
    pastEventsTitle: "Past Events",

    search: "Search Gallery",
    searchPlaceholder: "Search title, description, or year...",

    index: "Gallery Index",

    view: "View Gallery As",
    grid: "Grid",
    timeline: "Timeline",

    viewAlbum: "View Album",

    noResults: "No matching galleries found.",

    emptyTitle: "No gallery items yet",
    emptyBody:
      "Past event galleries will appear here once they are added.",

    pastEvent: "Past Event",
  },

  mn: {
    galleryTitle: "Цомог",
    pastEventsTitle: "Өнгөрсөн арга хэмжээнүүд",

    search: "Цомог хайх",
    searchPlaceholder: "Гарчиг, тайлбар эсвэл жилээр хайх...",

    index: "Цомгийн жагсаалт",

    view: "Цомгийн харагдац",
    grid: "Тор",
    timeline: "Он цаг",

    viewAlbum: "Цомог үзэх",

    noResults: "Тохирох цомог олдсонгүй.",

    emptyTitle: "Одоогоор цомог алга",
    emptyBody:
      "Өнгөрсөн арга хэмжээний цомгууд нэмэгдмэгц энд харагдана.",

    pastEvent: "Өнгөрсөн арга хэмжээ",
  },
} as const satisfies Record<Lang, GalleryCopy>;

/* =========================================================
   ANIMATION
========================================================= */

const entranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const timelineItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getYearFromDate(date: string) {
  return date.match(/\b(20\d{2}|19\d{2})\b/)?.[0] ?? "";
}

function getEventImage(event: (typeof events)[number]) {
  return event.coverImage.lowRes || event.coverImage.highRes;
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function getLayoutClass(count: number) {
  if (count <= 1) {
    return "mx-auto max-w-3xl";
  }

  if (count === 2) {
    return "grid gap-10 md:grid-cols-2";
  }

  if (count <= 5) {
    return "grid gap-8 sm:grid-cols-2 xl:grid-cols-3";
  }

  return "columns-1 gap-7 sm:columns-2 xl:columns-3";
}

function getAlbumFrame(index: number, isLargeSet: boolean) {
  if (isLargeSet) {
    return ALBUM_STYLES[index % ALBUM_STYLES.length];
  }

  return index % 2 === 0
    ? "aspect-[4/3]"
    : "aspect-[5/4]";
}

/* =========================================================
   MAIN
========================================================= */

function GalleryShowcase({
  lang = "mn",
}: GalleryShowcaseProps) {
  const safeLang: Lang =
    lang === "en" || lang === "mn" ? lang : "mn";

  const copy = COPY[safeLang];

  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] =
    useState<ViewMode>("grid");

  const galleryItems = useMemo<GalleryCardItem[]>(
    () =>
      events
        .filter(
          (event) =>
            event.status === "past" &&
            Boolean(event.gallery),
        )
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
    [safeLang],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery =
      normalizeSearchValue(query);

    if (!normalizedQuery) {
      return galleryItems;
    }

    return galleryItems.filter((item) => {
      const searchableText = [
        item.title,
        item.desc,
        item.date,
        item.year,
        item.id,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedQuery,
      );
    });
  }, [galleryItems, query]);

  const hasItems = galleryItems.length > 0;
  const hasResults = filteredItems.length > 0;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f3320] pt-20 text-[#fffaf0]">
      <PageBackground />

      <motion.div
        variants={entranceVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 md:px-10 lg:px-12"
      >
        <GalleryHeader copy={copy} />

        {!hasItems ? (
          <EmptyGallery copy={copy} />
        ) : (
          <>
            {/* =============================================
                DESKTOP PAGE-LEVEL VIEW CONTROL
            ============================================= */}

            <div className="hidden md:block">
              <GalleryViewBar
                copy={copy}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>

            {/* =============================================
                MAIN GALLERY LAYOUT
            ============================================= */}

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-10">
              {/* Mobile: first
                  Desktop: right-hand side */}
              <div className="order-1 lg:order-2">
                <GalleryLegend
                  copy={copy}
                  query={query}
                  setQuery={setQuery}
                  items={filteredItems}
                />
              </div>

              {/* Main content */}
              <main className="order-2 min-w-0 lg:order-1">
                {hasResults ? (
                  <>
                    {/* Mobile is always timeline */}
                    <div className="md:hidden">
                      <GalleryTimeline
                        items={filteredItems}
                        copy={copy}
                      />
                    </div>

                    {/* Desktop follows selected view */}
                    <div className="hidden md:block">
                      {viewMode === "grid" ? (
                        <GalleryGrid
                          items={filteredItems}
                          copy={copy}
                        />
                      ) : (
                        <GalleryTimeline
                          items={filteredItems}
                          copy={copy}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <NoResults copy={copy} />
                )}
              </main>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

const PageBackground = memo(
  function PageBackground() {
    return (
      <div className="absolute inset-0">
        <img
          src={BACKGROUND_IMAGE}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#27301d]/78" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#27301d]/40 via-[#27301d]/64 to-[#202517]/95" />
      </div>
    );
  },
);

/* =========================================================
   HEADER
========================================================= */

const GalleryHeader = memo(
  function GalleryHeader({
    copy,
  }: {
    copy: GalleryCopy;
  }) {
    return (
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#fffaf0] md:text-6xl">
          {copy.galleryTitle}
        </h1>
      </header>
    );
  },
);

/* =========================================================
   DESKTOP VIEW BAR
========================================================= */

const GalleryViewBar = memo(
  function GalleryViewBar({
    copy,
    viewMode,
    setViewMode,
  }: {
    copy: GalleryCopy;
    viewMode: ViewMode;
    setViewMode: (value: ViewMode) => void;
  }) {
    return (
      <div
        className="
          flex items-center justify-between
          border-y border-[#e1d2a6]/25
          bg-[#fffaf0]/8
          px-5 py-4
          backdrop-blur-sm
        "
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e1d2a6]">
            {copy.pastEventsTitle}
          </p>

          <p className="mt-1 text-sm text-[#f3ead2]/65">
            {copy.view}
          </p>
        </div>

        <div className="inline-flex border border-[#fffaf0]/20 bg-[#fffaf0]/8 p-1">
          <ViewButton
            active={viewMode === "grid"}
            onClick={() =>
              setViewMode("grid")
            }
          >
            <GridIcon />
            {copy.grid}
          </ViewButton>

          <ViewButton
            active={viewMode === "timeline"}
            onClick={() =>
              setViewMode("timeline")
            }
          >
            <TimelineIcon />
            {copy.timeline}
          </ViewButton>
        </div>
      </div>
    );
  },
);

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        `
          flex items-center justify-center
          gap-2
          px-5 py-2.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.17em]
          transition-all
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#fffaf0]/60
        `,

        active
          ? "bg-[#fffaf0] text-[#27301d] shadow-sm"
          : "text-[#f3ead2]/75 hover:bg-[#fffaf0]/10 hover:text-[#fffaf0]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* =========================================================
   ICONS
========================================================= */

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function TimelineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M7 3v18" />
      <circle cx="7" cy="6" r="2" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M11 6h10" />
      <path d="M11 12h7" />
      <path d="M11 18h10" />
    </svg>
  );
}

/* =========================================================
   SEARCH / INDEX
========================================================= */

const GalleryLegend = memo(
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
      <aside className="bg-[#fffaf0] p-5 text-[#27301d] shadow-[0_18px_50px_rgba(18,23,12,0.24)] lg:sticky lg:top-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a762f]">
          {copy.index}
        </p>

        <GallerySearch
          copy={copy}
          query={query}
          setQuery={setQuery}
        />

        <GalleryIndex
          copy={copy}
          items={items}
        />
      </aside>
    );
  },
);

function GallerySearch({
  copy,
  query,
  setQuery,
}: {
  copy: GalleryCopy;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <label className="mt-5 block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4e593c]/70">
        {copy.search}
      </span>

      <input
        type="search"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder={copy.searchPlaceholder}
        autoComplete="off"
        className="
          mt-2 w-full
          border border-[#d8caa5]
          bg-white/70
          px-3 py-2.5
          text-sm
          text-[#27301d]
          outline-none
          transition
          placeholder:text-[#4e593c]/40
          focus:border-[#7b844e]
          focus:bg-white
        "
      />
    </label>
  );
}

function GalleryIndex({
  copy,
  items,
}: {
  copy: GalleryCopy;
  items: GalleryCardItem[];
}) {
  return (
    <div className="mt-6 border-t border-[#d8caa5]/65 pt-5">
      <div className="flex max-h-[22rem] flex-col gap-3 overflow-y-auto pr-1">
        {items.length > 0 ? (
          items.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group text-sm leading-5 text-[#4e593c]/80 transition-colors hover:text-[#27301d]"
            >
              <span className="block font-medium">
                {item.title}
              </span>

              {item.year && (
                <span className="mt-0.5 block text-xs text-[#7d784f]">
                  {item.year}
                </span>
              )}
            </Link>
          ))
        ) : (
          <p className="text-sm leading-6 text-[#4e593c]/60">
            {copy.noResults}
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   GRID VIEW
========================================================= */

const GalleryGrid = memo(
  function GalleryGrid({
    items,
    copy,
  }: {
    items: GalleryCardItem[];
    copy: GalleryCopy;
  }) {
    const layoutClass =
      getLayoutClass(items.length);

    const isLargeSet = items.length > 5;

    return (
      <motion.div
        key="gallery-grid"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.28,
          ease: "easeOut",
        }}
        className={layoutClass}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={
              isLargeSet
                ? "mb-12 break-inside-avoid"
                : ""
            }
          >
            <GalleryCard
              item={item}
              viewAlbum={copy.viewAlbum}
              index={index}
              isLargeSet={isLargeSet}
            />
          </div>
        ))}
      </motion.div>
    );
  },
);

const GalleryCard = memo(
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
    const frame = getAlbumFrame(
      index,
      isLargeSet,
    );

    return (
      <Link
        to={item.link}
        aria-label={`${viewAlbum}: ${item.title}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e1d2a6]"
      >
        <article>
          <div
            className={`${frame} relative overflow-hidden bg-[#27301d]/25 shadow-[0_18px_55px_rgba(18,23,12,0.25)] transition duration-300 group-hover:-translate-y-1`}
          >
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              width={960}
              height={720}
              loading={
                index < 3 ? "eager" : "lazy"
              }
              decoding="async"
              fetchPriority={
                index < 3 ? "high" : "auto"
              }
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#27301d]/50 via-transparent to-transparent" />

            <span className="absolute bottom-3 right-3 bg-[#fffaf0]/92 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#27301d] shadow-sm">
              {viewAlbum} →
            </span>
          </div>

          <div className="mt-4 px-1">
            <h2 className="text-lg font-semibold leading-tight tracking-tight text-[#fffaf0]">
              {item.title}
            </h2>
          </div>
        </article>
      </Link>
    );
  },
);

/* =========================================================
   TIMELINE VIEW
========================================================= */

const GalleryTimeline = memo(
  function GalleryTimeline({
    items,
    copy,
  }: {
    items: GalleryCardItem[];
    copy: GalleryCopy;
  }) {
    return (
      <motion.div
        key="gallery-timeline"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.28,
          ease: "easeOut",
        }}
        className="relative pb-6 md:pb-0"
      >
        <div
          aria-hidden="true"
          className="absolute left-4 top-0 h-full w-px bg-[#e1d2a6]/45 md:left-1/2"
        />

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {items.map((item, index) => (
            <GalleryTimelineItem
              key={item.id}
              item={item}
              index={index}
              copy={copy}
            />
          ))}
        </div>
      </motion.div>
    );
  },
);

const GalleryTimelineItem = memo(
  function GalleryTimelineItem({
    item,
    index,
    copy,
  }: {
    item: GalleryCardItem;
    index: number;
    copy: GalleryCopy;
  }) {
    const isLeftSide = index % 2 === 0;

    return (
      <motion.article
        variants={timelineItemVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative grid gap-7 pl-10 md:grid-cols-2 md:gap-16 md:pl-0"
      >
        <TimelineDot />

        <div
          className={
            isLeftSide
              ? "md:col-start-1"
              : "md:col-start-2"
          }
        >
          <TimelineDate
            item={item}
            copy={copy}
            isLeftSide={isLeftSide}
          />

          <TimelineGalleryCard
            item={item}
            copy={copy}
            index={index}
          />
        </div>

        <TimelineGalleryDetails
          item={item}
          copy={copy}
          isLeftSide={isLeftSide}
        />
      </motion.article>
    );
  },
);

function TimelineDot() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2"
    >
      <div className="h-3 w-3 bg-[#d7c896] shadow-[0_0_0_6px_rgba(47,51,32,0.92)]" />
    </div>
  );
}

function TimelineDate({
  item,
  copy,
  isLeftSide,
}: {
  item: GalleryCardItem;
  copy: GalleryCopy;
  isLeftSide: boolean;
}) {
  return (
    <div
      className={
        isLeftSide
          ? "mb-4 md:text-right"
          : "mb-4 md:text-left"
      }
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7c896]">
        {copy.pastEvent}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-[#fffaf0]">
        {item.year || item.date}
      </p>
    </div>
  );
}

const TimelineGalleryCard = memo(
  function TimelineGalleryCard({
    item,
    copy,
    index,
  }: {
    item: GalleryCardItem;
    copy: GalleryCopy;
    index: number;
  }) {
    return (
      <Link
        to={item.link}
        aria-label={`${copy.viewAlbum}: ${item.title}`}
        className="group block overflow-hidden bg-[#fffaf0] text-[#27301d] shadow-[0_18px_50px_rgba(18,23,12,0.28)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1d2a6]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#efe2bf]">
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            width={960}
            height={600}
            loading={
              index < 2 ? "eager" : "lazy"
            }
            decoding="async"
            fetchPriority={
              index < 2 ? "high" : "auto"
            }
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#27301d]/35 via-transparent to-transparent" />
        </div>

        <div className="p-5 md:p-6">
          <span className="inline-flex bg-[#eee7d4] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6f7449]">
            {item.year || item.date}
          </span>

          <h2 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-[#27301d]">
            {item.title}
          </h2>

          <span className="mt-5 inline-flex text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f7449]">
            {copy.viewAlbum} →
          </span>
        </div>
      </Link>
    );
  },
);

function TimelineGalleryDetails({
  item,
  copy,
  isLeftSide,
}: {
  item: GalleryCardItem;
  copy: GalleryCopy;
  isLeftSide: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center",

        isLeftSide
          ? "md:col-start-2"
          : "md:col-start-1 md:row-start-1",
      ].join(" ")}
    >
      <div
        className={[
          "max-w-md text-[#fffaf0]",

          isLeftSide
            ? "text-left"
            : "md:ml-auto md:text-right",
        ].join(" ")}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7c896]">
          {copy.pastEvent}
        </p>

        <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
          {item.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#f3ead2]/80 md:text-[15px] md:leading-8">
          {item.desc}
        </p>

        <Link
          to={item.link}
          className="mt-6 inline-flex border-b border-[#e1d2a6]/50 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1d2a6] transition-colors hover:text-[#fffaf0]"
        >
          {copy.viewAlbum} →
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATES
========================================================= */

const EmptyGallery = memo(
  function EmptyGallery({
    copy,
  }: {
    copy: GalleryCopy;
  }) {
    return (
      <div className="mx-auto max-w-xl border border-[#fffaf0]/15 bg-[#fffaf0]/8 p-7 text-center backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-[#fffaf0]">
          {copy.emptyTitle}
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#f3ead2]/65">
          {copy.emptyBody}
        </p>
      </div>
    );
  },
);

const NoResults = memo(
  function NoResults({
    copy,
  }: {
    copy: GalleryCopy;
  }) {
    return (
      <p className="border border-[#fffaf0]/15 bg-[#fffaf0]/8 p-6 text-sm text-[#f3ead2]/70 backdrop-blur-sm">
        {copy.noResults}
      </p>
    );
  },
);

export default memo(GalleryShowcase);