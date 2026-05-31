export type LangText = {
  en: string;
  mn: string;
};

export type EventStatus = "upcoming" | "past";

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

export type EventAction =
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

export type EventContact = {
  email?: string;
  phone?: string[];
};

export type Event = {
  id: string;
  status: EventStatus;

  title: LangText;
  description: LangText;
  date: string;
  location?: string;

  coverImage: EventImage;

  upcoming?: {
    time: string;
    actions: EventAction[];
    contact?: EventContact;
  };

  gallery?: {
    montageVideo?: EventVideo;
    thankYouVideo?: EventVideo;

    sections: {
      general: GallerySection;
      behindTheScenes: GallerySection;
      performances: {
        title: LangText;
        description: LangText;
        items: PerformanceItem[];
      };
    };
  };
};

export const events: Event[] = [
  {
    id: "naadam2026",
    status: "upcoming",

    title: {
      en: "Naadam 2026",
      mn: "Наадам 2026",
    },

    description: {
      en: "An upcoming Mongolian cultural celebration featuring performances, food, community gathering, and traditional activities.",
      mn: "Уламжлалт тоглолт, хоол, олон нийтийн уулзалт, соёлын үйл ажиллагаа бүхий удахгүй болох Монгол соёлын баяр.",
    },

    date: "September 20, 2026",
    location: "Calgary, Alberta",

    coverImage: {
      highRes: "/upcoming_event_assets/winterparty.png",
      lowRes: "/upcoming_event_assets/winterparty.png",
      alt: {
        en: "Naadam 2026 event cover",
        mn: "Наадам 2026 арга хэмжээний зураг",
      },
    },

    upcoming: {
      time: "6:30 PM - 9:30 PM",

      actions: [
        {
          type: "payment",
          enabled: true,
          label: {
            en: "Buy Ticket",
            mn: "Тасалбар авах",
          },
          price: 20,
        },
        {
          type: "registration",
          enabled: true,
          label: {
            en: "Register",
            mn: "Бүртгүүлэх",
          },
        },
        {
          type: "donation",
          enabled: true,
          label: {
            en: "Donate",
            mn: "Хандив өгөх",
          },
        },
      ],

      contact: {
        email: "calgarymongolians@gmail.com",
        phone: ["587-435-4494"],
      },
    },
  },

 {
  id: "naadam2022",
  status: "past",

  title: {
    en: "Naadam Celebration 2022",
    mn: "Наадам 2022",
  },

  description: {
    en: "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    mn: "Бөх, сур харваа, дуу хөгжим, хоол, соёлын үзүүлбэрүүд багтсан уламжлалт Монгол наадмын баяр.",
  },

  date: "July 11, 2022",
  location: "Calgary, Alberta",

  coverImage: {
    highRes: "/gallery/naadam2022/cover.webp",
    lowRes: "/gallery/naadam2022/cover-low.webp",
    alt: {
      en: "Naadam Celebration 2022 cover image",
      mn: "Наадам 2022 арга хэмжээний нүүр зураг",
    },
  },

  gallery: {
    montageVideo: {
      title: {
        en: "Naadam 2022 Montage",
        mn: "Наадам 2022 эвлүүлэг",
      },
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    thankYouVideo: {
      title: {
        en: "Thank You Video",
        mn: "Талархлын бичлэг",
      },
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    sections: {
      general: {
        title: {
          en: "General Moments",
          mn: "Ерөнхий мөчүүд",
        },
        description: {
          en: "Community photos, food, families, and shared moments from the event.",
          mn: "Хамт олны зураг, хоол, гэр бүлүүд, арга хэмжээний дурсамжит мөчүүд.",
        },
        images: [
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/2.png",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/3.png",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
        ],
      },

      behindTheScenes: {
        title: {
          en: "Behind the Scenes",
          mn: "Ар талын мөчүүд",
        },
        description: {
          en: "Preparation, setup, volunteers, and moments behind the event.",
          mn: "Бэлтгэл ажил, зохион байгуулалт, сайн дурынхан болон арга хэмжээний ар талын мөчүүд.",
        },
        images: [
          {
            highRes: "/gallery/naadam2022/behind-the-scenes/1.webp",
            lowRes: "/gallery/naadam2022/behind-the-scenes/1-low.webp",
            alt: {
              en: "Naadam 2022 behind the scenes photo",
              mn: "Наадам 2022 ар талын зураг",
            },
          },
        ],
      },

      performances: {
        title: {
          en: "Performances",
          mn: "Тоглолтууд",
        },
        description: {
          en: "Individual performances from the Naadam celebration.",
          mn: "Наадмын баярын тус бүрийн тоглолтууд.",
        },
        items: [
          {
            id: "morin-khuur",
            title: {
              en: "Morin Khuur Performance",
              mn: "Морин хуурын тоглолт",
            },
            description: {
              en: "A traditional horsehead fiddle performance during the celebration.",
              mn: "Баярын үеэр болсон уламжлалт морин хуурын тоглолт.",
            },
            images: [
              {
                highRes: "/gallery/naadam2022/performances/morin-khuur/1.webp",
                lowRes: "/gallery/naadam2022/performances/morin-khuur/1-low.webp",
                alt: {
                  en: "Morin khuur performance at Naadam 2022",
                  mn: "Наадам 2022 морин хуурын тоглолт",
                },
              },
            ],
            videos: [
              {
                title: {
                  en: "Morin Khuur Video",
                  mn: "Морин хуурын бичлэг",
                },
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              },
            ],
          },
          {
            id: "dance-performance",
            title: {
              en: "Dance Performance",
              mn: "Бүжгийн тоглолт",
            },
            description: {
              en: "A cultural dance performance from the event program.",
              mn: "Арга хэмжээний хөтөлбөрт багтсан соёлын бүжгийн тоглолт.",
            },
            images: [],
            videos: [],
          },
        ],
      },
      
    },
  },
},
 {
  id: "naadam2022",
  status: "past",

  title: {
    en: "Naadam Celebration 2022",
    mn: "Наадам 2022",
  },

  description: {
    en: "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    mn: "Бөх, сур харваа, дуу хөгжим, хоол, соёлын үзүүлбэрүүд багтсан уламжлалт Монгол наадмын баяр.",
  },

  date: "July 11, 2022",
  location: "Calgary, Alberta",

  coverImage: {
    highRes: "/gallery/naadam2022/cover.webp",
    lowRes: "/gallery/naadam2022/cover-low.webp",
    alt: {
      en: "Naadam Celebration 2022 cover image",
      mn: "Наадам 2022 арга хэмжээний нүүр зураг",
    },
  },

  gallery: {
    montageVideo: {
      title: {
        en: "Naadam 2022 Montage",
        mn: "Наадам 2022 эвлүүлэг",
      },
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    thankYouVideo: {
      title: {
        en: "Thank You Video",
        mn: "Талархлын бичлэг",
      },
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },

    sections: {
      general: {
        title: {
          en: "General Moments",
          mn: "Ерөнхий мөчүүд",
        },
        description: {
          en: "Community photos, food, families, and shared moments from the event.",
          mn: "Хамт олны зураг, хоол, гэр бүлүүд, арга хэмжээний дурсамжит мөчүүд.",
        },
        images: [
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/2.png",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/3.png",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
          {
            highRes: "/gallery/naadam2022/general/1.webp",
            lowRes: "/gallery/naadam2022/general/1-low.webp",
            alt: {
              en: "Naadam 2022 community photo",
              mn: "Наадам 2022 хамт олны зураг",
            },
          },
        ],
      },

      behindTheScenes: {
        title: {
          en: "Behind the Scenes",
          mn: "Ар талын мөчүүд",
        },
        description: {
          en: "Preparation, setup, volunteers, and moments behind the event.",
          mn: "Бэлтгэл ажил, зохион байгуулалт, сайн дурынхан болон арга хэмжээний ар талын мөчүүд.",
        },
        images: [
          {
            highRes: "/gallery/naadam2022/behind-the-scenes/1.webp",
            lowRes: "/gallery/naadam2022/behind-the-scenes/1-low.webp",
            alt: {
              en: "Naadam 2022 behind the scenes photo",
              mn: "Наадам 2022 ар талын зураг",
            },
          },
        ],
      },

      performances: {
        title: {
          en: "Performances",
          mn: "Тоглолтууд",
        },
        description: {
          en: "Individual performances from the Naadam celebration.",
          mn: "Наадмын баярын тус бүрийн тоглолтууд.",
        },
        items: [
          {
            id: "morin-khuur",
            title: {
              en: "Morin Khuur Performance",
              mn: "Морин хуурын тоглолт",
            },
            description: {
              en: "A traditional horsehead fiddle performance during the celebration.",
              mn: "Баярын үеэр болсон уламжлалт морин хуурын тоглолт.",
            },
            images: [
              {
                highRes: "/gallery/naadam2022/performances/morin-khuur/1.webp",
                lowRes: "/gallery/naadam2022/performances/morin-khuur/1-low.webp",
                alt: {
                  en: "Morin khuur performance at Naadam 2022",
                  mn: "Наадам 2022 морин хуурын тоглолт",
                },
              },
            ],
            videos: [
              {
                title: {
                  en: "Morin Khuur Video",
                  mn: "Морин хуурын бичлэг",
                },
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              },
            ],
          },
          {
            id: "dance-performance",
            title: {
              en: "Dance Performance",
              mn: "Бүжгийн тоглолт",
            },
            description: {
              en: "A cultural dance performance from the event program.",
              mn: "Арга хэмжээний хөтөлбөрт багтсан соёлын бүжгийн тоглолт.",
            },
            images: [],
            videos: [],
          },
        ],
      },
      
    },
  },
}




];