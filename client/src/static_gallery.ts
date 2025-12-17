export type GalleryItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  image: string;

  whatWeNeed: string;
  whoWeWant?: string;

  contactEmail?: string;
  contactPhone?: string;
};

export type CardItem = {
  img: string;
  title: string;
  desc: string;
  link: string;
};

export const events: GalleryItem[] = [
  {
    //identifier
    id: "nssgskbajkdam-2024",
    //basic info
    title: "Naadam Celebration 2026",
    date: "July 11, 2024",
    location: "Calgary, Alberta",
    description:
      "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    //img
    image: 
      'naadam.jpg',

    
    whatWeNeed:
      "Volunteers for setup/cleanup, ushers, registration help, donation of traditional food and drinks, and small prizes for games.",
    whoWeWant:
      "Community volunteers (16+), performers (singers, dancers), sponsors, and local vendors interested in Mongolian culture.",

    
    contactEmail: "events@mongoliancalgary.ca",
    contactPhone: "403-555-1234",
  },

  {
    id: "tsagaan-sar-2023",
    title: "Tsagaan Sar 2023",
    date: "February 18, 2023",
    location: "Calgary Cultural Centre",
    description:
      "Our annual Lunar New Year celebration with performances, traditional clothing, dances, and festive foods.",
    image: "/images/events/tsagaan1.jpg",
    whatWeNeed:
      "Help with event decoration, seating organization, kids activities, photography, and setup of food stations.",
    whoWeWant:
      "Families, youth volunteers, photographers, cultural ambassadors, and partners who want to support community events.",

    // NEW FIELDS 👇
    contactEmail: "info@mongoliancalgary.ca",
    contactPhone: "403-555-9876",
  }
];

export function getCardInfos(events: GalleryItem[]) {
  let cardInfo :CardItem[] = []
  for (let i =0; i < events.length; i++){
    const dict :CardItem = {
      'img' : events[i].image,
      'title' : events[i].title,
      'desc' : events[i].date,
      'link' : `/gallery/${events[i].id}`
    }
    cardInfo.push(dict);
  }
  return cardInfo;
};