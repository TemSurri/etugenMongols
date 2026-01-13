export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  cover_image: string;
  albumImageCount: number;
};

export type CardItem = {
  cover_img: string;
  title: string;
  desc: string;
  link: string;
};

export const events: GalleryItem[] = [
  {
    //identifier
    id: "naadam2022",
    //basic info
    title: "Naadam Celebration 2022",
    date: "July 11, 2022",
    location: "Calgary, Alberta",
    description:
      "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    //img
    cover_image: 
      "/gallery/naadam2022/covernaadam.jpg",
    albumImageCount:
    10,
    
  },
];

export function getCardInfos(events: GalleryItem[]) {
  let cardInfo :CardItem[] = []
  for (let i =0; i < events.length; i++){
    const dict :CardItem = {
      'cover_img' : events[i].cover_image,
      'title' : events[i].title,
      'desc' : events[i].date,
      'link' : `/gallery/${events[i].id}`
    }
    cardInfo.push(dict);
  }
  return cardInfo;
};