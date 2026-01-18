export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  cover_image: string;
  albumImageCount: number;
  activities: string[];
};

export type CardItem = {
  id: string;
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
    activities: [
      'hwllo',
      'hwllo',
      'monwy',
      'hwllo',
      'hwllo',
      'monwy',
      'hwllo',
      'monwy'
    ]
    
  },
];

export function getCardInfos(events: GalleryItem[]) {
  let cardInfo :CardItem[] = []
  for (let i =0; i < events.length; i++){
    const dict :CardItem = {
      'id' : events[i].id,
      'title' : events[i].title,
      'desc' : events[i].date,
      'link' : `/gallery/${events[i].id}`
    }
    cardInfo.push(dict);
  }
  return cardInfo;
};