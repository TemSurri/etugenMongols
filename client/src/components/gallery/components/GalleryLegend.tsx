import { memo, useId } from "react";
import { Link } from "react-router-dom";
import type { GalleryCardItem, GalleryCopy } from "../types";

type Props = {
  copy: GalleryCopy;
  query: string;
  setQuery: (value: string) => void;
  items: GalleryCardItem[];
};

export const GalleryLegend = memo(function GalleryLegend({ copy, query, setQuery, items }: Props) {
  const searchId = useId();

  return (
    <aside aria-label={copy.index} className="w-full bg-[#fffaf0] p-5 text-[#27301d] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8a762f]">{copy.index}</p>
      <form role="search" className="mt-5" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={searchId} className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4e593c]/70">
          {copy.search}
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          autoComplete="off"
          className="mt-2 w-full border border-[#d8caa5] bg-white/70 px-3 py-2.5 text-sm text-[#27301d] outline-none transition placeholder:text-[#4e593c]/40 focus:border-[#7b844e] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#7b844e]/35"
        />
      </form>
      <div className="mt-6 border-t border-[#d8caa5]/65 pt-5">
        <div className="flex max-h-[22rem] flex-col gap-3 overflow-y-auto overscroll-contain pr-1">
          {items.length > 0 ? items.map((item) => (
            <Link key={item.id} to={item.link} className="group text-sm leading-5 text-[#4e593c]/80 transition-colors hover:text-[#27301d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b844e]/45">
              <span className="block font-medium">{item.title}</span>
              {item.year && <span className="mt-0.5 block text-xs text-[#7d784f]">{item.year}</span>}
            </Link>
          )) : <p className="text-sm leading-6 text-[#4e593c]/60">{copy.noResults}</p>}
        </div>
      </div>
    </aside>
  );
});
