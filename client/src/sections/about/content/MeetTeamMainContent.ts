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

export const BOARD_MEMBERS: TeamMember[] = [
  {
    id: "board-1",
    name: "Member One",
    role: {
      en: "Board Chair",
      mn: "Удирдах зөвлөлийн дарга",
    },
    bio: {
      en: "Provides leadership and helps guide the long-term direction, priorities, and community work of Etugen Mongols.",
      mn: "Этүгэн Монголчуудын урт хугацааны чиглэл, зорилт болон олон нийтийн ажлыг удирдан чиглүүлдэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "board-2",
    name: "Member Two",
    role: {
      en: "Vice Chair",
      mn: "Удирдах зөвлөлийн дэд дарга",
    },
    bio: {
      en: "Supports planning, coordination, partnerships, and the continued growth of Etugen Mongols.",
      mn: "Төлөвлөлт, зохицуулалт, хамтын ажиллагаа болон байгууллагын хөгжлийг дэмждэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "board-3",
    name: "Member Three",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Helps organize programs, events, volunteer involvement, and community initiatives.",
      mn: "Хөтөлбөр, арга хэмжээ, сайн дурынхны оролцоо болон олон нийтийн ажлыг зохион байгуулахад тусалдаг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "board-4",
    name: "Member Four",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Supports communication, administration, preparation, and the work behind each event.",
      mn: "Харилцаа, захиргаа, бэлтгэл болон арга хэмжээний арын ажлыг дэмждэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "board-5",
    name: "Member Five",
    role: {
      en: "Board Member",
      mn: "Удирдах зөвлөлийн гишүүн",
    },
    bio: {
      en: "Contributes community knowledge, leadership, and consistent support throughout the year.",
      mn: "Хамт олны мэдлэг, манлайлал болон тогтвортой дэмжлэг үзүүлдэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
];

export const CREATIVE_TEAM: TeamMember[] = [
  {
    id: "creative-1",
    name: "Creative Member One",
    role: {
      en: "Creative Direction",
      mn: "Бүтээлч чиглэл",
    },
    bio: {
      en: "Shapes the visual direction and creative presentation of events, campaigns, and community initiatives.",
      mn: "Арга хэмжээ, кампанит ажил болон олон нийтийн санаачилгын бүтээлч дүр төрхийг чиглүүлдэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "creative-2",
    name: "Creative Member Two",
    role: {
      en: "Photography and Media",
      mn: "Гэрэл зураг ба медиа",
    },
    bio: {
      en: "Captures meaningful moments and helps share the people, culture, and stories behind our community.",
      mn: "Чухал мөчүүдийг баримтжуулж, хамт олны хүмүүс, соёл болон түүхийг хуваалцдаг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "creative-3",
    name: "Creative Member Three",
    role: {
      en: "Design and Communications",
      mn: "Дизайн ба харилцаа",
    },
    bio: {
      en: "Creates visual materials and supports clear, consistent communication across our programs.",
      mn: "Дүрслэлийн материал бүтээж, хөтөлбөрүүдийн нэгдсэн харилцааг дэмждэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
  {
    id: "creative-4",
    name: "Creative Member Four",
    role: {
      en: "Culture and Performance",
      mn: "Соёл ба тоглолт",
    },
    bio: {
      en: "Supports performances and cultural experiences that preserve traditions and connect generations.",
      mn: "Уламжлалыг хадгалж, үе үеийг холбодог тоглолт болон соёлын үйл ажиллагааг дэмждэг.",
    },
    image: aboutMedia.teamPlaceholder,
    imagePosition: "center",
  },
];

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
