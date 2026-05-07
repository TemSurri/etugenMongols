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