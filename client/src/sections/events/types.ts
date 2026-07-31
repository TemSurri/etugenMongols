export type Lang = "en" | "mn";

export type EventsMainProps = {
  lang: Lang;
};

export type UpcomingEventItem = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  time?: string;
  location?: string;
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
