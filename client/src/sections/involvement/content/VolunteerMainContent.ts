import type { Lang } from "../../../context/language";

export type VolunteerListing = {
  id: string;
  eventTitle: Record<Lang, string>;
  role: Record<Lang, string>;
  description: Record<Lang, string>;
  date: Record<Lang, string>;
  href: string;
};

export type { Lang } from "../../../context/language";

export const VOLUNTEER_LISTINGS: VolunteerListing[] = [
  {
    id: "naadam-setup",

    eventTitle: {
      en: "Naadam Community Celebration",
      mn: "Наадмын олон нийтийн баяр",
    },

    role: {
      en: "Setup and Event Support",
      mn: "Бэлтгэл болон арга хэмжээний тусламж",
    },

    description: {
      en: "Help prepare the event space, organize materials, and support general setup before guests arrive.",
      mn: "Зочид ирэхээс өмнө арга хэмжээний орчныг бэлтгэх, материал зохион байгуулах болон ерөнхий бэлтгэлд тусална.",
    },

    date: {
      en: "Summer 2026",
      mn: "2026 оны зун",
    },

    href: "/events",
  },

  {
    id: "performance-support",

    eventTitle: {
      en: "Cultural Performance",
      mn: "Соёлын тоглолт",
    },

    role: {
      en: "Performance Support",
      mn: "Тоглолтын туслах",
    },

    description: {
      en: "Assist performers and organizers with preparation, materials, and coordination around the performance area.",
      mn: "Тоглолтын хэсэгт бэлтгэл, материал болон зохицуулалтын ажилд оролцогчид, зохион байгуулагчдад тусална.",
    },

    date: {
      en: "Upcoming",
      mn: "Удахгүй",
    },

    href: "/events",
  },

  {
    id: "guest-welcome",

    eventTitle: {
      en: "Community Gathering",
      mn: "Олон нийтийн уулзалт",
    },

    role: {
      en: "Guest Welcome",
      mn: "Зочин угтах",
    },

    description: {
      en: "Welcome community members, provide directions, and help guests find activities and event areas.",
      mn: "Олон нийтийн гишүүдийг угтаж, чиглэл өгч, үйл ажиллагаа болон арга хэмжээний хэсгүүдийг олоход тусална.",
    },

    date: {
      en: "Upcoming",
      mn: "Удахгүй",
    },

    href: "/events",
  },

  {
    id: "media-support",

    eventTitle: {
      en: "Community Events",
      mn: "Олон нийтийн арга хэмжээ",
    },

    role: {
      en: "Photo and Media Support",
      mn: "Зураг болон медиа тусламж",
    },

    description: {
      en: "Help document important moments through photography, short videos, and basic event media organization.",
      mn: "Арга хэмжээний чухал мөчүүдийг зураг, богино бичлэг болон медиа материалын зохион байгуулалтаар баримтжуулахад тусална.",
    },

    date: {
      en: "Ongoing",
      mn: "Тогтмол",
    },

    href: "/events",
  },

  {
    id: "decoration-support",

    eventTitle: {
      en: "Cultural Events",
      mn: "Соёлын арга хэмжээ",
    },

    role: {
      en: "Decoration and Display Setup",
      mn: "Чимэглэл болон үзүүлэнгийн бэлтгэл",
    },

    description: {
      en: "Help arrange decorations, cultural displays, signs, and presentation areas before an event begins.",
      mn: "Арга хэмжээ эхлэхээс өмнө чимэглэл, соёлын үзүүлэн, тэмдэглэгээ болон танилцуулгын хэсгүүдийг бэлтгэнэ.",
    },

    date: {
      en: "As needed",
      mn: "Шаардлагатай үед",
    },

    href: "/events",
  },

  {
    id: "youth-support",

    eventTitle: {
      en: "Youth Activities",
      mn: "Хүүхэд залуусын үйл ажиллагаа",
    },

    role: {
      en: "Activity Support",
      mn: "Үйл ажиллагааны туслах",
    },

    description: {
      en: "Support organizers with materials, activity areas, and general coordination during youth programs.",
      mn: "Хүүхэд залуусын хөтөлбөрийн үеэр материал, үйл ажиллагааны хэсэг болон ерөнхий зохицуулалтад тусална.",
    },

    date: {
      en: "Upcoming",
      mn: "Удахгүй",
    },

    href: "/events",
  },

  {
    id: "cleanup-support",

    eventTitle: {
      en: "Community Events",
      mn: "Олон нийтийн арга хэмжээ",
    },

    role: {
      en: "Event Cleanup",
      mn: "Арга хэмжээний цэвэрлэгээ",
    },

    description: {
      en: "Help organize materials and restore the event space after activities have finished.",
      mn: "Үйл ажиллагаа дууссаны дараа материалуудыг цэгцэлж, арга хэмжээний орчныг хэвийн байдалд оруулахад тусална.",
    },

    date: {
      en: "As needed",
      mn: "Шаардлагатай үед",
    },

    href: "/events",
  },

  {
    id: "general-support",

    eventTitle: {
      en: "Etugen Mongols",
      mn: "Этүгэн Монголчууд",
    },

    role: {
      en: "General Volunteer Support",
      mn: "Ерөнхий сайн дурын тусламж",
    },

    description: {
      en: "Help wherever additional support is needed before, during, or after community activities.",
      mn: "Олон нийтийн үйл ажиллагааны өмнө, үеэр эсвэл дараа шаардлагатай бусад ажилд тусална.",
    },

    date: {
      en: "Ongoing",
      mn: "Тогтмол",
    },

    href: "/events",
  },
];

export const COPY = {
  en: {
    heading: "Get involved",

    body: "Volunteers play an important role in bringing our community events and cultural activities to life. Whether you can offer a few hours or contribute a particular skill, your time helps us create welcoming, organized, and meaningful experiences for the community.",

    opportunitiesButton: "View opportunities",

    galleryText:
      "Curious what volunteering looks like? Visit our gallery to see some of the preparation, practice, and behind-the-scenes work that goes into our events.",

    galleryButton: "View gallery",

    listingsTitle: "Current opportunities",

    listingsHint: "Explore available volunteer roles",

    noListings:
      "There are no volunteer opportunities available right now. New roles will be posted here when support is needed.",

    viewEvent: "View event",
  },

  mn: {
    heading: "Бидэнтэй нэгдээрэй",

    body: "Сайн дурын ажилтнууд манай олон нийтийн арга хэмжээ болон соёлын үйл ажиллагааг хэрэгжүүлэхэд чухал үүрэг гүйцэтгэдэг. Та хэдхэн цагийн турш туслах эсвэл өөрийн тодорхой ур чадвараар хувь нэмэр оруулснаар олон нийтэд зориулсан тав тухтай, зохион байгуулалттай, утга учиртай үйл ажиллагааг бий болгоход тусална.",

    opportunitiesButton: "Боломжуудыг үзэх",

    galleryText:
      "Сайн дурын ажил ямар байдгийг сонирхож байна уу? Манай галерейгаас арга хэмжээний бэлтгэл, дадлага болон тайзны ард өрнөдөг ажлуудыг үзээрэй.",

    galleryButton: "Галерей үзэх",

    listingsTitle: "Одоогийн боломжууд",

    listingsHint: "Сайн дурын ажлын боломжуудыг үзэх",

    noListings:
      "Одоогоор сайн дурын ажлын боломж байхгүй байна. Тусламж хэрэгтэй үед шинэ боломжуудыг энд нийтэлнэ.",

    viewEvent: "Арга хэмжээг үзэх",
  },
} as const;
