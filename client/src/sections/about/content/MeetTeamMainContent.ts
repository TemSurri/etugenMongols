import type { Lang } from "../../../context/language";
import { aboutMedia } from "../media";
export type { Lang } from "../../../context/language";

export type TeamMember = {
  id: string;
  name: string;
  role: LocalizedText;
  bio: LocalizedText;
  image: string;
  imagePosition?: string;
};

export type CommunityImage = {
  id: string;
  src: string;
  alt: LocalizedText;
  imagePosition?: string;
};

export type Copy = {
  eyebrow: string;

  boardTitle: string;
  boardBody: string;

  creativeTitle: string;
  creativeBody: string;

  appreciationEyebrow: string;
  contributorsTitle: string;
  contributorsBody: string;

  communityTitle: string;
  communityBody: string;

  impactTitle: string;
  impactBody: string;
  impactButton: string;
};

export type LocalizedText = Record<Lang, string>;

export const COPY = {
  en: {
    eyebrow: "Our Community",

    boardTitle: "Board Members",
    boardBody:
      "Our board provides leadership, supports our programs, and guides the long-term growth of Etugen Mongols.",

    creativeTitle: "Etugen Creative Team",
    creativeBody:
      "Our creative team brings our work to life through design, photography, media, storytelling, performance, and culture.",

    appreciationEyebrow: "With Deep Appreciation",
    contributorsTitle: "Major Contributors",
    contributorsBody:
      "We recognize the people whose time, knowledge, care, and dedication have made a lasting contribution to our work and community.",

    communityTitle: "The Wider Community",
    communityBody:
      "Etugen Mongols is built by everyone who attends, volunteers, performs, organizes, supports, and celebrates with us.",

    impactTitle: "See the impact we have made together",
    impactBody:
      "Explore the programs, events, initiatives, and shared experiences made possible by our community.",

    impactButton: "See Our Impact",
  },

  mn: {
    eyebrow: "Манай хамт олон",

    boardTitle: "Удирдах зөвлөлийн гишүүд",
    boardBody:
      "Манай удирдах зөвлөл манлайлал үзүүлж, хөтөлбөрүүдийг дэмжин, Этүгэн Монголчуудын урт хугацааны хөгжлийг чиглүүлдэг.",

    creativeTitle: "Этүгэн бүтээлч баг",
    creativeBody:
      "Манай бүтээлч баг дизайн, гэрэл зураг, медиа, түүх өгүүлэмж, тоглолт болон соёлоор дамжуулан бидний ажлыг амьдруулдаг.",

    appreciationEyebrow: "Гүн талархал илэрхийлье",
    contributorsTitle: "Онцгой хувь нэмэр оруулагчид",
    contributorsBody:
      "Манай ажил болон хамт олонд үнэтэй цаг, мэдлэг, сэтгэл, тууштай хөдөлмөрөө зориулсан хүмүүстээ талархал илэрхийлье.",

    communityTitle: "Өргөн хамт олон",
    communityBody:
      "Этүгэн Монголчууд нь оролцож, сайн дураар ажиллаж, тоглож, зохион байгуулж, дэмжиж, хамтдаа баярладаг хүн бүрийн хүчээр бүрддэг.",

    impactTitle: "Хамтдаа бий болгосон үр нөлөөгөө харна уу",
    impactBody:
      "Манай хамт олны дэмжлэгээр хэрэгжсэн хөтөлбөр, арга хэмжээ, санаачилга болон дурсамжуудыг үзээрэй.",

    impactButton: "Үр нөлөөг харах",
  },
} as const satisfies Record<Lang, Copy>;

export const MAJOR_CONTRIBUTORS: TeamMember[] = [
  {
    id: "contributor-1",
    name: "Contributor One",
    role: {
      en: "Community Leadership",
      mn: "Хамт олны манлайлал",
    },
    bio: {
      en: "Has provided meaningful leadership, knowledge, and long-term support to our organization.",
      mn: "Байгууллагад үнэтэй манлайлал, мэдлэг болон урт хугацааны дэмжлэг үзүүлсэн.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "contributor-2",
    name: "Contributor Two",
    role: {
      en: "Cultural Contribution",
      mn: "Соёлын хувь нэмэр",
    },
    bio: {
      en: "Has helped preserve and celebrate Mongolian culture through performance and community participation.",
      mn: "Тоглолт болон олон нийтийн оролцоогоор Монгол соёлыг хадгалж, түгээн дэлгэрүүлэхэд тусалсан.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "contributor-3",
    name: "Contributor Three",
    role: {
      en: "Volunteer Coordination",
      mn: "Сайн дурынхны зохицуулалт",
    },
    bio: {
      en: "Has contributed substantial time and care to volunteer coordination and event preparation.",
      mn: "Сайн дурынхны зохицуулалт болон арга хэмжээний бэлтгэлд ихээхэн цаг, сэтгэлээ зориулсан.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "contributor-4",
    name: "Contributor Four",
    role: {
      en: "Community Support",
      mn: "Хамт олны дэмжлэг",
    },
    bio: {
      en: "Has consistently supported the people, programs, events, and cultural work of Etugen Mongols.",
      mn: "Этүгэн Монголчуудын хүмүүс, хөтөлбөр, арга хэмжээ болон соёлын ажлыг тогтмол дэмжсэн.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
];

export const COMMUNITY_IMAGES: CommunityImage[] = [
  {
    id: "community-1",
    src: aboutMedia.teamPlaceholder,
    alt: {
      en: "Etugen Mongols community gathering",
      mn: "Этүгэн Монголчуудын хамтын цугларалт",
    },
    imagePosition: "center",
  },
  {
    id: "community-2",
    src: aboutMedia.teamPlaceholder,
    alt: {
      en: "Families attending a community event",
      mn: "Олон нийтийн арга хэмжээнд оролцож буй гэр бүлүүд",
    },
    imagePosition: "center",
  },
  {
    id: "community-3",
    src: aboutMedia.teamPlaceholder,
    alt: {
      en: "Etugen Mongols community group photo",
      mn: "Этүгэн Монголчуудын хамтын зураг",
    },
    imagePosition: "center",
  },
];
