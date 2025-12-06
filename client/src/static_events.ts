export type EventItem = {
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
  applyLink?: string;
};

export type CardItem = {
  img: string;
  title: string;
  desc: string;
  link: string;
};

export const events: EventItem[] = [
  {
    id: "nssgskbajkdam-2024",
    title: "Naadam Celebration 2026",
    date: "July 11, 2024",
    location: "Calgary, Alberta",
    description:
      "A traditional Mongolian Naadam festival featuring wrestling, archery, music, food, and cultural showcases.",
    image: 
      'naadam.jpg',
    whatWeNeed:
      "Volunteers for setup/cleanup, ushers, registration help, donation of traditional food and drinks, and small prizes for games.",
    whoWeWant:
      "Community volunteers (16+), performers (singers, dancers), sponsors, and local vendors interested in Mongolian culture.",

    // NEW FIELDS 👇
    contactEmail: "events@mongoliancalgary.ca",
    contactPhone: "403-555-1234",
    applyLink: "https://forms.gle/naadam-application-form"
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
    applyLink: "https://forms.gle/tsagaan-sar-volunteers"
  }
];

export function getCardInfos(events: EventItem[]) {
  let cardInfo :CardItem[] = []
  for (let i =0; i < events.length; i++){
    const dict :CardItem = {
      'img' : events[i].image,
      'title' : events[i].title,
      'desc' : events[i].date,
      'link' : `/events/${events[i].id}`
    }
    cardInfo.push(dict);
  }
  return cardInfo;
};