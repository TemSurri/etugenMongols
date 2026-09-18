export type Lang = "en" | "mn";

export type { ApiEvent } from "../../contracts/eventContracts";

export type EventsMainProps = {
  lang: Lang;
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
