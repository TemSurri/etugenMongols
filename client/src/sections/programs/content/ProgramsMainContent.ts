import type { Lang } from "../../../context/language";

export type { Lang } from "../../../context/language";

export type ProgramsCopy = {
  title: string;
  introTitle: string;
  introBody: string;

  plansTitle: string;
  plansBody: string;

  areas: readonly {
    title: string;
    body: string;
  }[];
};

export const COPY = {
  en: {
    title: "Programs",

    introTitle: "Learning, practicing, and passing on our culture",

    introBody:
      "Our community already spends weeks and sometimes months meeting regularly to practice songs, dances, performances, games, and other traditions before cultural events. We want to build on that work by creating more consistent opportunities to learn throughout the year — making our culture easier to practice, understand, perform, and pass on to younger generations.",

    plansTitle: "What we hope to develop",

    plansBody:
      "Over time, we hope to turn these informal practices into more regular cultural programs for children, youth, families, and other community members.",

    areas: [
      {
        title: "Language & Culture",
        body: "Opportunities to learn and practice the Mongolian language while building a stronger understanding of our history, customs, and traditions.",
      },
      {
        title: "Music, Singing & Dance",
        body: "Regular practice for Mongolian songs, dance, music, and cultural performances used at celebrations and community events.",
      },
      {
        title: "Wrestling, Archery & Traditional Games",
        body: "Learning traditional activities such as Mongolian wrestling, archery, shagai, and other games through guided practice.",
      },
      {
        title: "Horsemanship & Outdoor Traditions",
        body: "Future opportunities to introduce horsemanship, outdoor cultural activities, and other traditions connected to Mongolian life.",
      },
      {
        title: "Traditional Summer Camps",
        body: "We hope to develop yearly summer camps where younger community members can spend time learning language, games, performances, traditions, and cultural skills together.",
      },
    ],
  },

  mn: {
    title: "Хөтөлбөрүүд",

    introTitle: "Соёлоо сурч, давтаж, дараагийн үедээ өвлүүлэх нь",

    introBody:
      "Манай олон нийтийн гишүүд соёлын арга хэмжээний өмнө дуу, бүжиг, тоглолт, тоглоом болон бусад уламжлалаа давтахын тулд хэдэн долоо хоног, заримдаа хэдэн сарын турш тогтмол уулзан бэлтгэдэг. Бид энэ ажлыг илүү тогтвортой болгож, жилийн турш соёлоо сурах, давтах, ойлгох, тоглолтод бэлтгэх болон залуу үедээ өвлүүлэх боломжийг нэмэгдүүлэхийг зорьж байна.",

    plansTitle: "Цаашид хөгжүүлэхээр төлөвлөж буй зүйлс",

    plansBody:
      "Цаг хугацааны явцад эдгээр бэлтгэл, уулзалтуудыг хүүхэд, залуус, гэр бүл болон олон нийтийн бусад гишүүдэд зориулсан тогтмол соёлын хөтөлбөр болгон хөгжүүлэхийг хүсэж байна.",

    areas: [
      {
        title: "Хэл ба соёл",
        body: "Монгол хэлээ сурах, давтахын зэрэгцээ түүх, зан заншил болон уламжлалаа илүү гүнзгий ойлгох боломж.",
      },
      {
        title: "Дуу, хөгжим ба бүжиг",
        body: "Баяр ёслол болон олон нийтийн арга хэмжээнд зориулсан монгол дуу, бүжиг, хөгжим, соёлын тоглолтын тогтмол бэлтгэл.",
      },
      {
        title: "Бөх, сур харваа ба уламжлалт тоглоом",
        body: "Монгол бөх, сур харваа, шагай болон бусад уламжлалт тоглоомыг зааж, тогтмол дадлага хийх боломж.",
      },
      {
        title: "Морь унах ба гадаах уламжлал",
        body: "Цаашид морь унах, гадаах соёлын үйл ажиллагаа болон Монгол ахуйтай холбоотой бусад уламжлалыг танилцуулах боломжууд.",
      },
      {
        title: "Монгол уламжлалт зуны зуслан",
        body: "Хүүхэд, залуус хэл, тоглоом, тоглолт, уламжлал болон соёлын ур чадвараа хамтдаа суралцах боломжтой жил бүрийн зуны зусланг хөгжүүлэхийг зорьж байна.",
      },
    ],
  },
} as const satisfies Record<Lang, ProgramsCopy>;
