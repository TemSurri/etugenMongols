export type Lang = "en" | "mn";
export type ViewMode = "grid" | "timeline";

export type GalleryShowcaseProps = {
  lang?: Lang;
};

export type GalleryCardItem = {
  id: string;
  title: string;
  desc: string;
  date: string;
  year: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  searchText: string;
};

export type GalleryCopy = {
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
  resultsLabel: string;
};
