export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;

  albumImageCount: number;
  activities: string[];

  videoUrl?: string;
};

export type CardItem = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

export const events: GalleryItem[] = [
  {
    id: "naadam2022",
    title: "Naadam Celebration 2022",
    date: "July 11, 2022",
    location: "Calgary, Alberta",
    description:
      "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    albumImageCount: 10,
    activities: ["wrestling", "festival", "celebration", "community gathering"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "childrenswp2024",
    title: "Childrens Winter Party 2024",
    date: "July 11, 2022",
    location: "Calgary, Alberta",
    description: "//",
    albumImageCount: 10,
    activities: ["wrestling", "festival", "celebration", "community gathering"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
  id: "childrenswp2025",
  title: "Children's Winter Party 2025",
  date: "December 14, 2025",
  location: "Calgary, Alberta",
  description:
    "A winter community celebration for children and families, featuring games, food, music, photos, and shared cultural moments.",
  albumImageCount: 10,
  activities: [
    "children's games",
    "family activities",
    "winter celebration",
    "community gathering",
    "food and music",
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
},
{
  id: "tsagaan-sar-2025",
  title: "Tsagaan Sar Celebration 2025",
  date: "February 9, 2025",
  location: "Calgary, Alberta",
  description:
    "A Mongolian Lunar New Year gathering with traditional greetings, food, cultural clothing, music, and family-centered community celebration.",
  albumImageCount: 10,
  activities: [
    "traditional greetings",
    "community meal",
    "cultural clothing",
    "family photos",
    "music and gathering",
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
},


];

export function getCardInfos(events: GalleryItem[]) {
  const cardInfo: CardItem[] = [];

  for (let i = 0; i < events.length; i++) {
    const dict: CardItem = {
      id: events[i].id,
      title: events[i].title,
      desc: events[i].date,
      link: `/gallery/${events[i].id}`,
    };

    cardInfo.push(dict);
  }

  return cardInfo;
}