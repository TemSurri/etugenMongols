export type Listing = {
  title: string;
  title_mn: string;
  description: string;
  contact: string;
}


export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description: string;
  description_en: string;

  description_ticket?: string;
  description_ticket_en?: string;

  image: string;
  whoWeWant: Listing[];
  contactEmail?: string;
  contactPhone?: string[];
  onlinePay: boolean;
  donate: boolean;
};

export type CardItem = {
  img: string;
  title: string;
  desc: string;
  link: string;
};

export type OrganizedListing = {
  listing: Listing;
  id: string;
}


//
//
//
// DONT TOUCH ANYTHING BEFOFRE THIS
//
//
//


//LIST OF EVENTS
export const events: EventItem[] = [

{
  id: "mongolian-cultural-night-2026",

  title: "Naadam",
  date: "September 20, 2026",
  time: "6:30 PM - 9:30 PM",
  location: "University of Calgary Community Hall",

  onlinePay: true,
  donate: false,

  description:
`Монгол соёлын үдэшлэгт хүрэлцэн ирээрэй.

Энэ үдэш Монголын урлаг, дуу хөгжим, бүжиг болон уламжлалт соёлыг танилцуулна.

Хөтөлбөр:
• Морин хуурын тоглолт
• Уртын дуу
• Монгол бүжгийн үзүүлбэр
• Соёлын танилцуулга

Арга хэмжээ нь Монгол соёлыг олон нийтэд таниулах зорилготой.`,

  description_en:
`Experience an evening dedicated to Mongolian culture and artistic expression.

This event will feature live performances and presentations showcasing traditional Mongolian music, dance, and storytelling.

Program highlights include:

• Morin khuur instrumental performances
• Traditional long song (Urtiin Duu)
• Mongolian folk dance
• Cultural presentations about Mongolian history and traditions

This event is ideal for anyone interested in learning more about Mongolia's cultural heritage.`,

  description_ticket:
`Тасалбар: $20

Суудал хязгаартай тул урьдчилан бүртгүүлэх шаардлагатай.

Тасалбарын орлого нь:
• Соёлын хөтөлбөрүүд
• Уран бүтээлчдийн зардал
• Ирээдүйн арга хэмжээнүүдэд

зарцуулагдана.`,

  description_ticket_en:
`Ticket price: $20

Seats are limited. Advance registration is recommended.

Ticket revenue supports:

• Cultural programming
• Artist travel and performance costs
• Future community events.`,

  image: "winterparty.png",

  contactEmail: "calgarymongolians@gmail.com",
  contactPhone: ["587-435-4494"],

  whoWeWant: [

    {
      title: "Backstage Assistant",
      title_mn: "Тайзны арын туслах",
      description:
      "Help performers prepare and move between backstage and stage areas.",
      contact: "587-435-4494",
    },

    {
      title: "Stage Manager",
      title_mn: "Тайзны зохицуулагч",
      description:
      "Coordinate performance order and help manage stage timing.",
      contact: "587-435-4494",
    },

    {
      title: "Photography Volunteer",
      title_mn: "Зураг авалтын сайн дурын ажилтан",
      description:
      "Capture photos and short video clips for community archives and social media.",
      contact: "587-435-4494",
    }

  ],

},

{
  id: "mongolian-cultural-night-2026",

  title: "Naadam",
  date: "September 20, 2026",
  time: "6:30 PM - 9:30 PM",
  location: "University of Calgary Community Hall",

  onlinePay: true,
  donate: false,

  description:
`Монгол соёлын үдэшлэгт хүрэлцэн ирээрэй.

Энэ үдэш Монголын урлаг, дуу хөгжим, бүжиг болон уламжлалт соёлыг танилцуулна.

Хөтөлбөр:
• Морин хуурын тоглолт
• Уртын дуу
• Монгол бүжгийн үзүүлбэр
• Соёлын танилцуулга

Арга хэмжээ нь Монгол соёлыг олон нийтэд таниулах зорилготой.`,

  description_en:
`Experience an evening dedicated to Mongolian culture and artistic expression.

This event will feature live performances and presentations showcasing traditional Mongolian music, dance, and storytelling.

Program highlights include:

• Morin khuur instrumental performances
• Traditional long song (Urtiin Duu)
• Mongolian folk dance
• Cultural presentations about Mongolian history and traditions

This event is ideal for anyone interested in learning more about Mongolia's cultural heritage.`,

  description_ticket:
`Тасалбар: $20

Суудал хязгаартай тул урьдчилан бүртгүүлэх шаардлагатай.

Тасалбарын орлого нь:
• Соёлын хөтөлбөрүүд
• Уран бүтээлчдийн зардал
• Ирээдүйн арга хэмжээнүүдэд

зарцуулагдана.`,

  description_ticket_en:
`Ticket price: $20

Seats are limited. Advance registration is recommended.

Ticket revenue supports:

• Cultural programming
• Artist travel and performance costs
• Future community events.`,

  image: "winterparty.png",

  contactEmail: "calgarymongolians@gmail.com",
  contactPhone: ["587-435-4494"],

  whoWeWant: [

    {
      title: "Backstage Assistant",
      title_mn: "Тайзны арын туслах",
      description:
      "Help performers prepare and move between backstage and stage areas.",
      contact: "587-435-4494",
    },

    {
      title: "Stage Manager",
      title_mn: "Тайзны зохицуулагч",
      description:
      "Coordinate performance order and help manage stage timing.",
      contact: "587-435-4494",
    },

    {
      title: "Photography Volunteer",
      title_mn: "Зураг авалтын сайн дурын ажилтан",
      description:
      "Capture photos and short video clips for community archives and social media.",
      contact: "587-435-4494",
    }

  ],

},




];


//
//
//
// DONT TOUCH ANYTHING PAST THIS
//
//
//


export function getCardInfos(events: EventItem[]) {
  let cardInfo: CardItem[] = [];
  for (let i = 0; i < events.length; i++) {
    const dict: CardItem = {
      img: events[i].image,
      title: events[i].title,
      desc: events[i].date,
      link: `/events/${events[i].id}`,
    };
    cardInfo.push(dict);
  }
  return cardInfo;
}

export function getListings(events: EventItem[]) {

  let listings: OrganizedListing[] = []
  for (let i = 0; i< events.length; i++ ){
    for (let j = 0; j < events[i].whoWeWant.length; j++ ){
      let data: OrganizedListing = {
        id: events[i].id,
        listing: events[i].whoWeWant[j]
      }
      listings.push(
        data
      )  
    }
  }
  return listings
}