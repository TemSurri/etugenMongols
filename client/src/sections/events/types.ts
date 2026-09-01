export type Lang = "en" | "mn";

export type EventsMainProps = {
  lang: Lang;
};


/*
 * Exact shape returned from Spring Boot GET /events.
 */
export type ApiEvent = {
  id: string;
  slug: string;

  titleEn: string;
  titleMn: string;

  descriptionEn: string;
  descriptionMn: string;

  startsAt: string;
  endsAt: string | null;

  location: string;

  published: boolean;

  registerable: boolean;
  registrationCost: number | null;

  coverImage: string | null;
  coverImageAltEn: string | null;
  coverImageAltMn: string | null;

  contactEmail: string | null;
  contactPhone: string | null;

  createdAt: string;
};


/*
 * Shape actually consumed by the frontend card.
 */
export type UpcomingEventItem = {
  id: string;
  slug: string;

  title: string;

  imageSrc: string;
  imageAlt: string;

  date: string;
  time?: string;

  location?: string;

  registerable: boolean;
  registrationCost: number | null;

  href: string;
};


export type SlideshowImage = {
  id: string;
  src: string;
  alt: string;
};


export type EventsCopy = {
  eyebrow: string;
  title: string;

  viewEvent: string;
  noEvents: string;

  loadingEvents: string;
  eventsError: string;

  freeRegistration: string;
  registrationFrom: string;

  slideshowEyebrow: string;
  slideshowTitle: string;
  slideshowButton: string;
  slideshowLabel: string;
  showPhoto: string;

  yearlyEyebrow: string;
  yearlyTitle: string;
  yearlyBody: string;

  naadamTitle: string;
  naadamBefore: string;
  naadamLink: string;
  naadamAfter: string;

  winterTitle: string;
  winterBody: string;

  performancesTitle: string;
  performancesBody: string;

  involvedTitle: string;
  involvedBody: string;

  volunteerButton: string;
  donateButton: string;
};