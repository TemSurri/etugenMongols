import type { Lang } from "../../../context/language";
export type { Lang } from "../../../context/language";

export type Copy = {
  foundersTitle: string;

  executiveTitle: string;
  impactButton: string;
  impactIntro: string;

};

export const COPY = {
  en: {
    foundersTitle: "Founders",

    executiveTitle: "Executive Team",
    impactButton: "Our Impact",
    impactIntro: "See what we’ve accomplished with the support of our community.",

  },

  mn: {
    foundersTitle: "Үүсгэн байгуулагчид",

    executiveTitle: "Гүйцэтгэх баг",
    impactButton: "Бидний үр нөлөө",
    impactIntro: "Хамт олныхоо дэмжлэгээр бид юу бүтээснийг үзээрэй.",

  },
} as const satisfies Record<Lang, Copy>;
