export type LangText = {
  en: string;
  mn: string;
};

export type GalleryEventStatus = "upcoming" | "past";

export type EventImage = {
  highRes: string;
  lowRes: string;
  alt: LangText;
};

export type EventVideo = {
  title: LangText;
  url: string;
};

export type PerformanceItem = {
  id: string;
  title: LangText;
  description: LangText;
  images: EventImage[];
  videos?: EventVideo[];
};

export type GallerySection = {
  title: LangText;
  description: LangText;
  images: EventImage[];
  videos?: EventVideo[];
};

export type GalleryEventAction =
  | {
      type: "payment";
      enabled: boolean;
      label: LangText;
      price?: number;
    }
  | {
      type: "donation";
      enabled: boolean;
      label: LangText;
    }
  | {
      type: "registration";
      enabled: boolean;
      label: LangText;
    };

export type GalleryEventContact = {
  email?: string;
  phone?: string[];
};

export type GalleryEvent = {
  id: string;
  status: GalleryEventStatus;
  title: LangText;
  description: LangText;
  date: string;
  location?: string;
  coverImage: EventImage;
  upcoming?: {
    time: string;
    actions: GalleryEventAction[];
    contact?: GalleryEventContact;
  };
  gallery?: {
    montageVideo?: EventVideo;
    thankYouVideo?: EventVideo;
    sections: {
      general: GallerySection;
      behindTheScenes?: GallerySection;
      performances?: {
        title: LangText;
        description: LangText;
        items: PerformanceItem[];
      };
    };
  };
};
