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
      behindTheScenes?: GallerySection;
      performances?: {
        title: LangText;
        description: LangText;
        items: PerformanceItem[];
      };
    };
  };
};

const text = (en: string, mn: string): LangText => ({ en, mn });

const img = (
  highRes: string,
  lowRes: string,
  alt: LangText
): EventImage => ({
  highRes,
  lowRes,
  alt,
});

const imageRange = (
  folder: string,
  count: number,
  alt: LangText
): EventImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;

    return img(
      `/gallery/${folder}/${n}.webp`,
      `/gallery/${folder}/${n}-low.webp`,
      alt
    );
  });

export const events: Event[] = [
  {
    id: "naadam2026",
    status: "upcoming",

    title: text("Naadam 2026", "Наадам 2026"),

    description: text(
      "An upcoming Mongolian cultural celebration featuring performances, food, community gathering, and traditional activities.",
      "Уламжлалт тоглолт, хоол, олон нийтийн уулзалт, соёлын үйл ажиллагаа бүхий удахгүй болох Монгол соёлын баяр."
    ),

    date: "September 20, 2026",
    location: "Calgary, Alberta",

    coverImage: img(
      "/upcoming_event_assets/naadam2026-cover.png",
      "/upcoming_event_assets/naadam2026-cover.png",
      text("Naadam 2026 event cover", "Наадам 2026 арга хэмжээний зураг")
    ),

    upcoming: {
      time: "6:30 PM - 9:30 PM",

      actions: [
        {
          type: "payment",
          enabled: true,
          label: text("Buy Ticket", "Тасалбар авах"),
          price: 20,
        },
        {
          type: "registration",
          enabled: true,
          label: text("Register", "Бүртгүүлэх"),
        },
        {
          type: "donation",
          enabled: true,
          label: text("Donate", "Хандив өгөх"),
        },
      ],

      contact: {
        email: "calgarymongolians@gmail.com",
        phone: ["587-435-4494"],
      },
    },
  },

  {
    id: "winter-party-2026",
    status: "past",

    title: text("Winter Party 2026", "Өвлийн баяр 2026"),

    description: text(
      "A winter community celebration with music, food, performances, and shared moments.",
      "Дуу хөгжим, хоол, тоглолт, хамтын дурсамжтай өвлийн баяр."
    ),

    date: "January 2026",
    location: "Calgary, Alberta",

    coverImage: img(
      "/gallery/winter-party-2026/cover.webp",
      "/gallery/winter-party-2026/cover-low.webp",
      text("Winter Party 2026 cover image", "Өвлийн баяр 2026 нүүр зураг")
    ),

    gallery: {
      sections: {
        general: {
          title: text("Community Moments", "Хамтын мөчүүд"),
          description: text(
            "Families, food, conversations, and shared winter celebration moments.",
            "Гэр бүл, хоол, яриа хөөрөө, өвлийн баярын хамтын мөчүүд."
          ),
          images: imageRange(
            "winter-party-2026/general",
            12,
            text("Winter Party 2026 community photo", "Өвлийн баяр 2026 хамт олны зураг")
          ),
        },

        performances: {
          title: text("Performances", "Тоглолтууд"),
          description: text(
            "Music and cultural performances from the winter celebration.",
            "Өвлийн баярын дуу хөгжим, соёлын тоглолтууд."
          ),
          items: [
            {
              id: "dance-performance",
              title: text("Dance Performance", "Бүжгийн тоглолт"),
              description: text(
                "A cultural dance performance from the event program.",
                "Арга хэмжээний хөтөлбөрийн соёлын бүжгийн тоглолт."
              ),
              images: imageRange(
                "winter-party-2026/performances/dance-performance",
                4,
                text("Winter Party 2026 dance performance", "Өвлийн баяр 2026 бүжгийн тоглолт")
              ),
              videos: [],
            },
          ],
        },
      },
    },
  },

  {
    id: "winter-party-2025",
    status: "past",

    title: text("Winter Party 2025", "Өвлийн баяр 2025"),

    description: text(
      "A warm winter gathering that brought the Mongolian community together through food, music, and celebration.",
      "Монголчуудыг хоол, дуу хөгжим, баярын уур амьсгалаар нэгтгэсэн өвлийн уулзалт."
    ),

    date: "January 2025",
    location: "Calgary, Alberta",

    coverImage: img(
      "/gallery/winter-party-2025/cover.webp",
      "/gallery/winter-party-2025/cover-low.webp",
      text("Winter Party 2025 cover image", "Өвлийн баяр 2025 нүүр зураг")
    ),

    gallery: {
      sections: {
        general: {
          title: text("General Moments", "Ерөнхий мөчүүд"),
          description: text(
            "Photos from the winter celebration, including families, food, and community moments.",
            "Өвлийн баярын гэр бүл, хоол, хамтын мөчүүдийн зургууд."
          ),
          images: imageRange(
            "winter-party-2025/general",
            10,
            text("Winter Party 2025 community photo", "Өвлийн баяр 2025 хамт олны зураг")
          ),
        },

        behindTheScenes: {
          title: text("Behind the Scenes", "Ар талын мөчүүд"),
          description: text(
            "Preparation, setup, and volunteer moments from the event.",
            "Бэлтгэл ажил, зохион байгуулалт, сайн дурынхны мөчүүд."
          ),
          images: imageRange(
            "winter-party-2025/behind-the-scenes",
            4,
            text("Winter Party 2025 behind the scenes photo", "Өвлийн баяр 2025 ар талын зураг")
          ),
        },
      },
    },
  },

  {
    id: "childrens-christmas-party-2024",
    status: "past",

    title: text("Children’s Christmas Party 2024", "Хүүхдийн шинэ жилийн баяр 2024"),

    description: text(
      "A children-focused Christmas celebration with games, performances, gifts, and family activities.",
      "Тоглоом, тоглолт, бэлэг, гэр бүлийн үйл ажиллагаа бүхий хүүхдийн шинэ жилийн баяр."
    ),

    date: "December 2024",
    location: "Calgary, Alberta",

    coverImage: img(
      "/gallery/childrens-christmas-party-2024/cover.webp",
      "/gallery/childrens-christmas-party-2024/cover-low.webp",
      text("Children’s Christmas Party 2024 cover image", "Хүүхдийн шинэ жилийн баяр 2024 нүүр зураг")
    ),

    gallery: {
      sections: {
        general: {
          title: text("Christmas Moments", "Шинэ жилийн мөчүүд"),
          description: text(
            "Children, families, gifts, games, and celebration moments from the Christmas party.",
            "Хүүхдүүд, гэр бүлүүд, бэлэг, тоглоом, шинэ жилийн баярын мөчүүд."
          ),
          images: imageRange(
            "childrens-christmas-party-2024/general",
            12,
            text("Children’s Christmas Party 2024 photo", "Хүүхдийн шинэ жилийн баяр 2024 зураг")
          ),
        },

        performances: {
          title: text("Children’s Performances", "Хүүхдийн тоглолтууд"),
          description: text(
            "Performances and program moments from the children’s Christmas celebration.",
            "Хүүхдийн шинэ жилийн баярын тоглолт болон хөтөлбөрийн мөчүүд."
          ),
          items: [
            {
              id: "children-performance",
              title: text("Children’s Performance", "Хүүхдийн тоглолт"),
              description: text(
                "A children’s performance from the Christmas party program.",
                "Хүүхдийн шинэ жилийн баярын хөтөлбөрийн тоглолт."
              ),
              images: imageRange(
                "childrens-christmas-party-2024/performances/children-performance",
                4,
                text("Children’s Christmas Party 2024 performance", "Хүүхдийн шинэ жилийн баяр 2024 тоглолт")
              ),
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

    title: text("Naadam Celebration 2022", "Наадам 2022"),

    description: text(
      "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
      "Бөх, сур харваа, дуу хөгжим, хоол, соёлын үзүүлбэрүүд багтсан уламжлалт Монгол наадмын баяр."
    ),

    date: "July 11, 2022",
    location: "Calgary, Alberta",

    coverImage: img(
      "/gallery/naadam2022/cover.webp",
      "/gallery/naadam2022/cover-low.webp",
      text("Naadam Celebration 2022 cover image", "Наадам 2022 арга хэмжээний нүүр зураг")
    ),

    gallery: {
      montageVideo: {
        title: text("Naadam 2022 Montage", "Наадам 2022 эвлүүлэг"),
        url: "",
      },

      thankYouVideo: {
        title: text("Thank You Video", "Талархлын бичлэг"),
        url: "",
      },

      sections: {
        general: {
          title: text("General Moments", "Ерөнхий мөчүүд"),
          description: text(
            "Community photos, food, families, and shared moments from the event.",
            "Хамт олны зураг, хоол, гэр бүлүүд, арга хэмжээний дурсамжит мөчүүд."
          ),
          images: imageRange(
            "naadam2022/general",
            14,
            text("Naadam 2022 community photo", "Наадам 2022 хамт олны зураг")
          ),
        },

        behindTheScenes: {
          title: text("Behind the Scenes", "Ар талын мөчүүд"),
          description: text(
            "Preparation, setup, volunteers, and moments behind the event.",
            "Бэлтгэл ажил, зохион байгуулалт, сайн дурынхан болон арга хэмжээний ар талын мөчүүд."
          ),
          images: imageRange(
            "naadam2022/behind-the-scenes",
            5,
            text("Naadam 2022 behind the scenes photo", "Наадам 2022 ар талын зураг")
          ),
        },

        performances: {
          title: text("Performances", "Тоглолтууд"),
          description: text(
            "Individual performances from the Naadam celebration.",
            "Наадмын баярын тус бүрийн тоглолтууд."
          ),
          items: [
            {
              id: "morin-khuur",
              title: text("Morin Khuur Performance", "Морин хуурын тоглолт"),
              description: text(
                "A traditional horsehead fiddle performance during the celebration.",
                "Баярын үеэр болсон уламжлалт морин хуурын тоглолт."
              ),
              images: imageRange(
                "naadam2022/performances/morin-khuur",
                3,
                text("Morin khuur performance at Naadam 2022", "Наадам 2022 морин хуурын тоглолт")
              ),
              videos: [],
            },
            {
              id: "dance-performance",
              title: text("Dance Performance", "Бүжгийн тоглолт"),
              description: text(
                "A cultural dance performance from the event program.",
                "Арга хэмжээний хөтөлбөрт багтсан соёлын бүжгийн тоглолт."
              ),
              images: imageRange(
                "naadam2022/performances/dance-performance",
                4,
                text("Dance performance at Naadam 2022", "Наадам 2022 бүжгийн тоглолт")
              ),
              videos: [],
            },
            {
              id: "wrestling",
              title: text("Wrestling", "Бөх"),
              description: text(
                "Traditional wrestling moments from the Naadam celebration.",
                "Наадмын баярын үндэсний бөхийн мөчүүд."
              ),
              images: imageRange(
                "naadam2022/performances/wrestling",
                5,
                text("Wrestling at Naadam 2022", "Наадам 2022 бөхийн барилдаан")
              ),
              videos: [],
            },
            {
              id: "archery",
              title: text("Archery", "Сур харваа"),
              description: text(
                "Archery activities from the Naadam celebration.",
                "Наадмын баярын сур харвааны үйл ажиллагаа."
              ),
              images: imageRange(
                "naadam2022/performances/archery",
                5,
                text("Archery at Naadam 2022", "Наадам 2022 сур харваа")
              ),
              videos: [],
            },
          ],
        },
      },
    },
  },
];