import type { Lang } from "../../../context/language";
import { aboutMedia } from "../media";
export type { Lang } from "../../../context/language";

export type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  viewMore: string;
  events: string;
  gallery: string;
  featuredLabel: string;
  performanceLabel: string;
  youthLabel: string;
  quoteA: string;
  quoteB: string;
  quoteC: string;
  cultureEyebrow: string;
  cultureTitle: string;
  cultureIntro: string;
  cultureActivities: readonly CultureActivity[];
  items: readonly [ImpactItem, ImpactItem, ImpactItem];
};

export type ImpactItem = {
  id: string;
  title: string;
  body: string;
  imageKey: ImpactImageKey;
  href: string;
  youtubeUrl?: string;
};

export type CultureActivity = {
  id: string;
  title: string;
  body: string;
  imageKey: ImpactImageKey;
};

export type ImpactImageKey = keyof typeof aboutMedia.impact;

export const COPY = {
  en: {
    eyebrow: "What We Are Proud Of",
    title: "Our Impact",
    intro:
      "A direct look at some of the notable moments, special parts, and meaningful events we are proud to have created with the community.",
    viewMore: "View More",
    events: "View Events",
    gallery: "View Gallery",

    featuredLabel: "Featured",
    performanceLabel: "Performance",
    youthLabel: "Youth",

    quoteA: "Culture represented in real life.",
    quoteB: "Families feel more connected.",
    quoteC: "People keep showing up.",

    cultureEyebrow: "Celebrate Culture",
    cultureTitle: "Culture Practiced Together",
    cultureIntro:
      "Our events create space for Mongolian culture to be experienced directly through activity, movement, stories, food, music, and shared participation.",

    cultureActivities: [
      {
        id: "wrestling-activity",
        title: "Wrestling and Physical Activity",
        body: "Wrestling and physical activities bring energy into events while connecting people to familiar cultural traditions.",
        imageKey: "wrestling",
      },
      {
        id: "stories-memory",
        title: "Stories and Shared Heritage",
        body: "Dress, language, and shared memory help connect generations and keep cultural knowledge alive.",
        imageKey: "stories",
      },
      {
        id: "dance-music-performance",
        title: "Dance, Music, and Performance",
        body: "Dance, music, food, and performance turn gatherings into cultural spaces people can feel and remember.",
        imageKey: "dance",
      },
      {
        id: "archery-games",
        title: "Archery and Traditional Games",
        body: "Activities like archery and traditional games help make culture visible, active, and memorable for families and youth.",
        imageKey: "archery",
      },
    ],

    items: [
      {
        id: "stampede-naadam",
        title: "Stampede and Naadam Together",
        body: "A shared celebration connecting Calgary’s Stampede Breakfast spirit with Mongolian Naadam.",
        imageKey: "stampedeNaadam",
        href: "/events",
        youtubeUrl: "https://www.youtube.com/watch?v=a-yKYFF08eo",
      },
      {
        id: "community-performance",
        title: "55-Person Community Performance",
        body: "Presented during Naadam 2022, this performance brought together 55 children, parents, performers, and volunteers through music, storytelling, and shared preparation.",
        imageKey: "performanceCover",
        href: "/gallery",
        youtubeUrl: "https://www.youtube.com/watch?v=NcmXN1s5kS8",
      },
      {
        id: "youth-spaces",
        title: "Spaces for Children and Youth",
        body: "Programs and gatherings help young people experience Mongolian culture as something active and shared.",
        imageKey: "youthCulture",
        href: "/gallery",
      },
    ],
  },

  mn: {
    eyebrow: "Бидний бахархал",
    title: "Бидний нөлөө",
    intro:
      "Хамт олонтойгоо хамт бүтээсэн онцгой мөчүүд, утга учиртай хэсгүүд болон бахархалт арга хэмжээнүүдийн шууд тойм.",
    viewMore: "Дэлгэрэнгүй",
    events: "Арга хэмжээнүүд",
    gallery: "Зургийн цомог",

    featuredLabel: "Онцлох",
    performanceLabel: "Тоглолт",
    youthLabel: "Хүүхэд залуус",

    quoteA: "Соёл бодит амьдрал дээр харагддаг.",
    quoteB: "Гэр бүлүүд илүү холбоотой болдог.",
    quoteC: "Хүмүүс үргэлж оролцож, дэмждэг.",

    cultureEyebrow: "Соёлоо тэмдэглэх",
    cultureTitle: "Соёлоо хамтдаа хэрэгжүүлэх",
    cultureIntro:
      "Манай арга хэмжээнүүд Монгол соёлыг хөдөлгөөн, түүх, хоол, хөгжим, тоглолт болон хамтын оролцоогоор шууд мэдрэх орон зайг бий болгодог.",

    cultureActivities: [
      {
        id: "wrestling-activity",
        title: "Бөх болон хөдөлгөөнт үйл ажиллагаа",
        body: "Бөх болон хөдөлгөөнт үйл ажиллагаа нь арга хэмжээнд эрч хүч нэмж, хүмүүсийг танил соёлын уламжлалтай холбодог.",
        imageKey: "wrestling",
      },
      {
        id: "stories-memory",
        title: "Түүх, хэл, хамтын дурсамж",
        body: "Түүх, хэл, хамтын дурсамж нь үе үеийг холбож, соёлын мэдлэгийг амьд байлгахад тусалдаг.",
        imageKey: "stories",
      },
      {
        id: "dance-music-performance",
        title: "Бүжиг, хөгжим болон тоглолт",
        body: "Бүжиг, хөгжим, хоол болон тоглолт нь уулзалтыг хүмүүсийн мэдэрч, санаж үлдэх соёлын орон зай болгодог.",
        imageKey: "dance",
      },
      {
        id: "archery-games",
        title: "Сур харваа болон уламжлалт тоглоом",
        body: "Сур харваа болон уламжлалт тоглоомууд соёлыг гэр бүл, хүүхэд залууст илүү бодит, идэвхтэй, дурсамжтай болгодог.",
        imageKey: "archery",
      },
    ],

    items: [
      {
        id: "stampede-naadam",
        title: "Stampede болон Наадам хамтдаа",
        body: "Calgary Stampede Breakfast-ийн уур амьсгалыг Монгол Наадамтай холбосон хамтын баяр.",
        imageKey: "stampedeNaadam",
        href: "/events",
        youtubeUrl: "https://www.youtube.com/watch?v=a-yKYFF08eo",
      },
      {
        id: "community-performance",
        title: "55 хүний хамтын тоглолт",
        body: "Наадам 2022 арга хэмжээний үеэр толилуулсан энэхүү тоглолтод 55 хүүхэд, эцэг эх, уран бүтээлч, сайн дурынхан хөгжим, түүх болон хамтын бэлтгэлээр нэгдсэн.",
        imageKey: "performanceCover",
        href: "/gallery",
        youtubeUrl: "https://www.youtube.com/watch?v=NcmXN1s5kS8",
      },
      {
        id: "youth-spaces",
        title: "Хүүхэд залууст зориулсан орон зай",
        body: "Хөтөлбөрүүд болон цугларалтууд нь залууст Монгол соёлыг идэвхтэй, хамтын зүйл болгон мэдрэхэд тусалдаг.",
        imageKey: "youthCulture",
        href: "/gallery",
      },
    ],
  },
} as const satisfies Record<Lang, Copy>;