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

/* ---------------- NAADAM FESTIVAL ---------------- */

{
  id: "naadam2026-main",
  title: "Naadam Festival 2026",
  date: "July 12, 2026",
  time: "11:00 AM - 7:00 PM",
  location: "Prince's Island Park, Calgary",

  onlinePay: false,
  donate: true,

  description:
`Манай зуны хамгийн том баяр болох Наадамд хүрэлцэн ирэхийг урьж байна.
Энэхүү баяр нь Монголын уламжлалт соёл, спорт, урлагийг танилцуулах зорилготой.

Арга хэмжээнд дараах зүйлс багтана:
• Монгол бөхийн барилдаан
• Сур харваа
• Морин хуурын тоглолт
• Монгол хоолны асрууд
• Хүүхдийн тоглоом наадам

Наадам нь гэр бүл, найз нөхөд, олон нийт цуглаж Монгол соёлоо хуваалцах сайхан боломж юм.`,

  description_en:
`Join us for Calgary's annual Mongolian Naadam Festival — the largest gathering of the Mongolian community in the region.

The event will feature traditional sports, cultural performances, food vendors, and family activities including:

• Mongolian wrestling matches
• Archery demonstrations
• Live morin khuur performances
• Authentic Mongolian food stalls
• Children's games and cultural workshops

This event is free to attend and open to everyone interested in learning about Mongolian culture.`,

  description_ticket:
`Тасалбар шаардахгүй.
Хандив өгөх боломжтой.

Сайн дурын хандив нь:
• Тайзны төхөөрөмж
• Соёлын хөтөлбөрүүд
• Хүүхдийн үйл ажиллагаа
• Нийгэмлэгийн үйл ажиллагаанд

зарцуулагдана.`,

  description_ticket_en:
`No ticket required.

Donations are welcome and help support:

• Cultural performances
• Community programming
• Equipment and logistics
• Youth activities and workshops`,

  image: "naadam2026.png",

  contactEmail: "calgarymongolians@gmail.com",
  contactPhone: ["403-921-8821", "587-435-4494"],

  whoWeWant: [

    {
      title: "Entrance Coordination",
      title_mn: "Орох хэсгийн зохион байгуулалт",
      description:
      "Welcome visitors, provide basic event information, and guide guests to the correct areas inside the festival grounds.",
      contact: "403-921-8821",
    },

    {
      title: "Children's Games Assistant",
      title_mn: "Хүүхдийн тоглоомын туслах",
      description:
      "Help organize traditional games for children and supervise activity areas.",
      contact: "403-921-8821",
    },

    {
      title: "Food Area Coordinator",
      title_mn: "Хоолны хэсгийн зохицуулагч",
      description:
      "Assist food vendors, organize food lines, and help maintain cleanliness in the food area.",
      contact: "587-435-4494",
    },

    {
      title: "Stage Crew",
      title_mn: "Тайзны баг",
      description:
      "Help coordinate performances, assist performers backstage, and manage stage transitions.",
      contact: "587-435-4494",
    },

    {
      title: "Clean-up Team",
      title_mn: "Цэвэрлэгээний баг",
      description:
      "Help collect waste, pack equipment, and restore the park area after the event concludes.",
      contact: "403-921-8821",
    }

  ],
},

/* ---------------- CULTURAL NIGHT ---------------- */

{
  id: "mongolian-cultural-night-2026",
  title: "Mongolian Cultural Night",
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

  image: "culturalnight2026.png",

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

/* ---------------- WINTER CELEBRATION ---------------- */

{
  id: "winter-celebration-2026",
  title: "Mongolian Winter Celebration",
  date: "December 28, 2026",
  time: "5:00 PM - 10:00 PM",
  location: "Calgary Community Cultural Centre",

  onlinePay: true,
  donate: true,

  description:
`Өвлийн баярын арга хэмжээнд та бүхнийг урьж байна.

Энэхүү арга хэмжээ нь:
• Зул сар
• Шинэ жил
• Монгол нийгэмлэгийн уулзалт

зэрэг баяруудыг хамтад нь тэмдэглэх зорилготой.`,

  description_en:
`Celebrate the winter season together with the Mongolian community in Calgary.

This event combines holiday festivities, community celebration, and cultural programming in a warm indoor setting.`,

  description_ticket:
`Тасалбар: $15

Хүүхдүүдэд үнэгүй.`,

  description_ticket_en:
`Tickets: $15
Children under 12 attend free.`,

  image: "wintercelebration2026.png",

  contactEmail: "calgarymongolians@gmail.com",
  contactPhone: ["403-921-8821"],

  whoWeWant: [

    {
      title: "Decoration Team",
      title_mn: "Чимэглэлийн баг",
      description:
      "Help decorate the venue with holiday and Mongolian themed decorations.",
      contact: "403-921-8821",
    },

    {
      title: "Food Preparation Assistant",
      title_mn: "Хоол бэлтгэлийн туслах",
      description:
      "Assist with preparing and organizing food for guests.",
      contact: "403-921-8821",
    },

    {
      title: "Event Setup Crew",
      title_mn: "Арга хэмжээний бэлтгэл",
      description:
      "Help arrange tables, chairs, and stage equipment before the event.",
      contact: "403-921-8821",
    }

  ],
}

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